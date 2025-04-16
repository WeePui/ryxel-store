'use client';

import React, { useState } from 'react';
import BlogCard from './BlogCard';
import Pagination from '../UI/Pagination';
import { Blog } from '@/app/_types/blog';
import BlogCategoryFilter from './BlogCategoryFilter';

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const blogsPerPage = 6; // Number of blogs to display per page
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredBlogs =
    selectedCategory === 'Tất cả'
      ? paginatedBlogs
      : paginatedBlogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="flex flex-col items-center justify-center">
      <BlogCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {filteredBlogs.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">
          Không có bài viết nào trong danh mục này.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 p-4">
            {filteredBlogs.map((blog) => (
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
