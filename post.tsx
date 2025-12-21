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
    {
      title: "Mobile App Development",
      orgname: "Youth Mentorship Program",
      description: "We need a mobile app to help coordinate volunteers for our events and programs.",
      short_description: "Creating an app for volunteer coordination",
      timeline: "8 weeks",
      numswe: 6,
      email: "user@example.com",
      status: "closed",
      reqskills: ["React Native", "Mobile Development"],
    },
    {
      title: "Email Automation",
      orgname: "Animal Shelter",
      description:
        "We want to set up automated email campaigns to keep our donors and volunteers informed about our activities.",
      short_description: "Setting up automated email campaigns",
      timeline: "3 weeks",
      numswe: 2,
      email: "user@example.com",
      status: "open",
      reqskills: ["Email Marketing", "Automation"],
    },
    {
      title: "Data Analytics Dashboard",
      orgname: "Education Foundation",
      description:
        "We need a dashboard to visualize our donor contributions and volunteer hours to help with reporting and planning.",
      short_description: "Visualizing donor and volunteer data",
      timeline: "6 weeks",
      numswe: 5,
      email: "user@example.com",
      status: "open",
      reqskills: ["Data Visualization", "Analytics", "Dashboard"],
    },
    {
      title: "Security Audit",
      orgname: "Healthcare Nonprofit",
      description: "We need a security professional to review our systems and identify potential vulnerabilities.",
      short_description: "Reviewing our systems for vulnerabilities",
      timeline: "10 weeks",
      numswe: 1,
      email: "user@example.com",
      status: "closed",
      reqskills: ["Security", "Cybersecurity"],
    },
  ])
  .select(); // returns inserted rows
data;
if (error) {
  throw error;
}
