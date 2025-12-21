"use client";

import { TypographyH2, TypographyP } from "@/components/ui/typography";

const cards = [1, 2, 3, 4, 5, 6];

export default function Dashboard() {
  return (
    <>
      <TypographyH2>Home page</TypographyH2>
      <TypographyP>Please log in to access the dashboard</TypographyP>
    </>
  );
}
