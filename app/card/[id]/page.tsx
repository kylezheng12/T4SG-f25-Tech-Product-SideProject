import Link from "next/link";

/**
 * Card View Template Page
 *
 * This is a reusable template page for displaying card-based content.
 * The [id] in the folder structure creates a dynamic route in Next.js.
 *
 * Example: Visiting /card/5 will render this component with cardId = "5"
 *
 * Use this template to create custom card views for different content types
 * like team members, projects, resources, etc.
 *
 * @param params - Route parameters object from Next.js
 * @param params.id - The card identifier from the URL
 *
 * Route: /card/[id]
 */
export default function CardView({ params }: { params: { id: string } }) {
  // Extract the card ID from the route parameters
  const cardId = params.id;

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      {/*
        Container with max width for better readability on large screens
        max-w-4xl: Limits content width to prevent overly long lines
        mx-auto: Centers the container horizontally
      */}
      <div className="max-w-4xl mx-auto">

        {/*
          Back navigation link
          inline-flex: Makes the link behave as an inline flex container
          Includes hover states for both light and dark modes
        */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-6"
        >
          ← Back to Home
        </Link>

        {/*
          Main card container
          rounded-xl: Large border radius for modern appearance
          Uses dark mode color variants for background
        */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8">
          <h1 className="text-2xl font-bold dark:text-white mb-6">Card View #{cardId}</h1>

          {/*
            Content sections wrapper
            space-y-6: Adds vertical spacing between child elements
          */}
          <div className="space-y-6">

            {/*
              Image placeholder section
              border-dashed: Creates a dashed border to indicate placeholder status
              h-64: Fixed height of 16rem (256px)
              overflow-hidden: Prevents content from exceeding rounded corners
              flex/items-center/justify-center: Centers the placeholder text
            */}
            <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 overflow-hidden">
              <div className="h-64 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <p className="text-sm">Image placeholder - Add your image here</p>
              </div>
            </div>

            {/*
              Title and description section
              Simple text content with semantic heading hierarchy
            */}
            <div>
              <h2 className="text-xl font-semibold dark:text-white mb-2">Card Title</h2>
              <p className="text-slate-600 dark:text-slate-300">Add a title or description here</p>
            </div>

            {/*
              Main content area with dashed border
              Provides a clear visual boundary for content placement
              Includes padding (p-6) for internal spacing
            */}
            <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-6">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">Content Area</p>
              <p className="text-slate-600 dark:text-slate-300">This view is currently blank - experiment with adding content here!</p>
            </div>

            {/*
              Two-column grid layout for additional sections
              grid-cols-2: Creates 2 equal-width columns
              gap-4: Adds spacing between grid items
              Responsive design: Could be modified with breakpoints (e.g., md:grid-cols-2)
            */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm">Section 1</p>
              </div>
              <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 p-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm">Section 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

