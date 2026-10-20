import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/blog';

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();

  return rss({
    title: 'Koamishin Journal',
    description:
      'Notes from the Koamishin collective: Laravel architecture, open-source systems, deep dives on our flagship work, and how we work in the open.',
    site: context.site ?? 'https://koamishin.com',
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
};
