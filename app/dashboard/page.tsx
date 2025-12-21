import { Button } from "@/components/ui/button";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { redirect } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const { data, error } = await supabase.from("projects").select("*");
if (error) {
  throw error;
}

const cards = data;

const cards1 = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Need help updating our nonprofit website",
    status: "open",
  },
  {
    id: 2,
    title: "Database Migration",
    description: "Moving from Excel to a proper database system",
    status: "open",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Creating an app for volunteer coordination",
    status: "closed",
  },
  {
    id: 4,
    title: "Email Automation",
    description: "Setting up automated email campaigns",
    status: "open",
  },
  {
    id: 5,
    title: "Data Analytics Dashboard",
    description: "Visualizing donor and volunteer data",
    status: "open",
  },
  {
    id: 6,
    title: "Security Audit",
    description: "Reviewing our systems for vulnerabilities",
    status: "closed",
  },
];
cards1;
export default async function Dashboard() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route

    /*
      Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.
      Always use supabase.auth.getUser() to protect pages and user data.
      Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.
      It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.
    */

    redirect("/");
  }

  const userEmail = user.email;

  userEmail;

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      {/* Header section */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Tech Product Hub</h1>
        <p className="text-sm text-slate-600">Canvas-style dashboard</p>
      </header>

      {/* Container for the grid */}
      <section className="rounded-xl bg-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Nonprofit Canvas</h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col rounded-lg border border-slate-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Card Title */}
              <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>

              {/* Card Description */}
              <p className="mb-3 flex-grow text-sm text-slate-600">{card.short_description}</p>

              {/* Status Badge */}
              <div className="mb-3">
                {/*
                  🎯 GOAL #1: The status badge below shows "open" or "closed".
                  Change the background color for "closed" status.
                  Currently: bg-green-100 text-green-800
                  Try: bg-red-100 text-red-800 (or another color combination)

                  📝 What happens when you change the colors?
                  (Write here)
                */}
                <span
                  className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                    card.status === "open" ? "bg-green-100 text-green-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {card.status}
                </span>
              </div>

              {/* View Details Button */}
              {/*
                🎯 GOAL #2: The Link component below creates a clickable link.
                The href="/tasks/1" means it will navigate to a page at /tasks/1

                Change the number "1" to use the card's id instead.
                Hint: Use template literals: `/tasks/${card.id}`

                📝 What is the difference between "/tasks/1" and `/tasks/${card.id}`?
                (Write here)
              */}
              <Link href="/tasks/1">
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

/*
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route

    /*
      Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.
      Always use supabase.auth.getUser() to protect pages and user data.
      Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.
      It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.
    */ /*

    redirect("/");
  }

  const userEmail = user.email;

  return (
    <>
      <TypographyH2>Dashboard</TypographyH2>
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {userEmail && <TypographyP>{`Your email is ${userEmail}`}</TypographyP>}
    </>
  );
}
*/
