import Image from 'next/image';
import { Blog } from '@/app/_types/blog';

interface BlogHeaderProps {
  blog: Blog;
}

export default function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <div className="relative w-screen h-[400px] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <Image
        src={blog.coverImage}
        alt={blog.title}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-60" />

      <div className="absolute bottom-10 left-10 z-10 text-white max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="px-3 py-1 bg-gray-300 rounded-full text-primary-default">
            {blog.category}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-300">{blog.date}</span>
        </div>

        <h1 className="text-4xl font-bold leading-tight drop-shadow-lg !text-gray-300">
          {blog.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-200">
          <span>Bởi {blog.author}</span>
          <span>•</span>
          <span>{blog.readingTime} đọc</span>
        </div>
      </div>
    </div>
  );
}
