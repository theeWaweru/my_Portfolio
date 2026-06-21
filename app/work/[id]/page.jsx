// app/work/[id]/page.jsx
// Direct/shared visits to a project render the SAME work slider with the project
// preselected and its overlay open, so "Back to Work" retracts into the slider
// with that project active (one unified inner experience). Metadata stays
// server-side so SEO and shared-link previews keep working.
import { getProjectById } from "../../lib/supabase/projects";
import WorkPage from "../page";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: project } = await getProjectById(id);
  if (!project) return { title: "Project Not Found | David Waweru" };
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  return <WorkPage initialId={id} />;
}
