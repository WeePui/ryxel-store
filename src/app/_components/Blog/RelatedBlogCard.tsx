import { Blog } from "@/app/_types/blog";
import Image from "next/image";
import React from "react";
import NavLink from "../UI/NavLink";

interface RelatedBlogCardProps {
  blog: Blog;
}

export default function RelatedBlogCard({ blog }: RelatedBlogCardProps) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden rounded-t-lg">
        <Image
          src={blog.coverImage}
          className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-105"
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-grow flex-col p-4">
        <NavLink
          href={`/blogs/${blog.slug}`}
          className="font-title text-lg font-semibold"
        >
          {blog.title}
        </NavLink>
        <p className="text-gray-600 md:hidden">{blog.description}</p>
        <div className="w-fit">
          <NavLink href={`/blogs/${blog.slug}`}>Đọc thêm</NavLink>
        </div>
        <div className="mt-4 flex max-w-7xl items-center gap-2 text-sm font-semibold text-grey-400">
          <span className="text-grey-400">{blog.date}</span>
          <span className="text-primary-500">|</span>
          <span className="text-primary-500">{blog.category}</span>
        </div>
        <div className="mt-2 flex max-w-7xl items-center gap-2 text-sm font-semibold text-grey-400 lg:items-start">
          <span className="text-grey-400">{blog.author}</span>
          <span className="text-primary-500">|</span>
          <span className="text-primary-500">{blog.readingTime} phút đọc</span>
        </div>
      </div>
    </div>
  );
}
