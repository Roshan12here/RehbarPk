"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

interface ProductData {
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  Unique: string;
  VisitorsExpect: string;
  Amenities: string;
  Historical: string;
  InterestStories: string;
  WhatBringing: string;
  ScenicSpots: string;
  MemorableExperiences: string;
  BestTimetoVisit: string;
  KidsFriendly: string;
  AnyMessageForVisitors: string;
  releaseDate: string;
  website: string;
  twitter: string;
  discord: string;
  images: string[];
  category: string[];
  rank?: number;
}
interface ProductDataedit {
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  releaseDate: string;
  website: string;
  twitter: string;
  discord: string;
  images: string[];
  category: string[];
  rank?: number;
}

export const createProduct = async ({
  name,
  slug,
  headline,
  description,
  logo,
  releaseDate,
  Unique,
  VisitorsExpect,
  Amenities,
  Historical,
  InterestStories,
  WhatBringing,
  ScenicSpots,
  MemorableExperiences,
  BestTimetoVisit,
  KidsFriendly,
  AnyMessageForVisitors,
  website,
  twitter,
  discord,
  images,
  category,
}: ProductData): Promise<any> => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to create a product");
    }

    const userId = authenticatedUser.user?.id;

    const product = await db.product.create({
      data: {
        name,
        rank: 0,
        slug,
        headline,
        description,
        logo,
        releaseDate,
        Unique,
  VisitorsExpect,
  Amenities,
  Historical,
  InterestStories,
  WhatBringing,
  ScenicSpots,
  MemorableExperiences,
  BestTimetoVisit,
  KidsFriendly,
  AnyMessageForVisitors,
        website,
        twitter,
        discord,
        status: "PENDING",
        categories: {
          connectOrCreate: category.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
        images: {
          createMany: {
            data: images.map((image) => ({ url: image })),
          },
        },

        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateProduct = async (
  productId: string,
  {
    name,
    slug,
    headline,
    description,
    logo,
    releaseDate,
    website,
    twitter,
    discord,
    images,
  }: ProductDataedit
) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a product");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      images: {
        deleteMany: {
          productId,
        },
        createMany: {
          data: images.map((image) => ({ url: image })),
        },
      },
      status: "PENDING",
    },
  });
  return product;
};

export const deleteProduct = async (productId: string) => {
  const authenticatedUser = await auth();

  if (
    !authenticatedUser ||
    !authenticatedUser.user ||
    !authenticatedUser.user.id
  ) {
    throw new Error("User ID is missing or invalid");
  }

  const userId = authenticatedUser.user.id;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || product.userId !== userId) {
    throw new Error("Product not found or not authorized");
  }

  await db.product.delete({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });
  return true;
};

export const getAllCities = async () => {
  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      twitter: true,
    },
  });

  // Extract unique cities
  const cities = Array.from(new Set(products.map((product) => product.twitter)));

  return cities;
};

export const getProductsByCity = async (city: string) => {
  try {
    const products = await db.product.findMany({
      where: {
        twitter: city,
        status: "ACTIVE",
      },
    });
    return products;
  } catch (error) {
    console.error("Error getting products by city:", error);
    return [];
  }
};



export const getOwnerProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    return [];
  }

  const userId = authenticatedUser.user?.id;

  const products = await db.product.findMany({
    where: {
      userId,
    },
  });

  return products;
};

export const getProductById = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        categories: true,
        images: true,
        comments: {
          include: {
            user: true,
          },
        },
        upvotes: {
          include: {
            user: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getProductRating = async (productId: string) => {
  try {
    const ratings = await db.rating.findMany({
      where: {
        productId,
      },
    });

    if (ratings.length === 0) {
      return { averageRating: 0, ratingsCount: 0 };
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageRating = totalRating / ratings.length;

    return { averageRating, ratingsCount: ratings.length };
  } catch (error) {
    console.error("Error fetching product rating:", error);
    throw error;
  }
};


export const getPendingProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      categories: true,
      images: true,
    },
  });

  return products;
};

export const activateProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    await db.notification.create({
      data: {
        userId: product.userId,
        body: `Your product ${product.name} has been activated`,
        type: "ACTIVATED",
        status: "UNREAD",
        profilePicture: product.logo,
        productId: product.id,
      },
    });

    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const rejectProduct = async (productId: string, reason: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found or not authorized");
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        status: "REJECTED",
      },
    });

    await db.notification.create({
      data: {
        userId: product.userId,
        body: `Your product "${product.name}" has been rejected. Reason: ${reason}`,
        type: "REJECTED",
        status: "UNREAD",
        profilePicture: `${product.logo}`,
        productId: productId,
      },
    });
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};

export const getActiveProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      categories: true,
      images: true,
      comments: {
        include: {
          user: true,
        },
      },
      upvotes: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  return products;
};

export const commentOnProduct = async (
  productId: string,
  commentText: string
) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    // Check if authenticated user has a profile picture
    const profilePicture = authenticatedUser.user.image || ""; // Use an empty string if profile picture is undefined

    await db.comment.create({
      data: {
        createdAt: new Date(),
        productId,
        userId,
        body: commentText,
        profilePicture: profilePicture,
      },
      include: {
        user: true,
      },
    });

    const productDetails = await db.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        userId: true,
        name: true, // Include the product name in the query
      },
    });

    // Check if the commenter is not the owner of the product
    if (productDetails && productDetails.userId !== userId) {
      // Notify the product owner about the comment
      await db.notification.create({
        data: {
          userId: productDetails.userId,
          body: `Commented on your product "${productDetails.name}"`,
          profilePicture: profilePicture,
          productId: productId,
          type: "COMMENT",
          status: "UNREAD",
          // Ensure commentId is included here
        },
      });
    }
  } catch (error) {
    console.error("Error commenting on product:", error);
    throw error;
  }
};

export const getProductRatings = async (productId: string) => {
  try {
    const ratings = await db.rating.findMany({
      where: {
        productId,
      },
      include: {
        user: true, // Include user profile
        photos: true, // Include photos
      },
    });

    return ratings.map((rating) => ({
      score: rating.score,
      comment: rating.comment,
      selectedDate: rating.selectedDate,
      reviewType: rating.reviewType,
      HeadLine: rating.HeadLine,
      photos: rating.photos.map((photo) => photo.url),
      user: {
        id: rating.user.id,
        name: rating.user.name,
        email: rating.user.email,
        profilePicture: rating.user.image || "", // Assuming user profile picture is stored in `image` field
      },
      createdAt: rating.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching product ratings:", error);
    throw error;
  }
};


export const deleteComment = async (commentId: string) => {
  try {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const upvoteProduct = async (productId: string) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const upvote = await db.upvote.findFirst({
      where: {
        productId,
        userId,
      },
    });

    const profilePicture = authenticatedUser.user.image || ""; // Use an empty string if profile picture is undefined

    if (upvote) {
      await db.upvote.delete({
        where: {
          id: upvote.id,
        },
      });
    } else {
      await db.upvote.create({
        data: {
          productId,
          userId,
        },
      });

      const productOwner = await db.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          userId: true,
        },
      });

      // notify the product owner about the upvote

      if (productOwner && productOwner.userId !== userId) {
        await db.notification.create({
          data: {
            userId: productOwner.userId,
            body: `Upvoted your product`,
            profilePicture: profilePicture,
            productId: productId,
            type: "UPVOTE",
            status: "UNREAD",
          },
        });
      }
    }
    return true;
  } catch (error) {
    console.error("Error upvoting product:", error);
    throw error;
  }
};

export const getUpvotedProducts = async () => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const upvotedProducts = await db.upvote.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    return upvotedProducts.map((upvote) => upvote.product);
  } catch (error) {
    console.error("Error getting upvoted products:", error);
    return [];
  }
};

export const uploadProductRating = async (
  productId: string,
  score: number,
  comment: string,
  HeadLine: string,
  selectedDate: string,
  reviewType: "BUSINESS" | "COUPLES" | "FAMILY" | "FRIENDS" | "SOLO",
  photos: string[] // Assuming photos are passed as URLs or base64 strings
) => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    // Find the product
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Create the rating
    const rating = await db.rating.create({
      data: {
        score,
        comment,
        HeadLine,
        selectedDate,
        reviewType,
        userId,
        productId,
      },
    });

    // Upload photos and link them to the rating
    if (photos && photos.length > 0) {
      const photoPromises = photos.map((photoUrl) =>
        db.image.create({
          data: {
            url: photoUrl,
            ratingId: rating.id,
          },
        })
      );
      await Promise.all(photoPromises);
    }

    return rating;
  } catch (error) {
    console.error("Error uploading product rating:", error);
    throw error;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
      include: {
        images: true,
        categories: true,
        comments: {
          include: {
            user: true,
          },
        },
        ratings: { // Include ratings with user details
          include: {
            user: true,
            photos: true,
          },
        },
        upvotes: {
          include: {
            user: true,
          },
        },
      },
    });
    return product;
  } catch (error) {
    console.error("Error getting product by slug:", error);
    return null;
  }
};


export const getCategories = async () => {
  const categories = await db.category.findMany({
    where: {
      products: {
        some: {
          status: "ACTIVE",
        },
      },
    },
  });

  return categories;
};

export const getProductsByCategoryName = async (category: string) => {
  const products = await db.product.findMany({
    where: {
      categories: {
        some: {
          name: category,
        },
      },
      status: "ACTIVE",
    },
  });
  return products;
};
export const getProductsByCityName = async (city: string) => {
  const products = await db.product.findMany({
    where: {
      twitter: city,
      status: "ACTIVE",
    },
  });
  return products;
};

export const getRankById = async (): Promise<
  {
    id: string;
    name: string;
    upvotes: { id: string }[];
    rank: number;
  }[]
> => {
  // Fetch products along with their upvote counts from the database
  const rankedProducts = await db.product.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      upvotes: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      upvotes: {
        _count: "desc", // Order by upvotes count in descending order
      },
    },
  });

  // Find the maximum number of upvotes among all products
  const maxUpvotes =
    rankedProducts.length > 0 ? rankedProducts[0].upvotes.length : 0;

  // Assign ranks to each product based on their number of upvotes
  const productsWithRanks = rankedProducts.map((product, index) => ({
    ...product,
    rank: product.upvotes.length === maxUpvotes ? 1 : index + 2,
  }));

  return productsWithRanks;
};


// Function to update the average rating for a product

// Function to update the average rating for a product
export const updateProductAverageRating = async (productId: string) => {
  try {
    // Fetch all ratings for the given product
    const ratings = await db.rating.findMany({
      where: { productId },
    });

    // Calculate the average rating
    if (ratings.length === 0) {
      // No ratings available, set average rating to null
      return await db.product.update({
        where: { id: productId },
        data: { AverageRating: null },
      });
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const averageRating = totalRating / ratings.length;

    // Update the product with the calculated average rating
    return await db.product.update({
      where: { id: productId },
      data: { AverageRating: averageRating },
    });
  } catch (error) {
    console.error("Error updating product average rating:", error);
    throw error;
  }
};



export const getNotifications = async () => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser.user.id;

    const notifications = await db.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (notifications.length === 0) {
      return null;
    }

    return notifications;
  } catch (error) {
    console.error("Error getting notifications:", error);
    return [];
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const authenticatedUser = await auth();

    if (
      !authenticatedUser ||
      !authenticatedUser.user ||
      !authenticatedUser.user.id
    ) {
      throw new Error("User ID is missing or invalid");
    }

    const userId = authenticatedUser?.user.id;

    await db.notification.updateMany({
      where: {
        userId,
      },
      data: {
        status: "READ",
      },
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

export const searchProducts = async (query: string) => {
  const products = await db.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      status: "ACTIVE",
    },
  });

  return products;
};

export const getProductsByUserId = async (userId: string) => {
  const products = await db.product.findMany({
    where: {
      userId,
    },
  });

  return products;
};

export const isUserPremium = async () => {
  const authenticatedUser = await auth();

  if (
    !authenticatedUser ||
    !authenticatedUser.user ||
    !authenticatedUser.user.id
  ) {
    throw new Error("User ID is missing or invalid");
  }

  const userId = authenticatedUser.user.id;

  // get the user

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.isPremium;
};


export const getRejectedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      status: "REJECTED",
    },
    include: {
      categories: true,
      images: true,
    },
  });

  return products;
}


export const getUsers = async () => {
  const users = await db.user.findMany();

  return users;
}

export const getTotalUpvotes = async () => {
  const totalUpvotes = await db.upvote.count({
    where: {
      product: {
        status: "ACTIVE",
      },
    },
  });
  return totalUpvotes;
};

export const getAdminData = async () => {
  const totalProducts = await db.product.count();
  const totalUsers = await db.user.count();
  const totalUpvotes = await db.upvote.count();
  const totalComments = await db.comment.count();
  const totalCategories = await db.category.count();

  return {
    totalProducts,
    totalUsers,
    totalUpvotes,
    totalComments,
    totalCategories,
  };
}
