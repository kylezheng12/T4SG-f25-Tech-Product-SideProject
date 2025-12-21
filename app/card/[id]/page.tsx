import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

/**
 * Initialize Supabase client for database access
 * Uses public environment variables that are safe to expose in the browser
 * The '!' tells TypeScript these variables will definitely exist
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all projects from the database at build time
 * This runs on the server before the page renders
 * Data is fetched once and shared across all task detail pages
 */
const { data, error } = await supabase.from("projects").select("*");
if (error) {
  throw error;
}

const cards = data;

/**
 * Task Detail Page Component
 *
 * This page displays comprehensive information about a single nonprofit project/task.
 * The [id] in the folder name makes this a dynamic route in Next.js.
 *
 * Example: Visiting /tasks/3 will show details for the project with id=3
 *
 * @param params - Object containing route parameters
 * @param params.id - The task ID from the URL (automatically passed by Next.js)
 *
 * Route: /card/[id]
 */
export default function TaskDetail({ params }: { params: { id: string } }) {
  // Convert URL parameter from string to number for database lookup
  const taskId = parseInt(params.id);

  // Search through all projects to find the one matching this ID
  const task = cards.find((card) => card.id === taskId);

  /**
   * Error handling: Show user-friendly message if task doesn't exist
   * This can happen if user manually types an invalid ID in the URL
   */
  if (!task) {
    return (
      <main className="min-h-screen bg-slate-100 p-4 dark:bg-slate-900">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 dark:bg-slate-800">
          <TypographyH2>Task Not Found</TypographyH2>
          <TypographyP>The task you're looking for doesn't exist.</TypographyP>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Main task detail view
  return (
    <main className="min-h-screen bg-slate-100 p-4 dark:bg-slate-900">
      {/*
        Content container with max width for readability
        mx-auto centers the content horizontally
      */}
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
        {/*
          Back navigation button
          variant="ghost" gives a minimal, text-only appearance
        */}
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Back to Tasks
          </Button>
        </Link>

        {/* Project title using typography component for consistent styling */}
        <TypographyH2 className="mb-2">{task.title}</TypographyH2>

        {/*
          Dynamic status badge
          Conditionally applies green colors for "open" status, red for "closed"
          Uses template literals with ternary operator for class selection
        */}
        <div className="mb-4">
          <span
            className={`inline-block rounded px-3 py-1 text-sm font-medium ${
              task.status === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {task.status}
          </span>
        </div>

        {/*
          Organization name display
          Uses dark mode variants (dark:text-slate-300) to ensure readability in both themes
        */}
        <div className="mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold">Organization:</span> {task.orgname}
          </p>
        </div>

        {/*
          Full project description
          Uses TypographyP component for proper paragraph spacing and line height
        */}
        <div className="mb-6">
          <TypographyP className="text-base leading-relaxed">{task.description}</TypographyP>
        </div>

        {/*
          Skills section: Display all required skills as pill-shaped badges
          Uses .map() to iterate over the reqskills array
          flex-wrap ensures tags wrap to next line on small screens
        */}
        <div className="mb-6">
          <h3 className="mb-2 font-semibold dark:text-white">Required Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {task.reqskills.map((skill: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/*
          Call-to-action button
          - Full width for better mobile UX (w-full)
          - Automatically disabled when task status is "closed"
          - Text changes based on status to give clear feedback
          - Disabled state prevents users from signing up for unavailable tasks
        */}
        <Button className="w-full" disabled={task.status === "closed"}>
          {task.status === "open" ? "Sign Up for This Task" : "Task Closed"}
        </Button>
      </div>
    </main>
  );
}
