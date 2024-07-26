"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { uploadProductRating, getProductRating, getProductRatings } from "@/lib/Business-server-action";
import { toast } from "sonner";
import RatingButton from "../navbar/RatingButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RatingComponentProps {
  className?: string;
  businessId: string;
  product: any;
  authenticatedUser?: any;
}

const BusinessRatingComponent: React.FC<RatingComponentProps> = ({ className, product, businessId, authenticatedUser }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingsCount, setRatingsCount] = useState<number>(0);
  const [ratings, setRatings] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const { averageRating, ratingsCount } = await getProductRating(businessId);
        setAverageRating(averageRating);
        setRatingsCount(ratingsCount);
      } catch (error) {
        console.error("Error fetching product rating:", error);
        setError("Failed to fetch product rating. Please try again.");
      }
    };

    const fetchProductRatings = async () => {
      try {
        const ratings = await getProductRatings(businessId);
        setRatings(ratings);
      } catch (error) {
        console.error("Error fetching product ratings:", error);
        setError("Failed to fetch product ratings. Please try again.");
      }
    };

    fetchProductRating();
    fetchProductRatings();
  }, [businessId]);

  const handleRatingClick = (value: number) => {
    setRating(value === rating ? 0 : value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await uploadProductRating(businessId, rating, comment);

      setRating(0);
      setComment("");
      toast.success("Rating submitted successfully!");

      const { averageRating, ratingsCount } = await getProductRating(businessId);
      setAverageRating(averageRating);
      setRatingsCount(ratingsCount);

      const ratings = await getProductRatings(businessId);
      setRatings(ratings);
      router.refresh();
    } catch (error) {
      console.error("Error uploading product rating:", error);
      setError("Failed to submit rating. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4">How was your experience with <span className="font-bold">{product.name}</span>?</CardTitle>
          <CardContent className="flex justify-center">
            <Image
              src={product.logo}
              alt="profile"
              width={150}
              height={150}
              className="rounded-full"
            />
          </CardContent>
        </CardHeader>
        {authenticatedUser ? (
          <>
            <CardContent className="mt-6">
              <CardDescription className="text-lg text-center mb-4">Rate this destination by selecting a rating and adding a comment.</CardDescription>
              <p className="text-center mb-4">Average Rating: {averageRating.toFixed(1)} ({ratingsCount} ratings)</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <Label htmlFor="rating" className="text-lg">Your rating:</Label>
                  <RadioGroup aria-label="Rating" id="rating" className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value: number) => (
                      <React.Fragment key={value}>
                        <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`rating-${value}`}
                          className="cursor-pointer"
                          onClick={() => handleRatingClick(value)}
                          onMouseEnter={() => handleMouseEnter(value)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <StarIcon
                            className="w-8 h-8"
                            fill={value <= (hoverRating || rating) ? "#0E793C" : "none"}
                            stroke={value <= (hoverRating || rating) ? "#0E793C" : "currentColor"}
                          />
                        </Label>
                      </React.Fragment>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="comment" className="text-lg">Your comment (optional):</Label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="rounded p-2 h-32 border border-gray-300"
                    placeholder="Write your comment here..."
                  />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#0E793C] text-[#ffffff]" type="submit">
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </>
        ) : (
          <RatingButton />
        )}
      </Card>
    </div>
  );
};

type SVGProps = React.SVGProps<SVGSVGElement>;

const StarIcon: React.FC<SVGProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default BusinessRatingComponent;
