"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  uploadProductRating,
  getProductRating,
  getProductRatings
} from "@/lib/server-actions";
import { toast } from "sonner";
import RatingButton from "./navbar/RatingButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PiCalendar } from "react-icons/pi";
import { Calendar } from "./ui/calendar";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { ImagesUploader } from "@/components/images-uploader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input, Textarea } from "@headlessui/react";

interface RatingComponentProps {
  className?: string;
  productId: string;
  authenticatedUser?: any;
  product?: any;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ className, product, productId, authenticatedUser }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingsCount, setRatingsCount] = useState<number>(0);
  const [ratings, setRatings] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reviewType, setReviewType] = useState<"BUSINESS" | "COUPLES" | "FAMILY" | "FRIENDS" | "SOLO">("BUSINESS");
  const [photos, setPhotos] = useState<string[]>([]);
  const [showUploader, setShowUploader] = useState<boolean>(true);
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());

  const [calendarKey, setCalendarKey] = useState(0); 

  useEffect(() => {
    setCalendarKey(prevKey => prevKey + 1); // Update key to force re-render
  }, [calendarYear]);

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const { averageRating, ratingsCount } = await getProductRating(productId);
        setAverageRating(averageRating);
        setRatingsCount(ratingsCount);
      } catch (error) {
        console.error("Error fetching product rating:", error);
        setError("Failed to fetch product rating. Please try again.");
      }
    };

    const fetchProductRatings = async () => {
      try {
        const ratings = await getProductRatings(productId);
        setRatings(ratings);
      } catch (error) {
        console.error("Error fetching product ratings:", error);
        setError("Failed to fetch product ratings. Please try again.");
      }
    };

    fetchProductRating();
    fetchProductRatings();
  }, [productId]);

  useEffect(() => {
    setShowUploader(photos.length <= 1);
  }, [photos]);

  const handleRatingClick = (value: number) => {
    setRating(value === rating ? 0 : value);
  };

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handlePhotoChange = (urls: string[]) => {
    setPhotos(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!selectedDate) {
        throw new Error("Please select a date.");
      }

      await uploadProductRating(productId, rating, comment, headline, selectedDate, reviewType, photos);

      setRating(0);
      setComment("");
      setHeadline("");
      setSelectedDate(null);
      setReviewType("FRIENDS");
      setPhotos([]);
      toast.success("Rating submitted successfully!");

      const { averageRating, ratingsCount } = await getProductRating(productId);
      setAverageRating(averageRating);
      setRatingsCount(ratingsCount);

      const ratings = await getProductRatings(productId);
      setRatings(ratings);
    } catch (error) {
      console.error("Error uploading product rating:", error);
      setError("Failed to submit rating. Please try again.");
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(event.target.value, 10);
    setCalendarYear(year);
  };

  const handleDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setSelectedDate(new Date(value).toISOString());
    }
  };

  return (
    <div className="flex  justify-evenly w-full h-full items-center">
      <Card className=" h-full max-w-md mr-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-semibold">
            How was your Experience at {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 overflow-y-auto">
          <Image
            src={product.logo}
            alt="logo"
            width={1222}
            height={1222}
          />
          <CardDescription>
            <h1 className="font-semibold text-2xl mt-2 ">{product.name}</h1>
            <h2 className="mt-1 text-lg  ">{product.headline}</h2>
          </CardDescription>
        </CardContent>
      </Card>

      <Card className={`w-full ml-auto h-full ${className}`}>
        {authenticatedUser ? (
          <>
            <CardContent className="grid gap-4 max-h-[80vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="flex flex-col  items-center gap-2">
                  <Label htmlFor="rating" className="text-3xl mt-4 font-semibold" >Your rating:</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <React.Fragment key={value}>
                        <input
                          type="radio"
                          id={`rating-${value}`}
                          name="rating"
                          value={value}
                          className="peer sr-only"
                          checked={rating === value}
                          onChange={() => handleRatingClick(value)}
                        />
                        <Label
                          htmlFor={`rating-${value}`}
                          className="cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(value)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <StarIcon
                            className="w-9 h-9 border-[2px] text-[#0E793C] "
                            fill={value <= (hoverRating || rating) ? "#0E793C" : "none"}
                            stroke={value <= (hoverRating || rating) ? "#0E793C" : "currentColor"}
                          />
                        </Label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
      <Label htmlFor="selectedDate" className="text-xl items-center text-center font-semibold mt-4">When did you Visit:</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal border-[#0E793C]",
              !selectedDate && "text-muted-foreground"
            )}
          >
            {selectedDate ? format(parseISO(selectedDate), "PPP") : <span>Pick a date</span>}
            <PiCalendar className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between mb-2">
              <Button
                onClick={() => setCalendarYear(calendarYear - 1)}
                variant={"outline"}
                className="w-1/3"
              >
                Previous Year
              </Button>
              <select
                value={calendarYear}
                onChange={handleYearChange}
                className="p-2 border border-gray-300 rounded w-1/3 text-center"
              >
                {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - 50 + index).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <Button
                onClick={() => setCalendarYear(calendarYear + 1)}
                variant={"outline"}
                className="w-1/3"
              >
                Next Year
              </Button>
            </div>
            <div className="w-full">
              <Calendar
                key={calendarKey} // Force re-render with new key
                mode="single"
                selected={selectedDate ? parseISO(selectedDate) : undefined}
                onSelect={(date) => setSelectedDate(date ? date.toISOString() : null)}
                initialFocus
                defaultMonth={new Date(calendarYear, 0, 1)}
                className="w-full"
              />
            </div>
            <input
              type="date"
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              onChange={handleDateInputChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="comment" className="text-xl items-center text-center font-semibold mt-4 ">Write a Review</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="rounded p-2 h-[22vh] border-[1px] border-[#0E793C]"
                    placeholder="Write your comment here..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="headline" className="text-xl items-center text-center font-semibold mt-4">Headline (optional):</Label>
                  <Input
                    id="headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="rounded p-2 border-[1px] border-[#0E793C]"
                    placeholder="Write your headline here..."
                  />
                </div>
          
          <div className="flex flex-col gap-2">
                  <Label htmlFor="reviewType" className="text-xl items-center text-center font-semibold mt-4">   
                      Who did you go with?
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="rounded p-2 border-[1px] border-[#0E793C]">
                        {reviewType}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setReviewType("BUSINESS")}>
                        Business
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setReviewType("COUPLES")}>
                        Couples
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setReviewType("FAMILY")}>
                        Family
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setReviewType("FRIENDS")}>
                        Friends
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setReviewType("SOLO")}>
                        Solo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="photos" className="text-xl items-center text-center font-semibold mt-4 border-[#0E793C]">Photos (optional)</Label>
                  {showUploader ? (
                    <ImagesUploader
                      onChange={handlePhotoChange}
                      endpoint="productImages" // Use appropriate endpoint
                    />
                  ) : (
                    <div className="flex gap-2">
                      {photos.map((photo, index) => (
                        <Image key={index} src={photo} alt="Review" width={80} height={80} className="object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#0E793C] text-white w-full h-[8vh] rounded-lg  text-xl " type="submit">
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    </svg>
  );
};

export default RatingComponent;
