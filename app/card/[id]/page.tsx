// Import Link component to create navigation buttons
import Link from "next/link";

// This function creates the card view page
// params.id contains the card number from the URL (e.g., /card/3 means id = "3")
export default function CardView({ params }: { params: { id: string } }) {
  const cardId = params.id;

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button to return to home page */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6"
        >
          ← Back to Home
        </Link>

        {/* Main card content container */}
        <div className="bg-white rounded-xl p-8">
          <h1 className="text-2xl font-bold mb-6">Card View #{cardId}</h1>

          {/* Template area - experiment with these sections! */}
          <div className="space-y-6">
            {/* Image section - replace the placeholder with your image */}
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 overflow-hidden">
              <div className="h-64 flex items-center justify-center text-slate-500">
                {/* To add an image, replace this div with: */}
                {/* <img src="/your-image.jpg" alt="Description" className="w-full h-full object-cover" /> */}
                <p className="text-sm">Image placeholder - Add your image here</p>
              </div>
            </div>

            {/* Title section */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Card Title</h2>
              <p className="text-slate-600">Add a title or description here</p>
            </div>

            {/* Content section */}
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6">
              <p className="text-slate-500 text-sm mb-2">Content Area</p>
              <p className="text-slate-600">This view is currently blank - experiment with adding content here!</p>
            </div>

            {/* Additional section for more content */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                <p className="text-slate-500 text-sm">Section 1</p>
              </div>
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                <p className="text-slate-500 text-sm">Section 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

