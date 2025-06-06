import { Blog } from "@/app/_types/blog";
import Image from "next/image";
import React from "react";
import NavLink from "../UI/NavLink";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-200 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:flex-col">
      <div className="relative aspect-video h-[300px] w-[450px] xl:w-full md:h-48">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-sm font-semibold text-gray-500">
          {blog.category} - {blog.date}
        </h2>
        <NavLink href={`/blogs/${blog.slug}`}>
          <h2 className="text-2xl font-bold">{blog.title}</h2>
        </NavLink>

        <div className="mt-1 text-sm text-gray-500">
          {blog.author} - {blog.readingTime} đọc
        </div>
        <p className="mt-2 text-gray-600">{blog.description.slice(0, 50)}...</p>
      </div>
    </div>
  );
}
