import { Blog } from '@/app/_types/blog';
import Image from 'next/image';
import React from 'react';
import NavLink from '../UI/NavLink';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="flex rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out md:flex-col">
      <Image
        src={blog.coverImage}
        alt={blog.title}
        width={450}
        height={300}
        className="object-cover"
      />
      <div className="flex flex-col p-4 gap-2">
        <h2 className="text-sm font-semibold text-gray-500">
          {blog.category} - {blog.date}
        </h2>
        <NavLink href={`/blogs/${blog.slug}`}>
          <h2 className="text-2xl font-bold">{blog.title}</h2>
        </NavLink>

        <div className="mt-1 text-gray-500 text-sm">
          {blog.author} - {blog.readingTime} đọc
        </div>
        <p className="mt-2 text-gray-600">{blog.description.slice(0, 50)}...</p>
      </div>
    </div>
  );
}
