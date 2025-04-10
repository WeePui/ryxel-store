import { Blog } from '@/app/_types/blog';
import React from 'react';
import RelatedBlogCard from './RelatedBlogCard';

interface RelatedBlogsProps {
  relatedPosts: Blog[];
}

export default function RelatedBlogs({ relatedPosts }: RelatedBlogsProps) {
  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <RelatedBlogCard key={post.slug} blog={post} />
        ))}
      </div>
    </section>
  );
}
