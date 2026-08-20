import { useState } from "react";
import {
  BookOpen,
  Clock3,
  Compass,
  FolderPlus,
  Headphones,
  LibraryBig,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

type NavItem = "Home" | "Library" | "Continue Reading" | "Favorites" | "Settings";

const navItems: { label: NavItem; icon: typeof Compass }[] = [
  { label: "Home", icon: Compass },
  { label: "Library", icon: LibraryBig },
  { label: "Continue Reading", icon: BookOpen },
  { label: "Favorites", icon: Sparkles },
  { label: "Settings", icon: Settings },
];

const books = [
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", chapter: "Chapter 6", progress: 67, tone: "ochre" },
  { title: "Piranesi", author: "Susanna Clarke", chapter: "Part Two", progress: 34, tone: "blue" },
  { title: "The Dispossessed", author: "Ursula K. Le Guin", chapter: "Chapter 3", progress: 12, tone: "green" },
];

export function App() {
  const [active, setActive] = useState<NavItem>("Home");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>l</span></div>
        <div className="brand-copy"><strong>leafline</strong><small>your quiet library</small></div>

        <nav className="primary-nav" aria-label="Main navigation">
          <p className="nav-label">Explore</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button className={`nav-item ${active === label ? "active" : ""}`} key={label} onClick={() => setActive(label)}>
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="storage-line"><span className="status-dot" /> offline library</div>
          <button className="user-chip"><span className="avatar">VK</span><span>Vivek's library</span><MoreHorizontal size={16} /></button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">{active}<span>/</span><strong>{active === "Home" ? "A slower way to read" : active}</strong></div>
          <div className="top-actions">
            <label className="search-box"><Search size={16} /><input aria-label="Search library" placeholder="Search your library" /></label>
            <button className="icon-button" title="Add a library folder" aria-label="Add a library folder"><FolderPlus size={18} /></button>
            <span className="profile-avatar">VK</span>
          </div>
        </header>

        {active === "Home" ? <Home /> : <EmptySection title={active} />}
      </main>
    </div>
  );
}

function Home() {
  return <div className="page-content">
    <section className="welcome-row">
      <div><p className="eyebrow">Wednesday, August 19</p><h1>A slower way<br /><em>to read.</em></h1><p className="intro">Your books, your pace, your quiet corner of the world.</p></div>
      <div className="day-note"><Clock3 size={18} /><span>12 min read today</span><strong>Keep going</strong></div>
    </section>

    <section className="continue-section">
      <div className="section-heading"><div><p className="eyebrow">Pick up where you left off</p><h2>Continue reading</h2></div><button className="text-button">View all <span>↗</span></button></div>
      <article className="featured-book">
        <div className="cover cover-featured"><span className="cover-kicker">The</span><strong>Left Hand<br />of Darkness</strong><small>Ursula K. Le Guin</small></div>
        <div className="featured-details"><div className="book-type"><Headphones size={14} /> Reading & listening</div><h3>The Left Hand of Darkness</h3><p className="author">Ursula K. Le Guin</p><p className="quote">“The only thing that makes life possible is permanent, intolerable uncertainty; not knowing what comes next.”</p><div className="progress-meta"><span>Chapter 6 · The Question of Sex</span><span>67%</span></div><div className="progress-bar"><span style={{ width: "67%" }} /></div><button className="continue-button"><BookOpen size={16} /> Continue reading</button></div>
        <div className="featured-aside"><span>Last opened</span><strong>Yesterday</strong><span>Position</span><strong>38 min left</strong></div>
      </article>
    </section>

    <section className="library-section"><div className="section-heading"><div><p className="eyebrow">A few good stories</p><h2>Recently added</h2></div><button className="text-button">See library <span>↗</span></button></div><div className="book-grid">{books.map(book => <BookCard key={book.title} {...book} />)}</div></section>
  </div>;
}

function BookCard({ title, author, chapter, progress, tone }: typeof books[number]) {
  return <article className="book-card"><div className={`cover cover-${tone}`}><span className="cover-kicker">A novel</span><strong>{title.split(" ").slice(0, 2).join(" ")}<br />{title.split(" ").slice(2).join(" ")}</strong><small>{author}</small></div><div className="card-info"><div><h3>{title}</h3><p>{author}</p></div><button className="card-menu" aria-label={`More options for ${title}`}><MoreHorizontal size={17} /></button></div><div className="card-progress"><span>{chapter}</span><span>{progress}%</span></div><div className="thin-progress"><span style={{ width: `${progress}%` }} /></div></article>;
}

function EmptySection({ title }: { title: string }) {
  return <div className="empty-section"><div className="empty-icon"><LibraryBig size={24} /></div><p className="eyebrow">Your {title.toLowerCase()}</p><h1>Nothing here yet.</h1><p>Add a folder of EPUBs to begin building your quiet library.</p><button className="continue-button"><FolderPlus size={16} /> Add a library folder</button></div>;
}