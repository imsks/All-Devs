import { GitBranch, Lightbulb, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">AllDevs<span>Build Circles</span></Link>
        <span className="preview-label">Local preview</span>
        <button className="github-button" disabled title="GitHub sign-in is not configured">
          <GitBranch size={16} aria-hidden="true" /> GitHub
        </button>
      </header>
      <main className="workspace">
        <section className="ideas" aria-labelledby="ideas-heading">
          <p className="section-label">Ideas</p>
          <h1 id="ideas-heading">Discover ideas</h1>
          <div className="empty-state">
            <Lightbulb size={32} strokeWidth={1.5} aria-hidden="true" />
            <p>No ideas yet.</p>
          </div>
        </section>
        <aside className="circles" aria-labelledby="circles-heading">
          <MessageCircle size={20} aria-hidden="true" />
          <h2 id="circles-heading">Your circles</h2>
          <p>No circles yet.</p>
        </aside>
      </main>
    </>
  );
}
