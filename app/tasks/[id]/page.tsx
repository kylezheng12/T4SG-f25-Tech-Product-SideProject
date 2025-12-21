import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase.from("projects").select("*");
if (error) {
  throw error;
}

const cards = data;

// This function receives the id from the URL
// In Next.js, [id] in the folder name means it's a dynamic route
export default function TaskDetail({ params }: { params: { id: string } }) {
  // Convert the id from string to number
  const taskId = parseInt(params.id);

  // Find the card with matching id
  const task = cards.find((card) => card.id === taskId);

  // If task not found, show a message
  if (!task) {
    return (
      <main className="min-h-screen bg-slate-100 p-4">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-6">
          <TypographyH2>Task Not Found</TypographyH2>
          <TypographyP>The task you're looking for doesn't exist.</TypographyP>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
        {/* Back Button */}
        <Link href="/">
          {/*
            🎯 GOAL #3: The button below uses variant="ghost".
            Try changing it to variant="outline" or variant="link".

            📝 What's the visual difference between these button variants?
            (Write here)
          */}
          <Button variant="ghost" className="mb-4">
            ← Back to Tasks
          </Button>
        </Link>
        {/* Task Title */}
        <TypographyH2 className="mb-2">{task.title}</TypographyH2>
        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`inline-block rounded px-3 py-1 text-sm font-medium ${
              task.status === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {task.status}
          </span>
        </div>
        {/* Organization */}
        <div className="mb-4">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Organization:</span> {task.orgname}
          </p>
        </div>
        {/* Full Description */}
        <div className="mb-6">
          <TypographyP className="text-base leading-relaxed">{task.description}</TypographyP>
        </div>
        {/* Required Skills */}
        <div className="mb-6">
          <h3 className="mb-2 font-semibold">Required Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {task.reqskills.map((reqskills, index) => (
              <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                {reqskills}
              </span>
            ))}
          </div>
        </div>
        {/* Sign Up Button */}
        {/*
          🎯 GOAL #4: The button below is disabled when status is "closed".
          Try removing the "disabled" attribute and see what happens.

          📝 Why might we want to disable the button for closed tasks?
          (Write here)
        */}
        <Button className="w-full" disabled={task.status === "closed"}>
          {task.status === "open" ? "Sign Up for This Task" : "Task Closed"}
        </Button>
      </div>
    </main>
  );
}
