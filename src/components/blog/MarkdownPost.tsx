import { Children, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

type MarkdownProps<T> = T & { node?: unknown };

/** Stable, content-derived id so copy buttons keep working across builds. */
function codeBlockId(code: string): string {
  let hash = 0;

  for (let index = 0; index < code.length; index += 1) {
    hash = (hash << 5) - hash + code.charCodeAt(index);
    hash |= 0;
  }

  return `md-code-${Math.abs(hash).toString(36)}`;
}

/** Recursively pulls plain text out of React children (needed for <pre><code>). */
function extractText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (child && typeof child === 'object' && 'props' in child) {
        const props = (child as { props?: { children?: ReactNode } }).props;
        return props?.children ? extractText(props.children) : '';
      }
      return '';
    })
    .join('');
}

function MarkdownLink({ node: _node, href = '', children, ...rest }: MarkdownProps<ComponentPropsWithoutRef<'a'>>) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      {...rest}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

function MarkdownImage({ node: _node, alt = '', ...rest }: MarkdownProps<ComponentPropsWithoutRef<'img'>>) {
  return <img alt={alt} loading="lazy" decoding="async" {...rest} />;
}

function MarkdownCode({ node: _node, className = '', children, ...rest }: MarkdownProps<ComponentPropsWithoutRef<'code'>>) {
  const text = extractText(children);
  const language = /language-([\w-]+)/.exec(className)?.[1];
  const isBlock = Boolean(language) || text.includes('\n');

  if (!isBlock) {
    return (
      <code className="md-inline-code" {...rest}>
        {children}
      </code>
    );
  }

  return (
    <code data-language={language ?? 'text'} className={`md-block-code ${className}`.trim()} {...rest}>
      {children}
    </code>
  );
}

function MarkdownPre({ node: _node, children, ...rest }: MarkdownProps<ComponentPropsWithoutRef<'pre'>>) {
  const id = codeBlockId(extractText(children));

  return (
    <div className="md-code-wrap">
      <pre className="md-code" id={id} {...rest}>
        {children}
      </pre>
      <button type="button" className="md-copy" data-md-copy={id}>
        Copy
      </button>
    </div>
  );
}

function MarkdownTable({ node: _node, ...rest }: MarkdownProps<ComponentPropsWithoutRef<'table'>>) {
  return (
    <div className="md-table">
      <table {...rest} />
    </div>
  );
}

function heading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';

  return function Heading({ node: _node, children, id, ...rest }: MarkdownProps<ComponentPropsWithoutRef<'h2'>>) {
    return (
      <Tag id={id} {...rest}>
        <a className="md-anchor" href={id ? `#${id}` : undefined} aria-hidden="true" tabIndex={-1}>
          #
        </a>
        {children}
      </Tag>
    );
  };
}

const components: Components = {
  a: MarkdownLink,
  img: MarkdownImage,
  code: MarkdownCode,
  pre: MarkdownPre,
  table: MarkdownTable,
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
};

export default function MarkdownPost({ content }: { content: string }) {
  return (
    <div className="md" itemProp="articleBody">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
