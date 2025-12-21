"use client";

import { TypographyH2, TypographyP } from "@/components/ui/typography";
import React, { useState } from "react";

const cards = [1, 2, 3, 4, 5, 6];


<<<<<<< Updated upstream
export default function Home() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <>
      {/*
        Main page wrapper.
        🎯 GOAL #1: Change ONE WORD in this Tailwind class.
        Example: bg-slate-1`00 → bg-slate-200

        📝 What happened after your change?
        (Write here)
      */}
      <main className="min-h-screen bg-slate-100 p-4">

        {/* Header section */}
        <header className="mb-4">

          {/* Page title */}
          {/*
            🎯 GOAL #2: Change ONE WORD here.
            Example: text-2xl → text-3xl

            📝 What happened after your change?
            (Write here)
          */}
          <h1 className="text-6xl font-bold">Tech Product Hub</h1>

          {/* Subtitle text */}
          <p className="text-sm text-slate-600">
             {/* Canvas-style dashboard */}
          </p>
        </header>

        {/* Container for the grid */}
        <section className="bg-white rounded-xl p-4">

          {/* Section heading */}
          <h2 className="text-lg font-semibold mb-3">Nonprofit Canvas</h2>


          {/* Grid layout.
            🎯 GOAL #3: Change ONE WORD.
            Example: gap-4 → gap-2

            📝 What happened after your change?
            (Write here)*/}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

            {cards.map((num) => (
              <button
                key={num}
                onClick={() => setSelectedCard(num)}
                className="h-32 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-500 text-sm hover:bg-slate-100 hover:border-slate-400 transition-colors cursor-pointer"
              >
                {/* Empty card #{num} - Click to view */}
              </button>
            ))}

          </div>
        </section>
      </main>

      {/* Modal overlay - shows when a card is selected */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Card View #{selectedCard}</h2>
              <button
                onClick={() => setSelectedCard(null)}
                className="text-slate-500 hover:text-slate-900 text-2xl"
              >
                ×
              </button>
            </div>

            {/*
              This is a blank card view to demonstrate the modal.
              You can add content here later!
            */}
            <div className="h-64 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-500">
              <p>Card #{selectedCard} - This view is currently blank</p>
            </div>
          </div>
        </div>
      )}
=======
export default function Dashboard() {
  return (
    <>
      <TypographyH2>Home page</TypographyH2>
      <TypographyP>Please log in to access the dashboard</TypographyP>
>>>>>>> Stashed changes
    </>
  );
}
