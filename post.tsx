import "dotenv/config";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase
  .from("projects")
  .insert([
    {
      title: "Database Migration",
      orgname: "Community Center",
      description:
        "We currently manage all our donor and volunteer information in Excel spreadsheets. We need help migrating to a proper database system.",
      short_description: "Moving from Excel to a proper database system",
      timeline: "2 weeks",
      numswe: 3,
      email: "user@example.com",
      status: "open",
      reqskills: ["Database", "SQL", "Data Migration"],
    },
  ])
  .select(); // returns inserted rows
data;
if (error) {
  throw error;
}
