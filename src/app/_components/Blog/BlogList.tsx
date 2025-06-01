"use client";

import React, { useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "../UI/Pagination";
import { Blog } from "@/app/_types/blog";
import BlogCategoryFilter from "./BlogCategoryFilter";
import { useSafeTranslation } from "@/app/_hooks/useSafeTranslation";

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  const t = useSafeTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const blogsPerPage = 10; // Number of blogs to display per page

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }; // Filter first, then paginate
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage,
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <BlogCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {paginatedBlogs.length === 0 ? (
        <div className="mt-4 text-center text-gray-500">
          {t("blog.noArticles")}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 p-4 xl:grid-cols-1">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
