"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

interface BusinessData {
  name: string;
  slug: string;
  headline: string;
  description: string;
  logo: string;
  BusinessEmail: string;
  BusinessPhone: string;
  BusinessHours?: string; // Make this optional
  YearsInBusiness: string;
  AverageRating?: Float32Array;
  OwnerName: string;
  NumofEmployees: string;
  ServicesOffered: string;
  Arminities: string;
  AboutTheBusiness: string;
  website: string;
  twitter: string;
  discord?: string;
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
  BusinessPhone,
  BusinessEmail,
  BusinessHours,
  YearsInBusiness,
  OwnerName,
  NumofEmployees,
  ServicesOffered,
  Arminities,
  AboutTheBusiness,
  website,
  twitter,
  discord,
  images,
  category,
}: BusinessData): Promise<any> => {
  try {
    const authenticatedUser = await auth();

    if (!authenticatedUser) {
      throw new Error("You must be signed in to create a Businesses");
    }

    const userId = authenticatedUser.user?.id;

    const product = await db.business.create({
      data: {
        name,
        rank: 0,
        slug,
        headline,
        description,
        logo,
        BusinessPhone,
        BusinessEmail,
        BusinessHours,
        YearsInBusiness,
        OwnerName,
        NumofEmployees,
        ServicesOffered,
        Arminities,
        AboutTheBusiness,
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
    BusinessPhone,
    BusinessEmail,
    YearsInBusiness,
    OwnerName,
    NumofEmployees,
    ServicesOffered,
    Arminities,
    AboutTheBusiness,
    website,
    twitter,
    discord,
    images,
    imagesChanged
  }: BusinessData & { imagesChanged: boolean }
) => {
  const authenticatedUser = await auth();
  if (!authenticatedUser) {
    throw new Error("You must be signed in to update a product");
  }
  const product = await db.business.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  
  let updateData: any = {
    name,
    slug,
    headline,
    description,
    logo,
    BusinessPhone,
    YearsInBusiness: YearsInBusiness.toString(), // Convert to string
    OwnerName,
    BusinessEmail,
    NumofEmployees,
    ServicesOffered,
    Arminities,
    AboutTheBusiness,
    website,
    twitter,
    discord,
    status: "PENDING",
  };

  if (imagesChanged) {
    updateData.images = {
      deleteMany: {
        productId,
      },
      createMany: {
        data: images.map((image) => ({ url: image })),
      },
    };
  }

  await db.business.update({
    where: {
      id: productId,
    },
    data: updateData,
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

  const product = await db.business.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || product.userId !== userId) {
    throw new Error("Product not found or not authorized");
  }

  await db.business.delete({
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
  const products = await db.business.findMany({
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

export const getUserStatsa = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    throw new Error("User not authenticated");
  }

  const userId = authenticatedUser.user?.id;

  const userProductsCount = await db.business.count({
    where: {
      userId,
    },
  });

  const userRatingsCount = await db.rating.count({
    where: {
      userId,
    },
  });

  return {
    productsPosted: userProductsCount,
    ratingsMade: userRatingsCount,
  };
};


export const getProductsByCity = async (city: string) => {
  try {
    const products = await db.business.findMany({
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

export const getProductsByCityName = async (city: string) => {
  const products = await db.business.findMany({
    where: {
      twitter: city,
      status: "ACTIVE",
    },
  });
  return products;
};

export const getOwnerProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    return [];
  }

  const userId = authenticatedUser.user?.id;

  const products = await db.business.findMany({
    where: {
      userId,
    },
  });

  return products;
};

export const getProductById = async (productId: string) => {
  try {
    const product = await db.business.findUnique({
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
        ratings: {
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

export const getPendingBusiness = async () => {
  const products = await db.business.findMany({
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
    const product = await db.business.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await db.business.update({
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
        body: `Your Business ${product.name} has been activated`,
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


export const uploadProductRating = async (
  businessId: string,
  score: number,
  comment?: string
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
    const product = await db.business.findUnique({
      where: {
        id: businessId,
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
        userId,
        businessId,
      },
    });

    return rating;
  } catch (error) {
    console.error("Error uploading product rating:", error);
    throw error;
  }
};



export const getProductRating = async (businessId: string) => {
  try {
    const ratings = await db.rating.findMany({
      where: {
        businessId,
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

export const getProductRatings = async (businessId: string) => {
  try {
    const ratings = await db.rating.findMany({
      where: {
        businessId,
      },
      include: {
        user: true, // Include user profile
      },
    });

    return ratings.map((rating) => ({
      score: rating.score,
      comment: rating.comment,
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

export const rejectProduct = async (productId: string, reason: string) => {
  try {
    const product = await db.business.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found or not authorized");
    }

    await db.business.update({
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
        businessId: productId,
      },
    });
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};

export const getActiveBusiness = async () => {
  const products = await db.business.findMany({
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
  businessId: string,
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
        businessId,
        userId,
        body: commentText,
        profilePicture: profilePicture,
      },
      include: {
        user: true,
      },
    });

    const productDetails = await db.business.findUnique({
      where: {
        id: businessId,
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
          businessId: businessId,
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

export const upvoteProduct = async (businessId: string) => {
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
        businessId,
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
          businessId,
          userId,
        },
      });

      const productOwner = await db.business.findUnique({
        where: {
          id: businessId,
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
            businessId: businessId,
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
        business: true,
      },
    });

    // Map upvoted items to their respective products or businesses
    return upvotedProducts.map((upvote) => {
      if (upvote.product) {
        return upvote.product;
      } else if (upvote.business) {
        return upvote.business;
      }
      return null;
    }).filter(item => item !== null); // Filter out null values
  } catch (error) {
    console.error("Error getting upvoted products:", error);
    return [];
  }
}

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await db.business.findUnique({
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
      businesses: {
        some: {
          status: "ACTIVE",
        },
      },
    },
  });

  return categories;
};


export const getBusinessessByCategoryName = async (BusinessCategory: string) => {
  console.log("BusinessCategory Query:", BusinessCategory); // Debug log

  const products = await db.business.findMany({
    where: {
      categories: {
        some: {
          name: {
            equals: BusinessCategory,
            mode: 'insensitive', // Case-insensitive matching
          },
        },
      },
      status: "ACTIVE",
    },
  });

  console.log("Products Found:", products); // Debug log

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
  const rankedProducts = await db.business.findMany({
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
  const products = await db.business.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          twitter: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
      status: "ACTIVE",
    },
  });

  return products;
};


export const getProductsByUserId = async (userId: string) => {
  const products = await db.business.findMany({
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


export const getRejectedBusiness = async () => {
  const products = await db.business.findMany({
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

export const getTotalUpvotesBusiness = async () => {
  const totalUpvotes = await db.upvote.count({
    where: {
      business: {
        status: "ACTIVE",
      },
    },
  });
  return totalUpvotes;
};

export const getAdminDataBusiness = async () => {
  const totalProducts = await db.business.count();
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
