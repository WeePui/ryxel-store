import { Blog } from '@/app/_types/blog';
import Image from 'next/image';
import React from 'react';
import NavLink from '../UI/NavLink';

interface RelatedBlogCardProps {
  blog: Blog;
}

export default function RelatedBlogCard({ blog }: RelatedBlogCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative w-full overflow-hidden rounded-t-lg aspect-video flex-shrink-0">
        <Image
          src={blog.coverImage}
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-lg font-semibold font-title">{blog.title}</p>
        <p className="text-gray-600">{blog.description}</p>
        <div className="w-fit">
          <NavLink href={`/blogs/${blog.slug}`}>Đọc thêm</NavLink>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400 max-w-7xl mx-auto">
          <span className="text-grey-400">{blog.date}</span>
          <span className="text-primary-500">|</span>
          <span className="text-primary-500">{blog.category}</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-grey-400 max-w-7xl mx-auto">
          <span className="text-grey-400">{blog.author}</span>
          <span className="text-primary-500">|</span>
          <span className="text-primary-500">{blog.readingTime} phút đọc</span>
        </div>
      </div>
    </div>
  );
}
