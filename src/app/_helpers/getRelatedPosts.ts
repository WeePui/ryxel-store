import { Blog } from '@/app/_types/blog';
import { getAllPosts } from './getAllPosts';

export function getRelatedPosts(current: Blog, limit = 3): Blog[] {
  const allPosts = getAllPosts();

  const relatedByTags = allPosts.filter(
    (post) =>
      post.slug !== current.slug &&
      post.tags?.some((tag: string) => current.tags?.includes(tag))
  );

  const relatedByCategory = allPosts.filter(
    (post) =>
      post.slug !== current.slug &&
      post.category === current.category &&
      !relatedByTags.includes(post)
  );

  const combined = [...relatedByTags, ...relatedByCategory];

  return combined.slice(0, limit);
}
