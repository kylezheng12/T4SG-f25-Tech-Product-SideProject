import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * Initialize Supabase client for public data access
 * These credentials are safe to expose in the browser as they only allow
 * row-level security (RLS) controlled operations
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all active projects from the database
 * This query runs at build time or when the page is rendered on the server
 * Data is fetched once and shared across the dashboard view
 */
const { data, error } = await supabase.from("projects").select("*");
if (error) {
  throw error;
}

const cards = data;

/**
 * Dashboard Page Component
 *
 * Protected route that displays all available nonprofit projects in a card grid layout.
 * Only authenticated users can access this page.
 *
 * Features:
 * - User authentication check with server-side validation
 * - Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
 * - Project cards with status badges and navigation to detail pages
 * - Dark mode support throughout
 *
 * Route: /dashboard
 */
export default async function Dashboard() {
  /**
   * Authentication Check
   * Creates a server-side Supabase client to verify user authentication
   * This runs on every page load to ensure the user is still authenticated
   */
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**
   * Route Protection
   * If no authenticated user is found, redirect to home/login page
   *
   * Security Note:
   * - Always use getUser() (not getSession()) in server code
   * - getUser() validates the auth token with Supabase servers on every call
   * - getSession() only reads from cookies which can be spoofed
   * - This prevents unauthorized access even if cookies are manipulated
   */
  if (!user) {
    redirect("/");
  }

  // Extract user email for potential display or logging
  const userEmail = user.email;

  // Main dashboard view
  return (
    <main className="min-h-screen bg-slate-100 p-4 dark:bg-slate-900">
      {/*
        Page Header
        Provides context about the dashboard's purpose
        Uses dark mode variants for text readability
      */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Tech Product Hub</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Canvas-style dashboard</p>
      </header>

      {/*
        Main Content Section
        Rounded container that houses the project grid
        Background adapts to light/dark mode
      */}
      <section className="rounded-xl bg-white p-4 dark:bg-slate-800">
        <h2 className="mb-3 text-lg font-semibold dark:text-white">Nonprofit Canvas</h2>

        {/*
          Responsive Grid Layout
          - Mobile (default): 1 column
          - Tablet (sm: 640px+): 2 columns
          - Desktop (md: 768px+): 3 columns
          - gap-4: Adds 1rem spacing between cards
        */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col rounded-lg border border-slate-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-600 dark:bg-slate-700"
            >
              {/*
                Project Card Structure
                flex-col: Stacks content vertically
                transition-shadow: Smooth animation on hover
                hover:shadow-md: Elevates card on mouse hover for interactivity
              */}

              {/* Project title */}
              <h3 className="mb-2 text-lg font-semibold dark:text-white">{card.title}</h3>

              {/*
                Project description
                flex-grow: Pushes footer content to bottom of card
                Ensures consistent card heights in the grid
              */}
              <p className="mb-3 flex-grow text-sm text-slate-600 dark:text-slate-300">{card.short_description}</p>

              {/*
                Dynamic Status Badge
                Conditionally styles based on project status
                - "open": Green background (available for signup)
                - "closed": Red background (no longer accepting volunteers)
              */}
              <div className="mb-3">
                <span
                  className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                    card.status === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {card.status}
                </span>
              </div>

              {/*
                Navigation to Detail Page
                Uses Next.js Link for client-side navigation (faster page transitions)
                Template literal constructs dynamic URL: /card/1, /card/2, etc.
                variant="outline": Button style with border and transparent background
                w-full: Button spans full width of card
              */}
              <Link href={`/card/${card.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
