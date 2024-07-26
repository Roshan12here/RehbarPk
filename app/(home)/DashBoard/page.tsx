"use client"

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getUserStats } from "@/lib/server-actions"; // Adjust this import path as needed
import { getUserStatsa } from "@/lib/Business-server-action";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Link from "next/link";

interface UserStats {
  productsPosted: number;
  ratingsMade: number;
}

export default function Component() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStatsb, setUserStatsb] = useState<UserStats | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const stats = await getUserStats();
        setUserStats(stats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
        setError("Failed to load user stats. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserStats();

    const fetchUserStatsb = async () => {
      try {
        const stats = await getUserStatsa();
        setUserStatsb(stats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
        setError("Failed to load user stats. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserStatsb();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const combinedRatingsMade = (userStats?.ratingsMade || 0) + (userStatsb?.ratingsMade || 0);

  const data = [
    { name: "Ratings Made", value: combinedRatingsMade },
    { name: "Products Posted", value: userStats?.productsPosted || 0 },
    { name: "Business Posted", value: userStatsb?.productsPosted || 0 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-card py-4 px-6 shadow">
        <h1 className="text-2xl font-bold text-card-foreground">Dashboard</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-card-foreground">Reviews</h2>
                <StarIcon className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{combinedRatingsMade}</div>
            </CardContent>
          </Card>
              <Link href={"/My-Destinations"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-card-foreground">Destinations Posted</h2>
                <MapPinIcon className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{userStats?.productsPosted}</div>
            </CardContent>
          </Card>
              </Link>
              <Link href="/My-Businesses">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-card-foreground">Business Posted</h2>
                <BriefcaseIcon className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{userStatsb?.productsPosted}</div>
            </CardContent>
          </Card>
          </Link>
        </div>
        <div className="flex justify-center mt-8">
          <BarChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#34D399" />
          </BarChart>
        </div>
      </main>
    </div>
  );
}

// Icon components (StarIcon, MapPinIcon, BriefcaseIcon) remain the same as in your original code

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
