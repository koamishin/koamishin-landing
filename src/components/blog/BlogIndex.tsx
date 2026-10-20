import { useEffect, useMemo, useState } from 'react';

export interface BlogIndexPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  cover?: string;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export default function BlogIndex({ posts }: { posts: BlogIndexPost[] }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');

  // Support deep links such as /blog/?tag=laravel
  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get('tag');
    if (tag) setActiveTag(tag);
  }, []);

  const tags = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => unique.add(tag)));
    return ['all', ...[...unique].sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = activeTag === 'all' || post.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!needle) return true;

      const haystack = `${post.title} ${post.description} ${post.tags.join(' ')} ${post.author}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, query, activeTag]);

  return (
    <div className="blog-index">
      <div className="blog-toolbar">
        <div className="blog-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the journal…"
            aria-label="Search posts"
          />
        </div>

        <div className="blog-tags" role="group" aria-label="Filter by tag">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`blog-tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      </div>

      <p className="blog-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
      </p>

      {filtered.length === 0 ? (
        <div className="blog-empty">
          <p className="empty-title">Nothing matches that yet</p>
          <p className="empty-sub">Try a different keyword or clear the tag filter.</p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQuery('');
              setActiveTag('all');
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <article className="blog-card" key={post.slug}>
              {post.cover && (
                <a className="blog-card-media" href={`/blog/${post.slug}/`}>
                  <img src={post.cover} alt="" width="640" height="360" loading="lazy" />
                </a>
              )}

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <time dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>

                <h3 className="blog-card-title">
                  <a href={`/blog/${post.slug}/`}>{post.title}</a>
                </h3>

                <p className="blog-card-desc">{post.description}</p>

                <div className="blog-card-foot">
                  <span className="blog-card-author">{post.author}</span>
                  <span className="blog-card-tags">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="blog-chip"
                        onClick={() => setActiveTag(tag)}
                        aria-label={`Filter by ${tag}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
