// app/admin/guide/page.jsx : how to add projects + image specs
import Link from "next/link";

const wrap = { maxWidth: 820, padding: "8px 4px 60px" };
const h1 = { fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--tw-navy, #121642)", marginBottom: 8 };
const lead = { color: "#666", marginBottom: 28, lineHeight: 1.6 };
const card = { background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "22px 24px", marginBottom: 20 };
const h2 = { fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--tw-navy, #121642)", marginBottom: 14 };
const row = { display: "flex", gap: 14, padding: "10px 0", borderTop: "1px solid rgba(0,0,0,0.06)" };
const key = { fontFamily: "var(--font-display)", fontWeight: 600, minWidth: 150, color: "#121642" };
const val = { color: "#555", lineHeight: 1.5 };

function Field({ name, children }) {
  return (
    <div style={row}>
      <div style={key}>{name}</div>
      <div style={val}>{children}</div>
    </div>
  );
}

export default function AdminGuide() {
  return (
    <div style={wrap}>
      <h1 style={h1}>Adding a Project</h1>
      <p style={lead}>
        A quick reference for what each field means and the image sizes to use.
        Projects appear on the work page automatically when Status is Published,
        and on the homepage slider when Featured is on.
      </p>

      <div style={card}>
        <h2 style={h2}>The five card values</h2>
        <p style={{ color: "#666", marginBottom: 12, lineHeight: 1.6 }}>
          Every card (homepage slider, work page, and the project page) shows the
          same five values on hover. Keep them short so they fit on one line.
        </p>
        <Field name="Title">Project name. Can be creative or just the client name.</Field>
        <Field name="Client">Who it was for. Add the studio in brackets if relevant, e.g. "Vault22 (MB96)".</Field>
        <Field name="Build">The tech or tool used. e.g. Next.js, Webflow, WordPress + WooCommerce.</Field>
        <Field name="Site Type">The kind of site. e.g. Landing Page, E-commerce Store, Web Platform, Event Site.</Field>
        <Field name="Work Done">Your role on it. e.g. UI/UX + Web Dev, Strategy + UI/UX + Web, Web Dev.</Field>
      </div>

      <div style={card}>
        <h2 style={h2}>Other fields</h2>
        <Field name="Slug (URL)">Auto-filled from the title. This is the page address: /work/your-slug. Cannot change after creation.</Field>
        <Field name="Category">Used for the filter on the work page. Keep categories consistent so the filter stays tidy.</Field>
        <Field name="Timeline">When it ran, e.g. "2024" or "2023 - Present".</Field>
        <Field name="Tags">Comma separated. Shown on the project page, e.g. Fintech, WooCommerce, Web.</Field>
        <Field name="Short Description">One or two sentences. Used as the project summary.</Field>
        <Field name="Full Description">The case-study text on the project page. Leave a blank line between paragraphs to split them.</Field>
        <Field name="Status">Draft hides it from the site. Published shows it on the work page.</Field>
        <Field name="Featured">On = it appears on the homepage Featured Work slider. Aim for about five.</Field>
        <Field name="Live URL">The public link to the project. Leave it blank if there is no public link. Projects with a link show a "View Site" button; projects without one show an "Ask Me About This Project" button that points visitors to the contact page (many client builds are private, behind a login, or since rebuilt).</Field>
      </div>

      <div style={card}>
        <h2 style={h2}>Images and sizes</h2>
        <p style={{ color: "#666", marginBottom: 12, lineHeight: 1.6 }}>
          If you do not upload an image, the site uses the shared placeholder
          (/images/placeholder.jpg) automatically, so nothing ever looks broken.
        </p>
        <Field name="Cover (card)">Portrait, 3:4 ratio. Recommended 1080 x 1440 px. This fills the tall cards.</Field>
        <Field name="Cover (project page)">Wide, 16:9 ratio. Recommended 1600 x 900 px. Shown at the top of the project page.</Field>
        <Field name="Gallery">Landscape, 4:3 ratio. Recommended 1200 x 900 px each. Up to 10 images.</Field>
        <Field name="Format">JPG or WebP, optimised to roughly under 500 KB each for fast loading.</Field>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/admin/projects/new" className="btn btn-primary">Add a Project</Link>
        <Link href="/admin/projects" className="btn btn-ghost">Back to Projects</Link>
      </div>
    </div>
  );
}
