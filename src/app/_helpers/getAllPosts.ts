import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Blog } from '../_types/blog';

const postsDirectory = path.join(process.cwd(), './src/content/blog');

export function getAllPosts(): Blog[] {
  const files = fs.readdirSync(postsDirectory);

  return files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent); // Trích xuất frontmatter

    return {
      ...data, // { title, description, date, slug }
      slug: filename.replace('.mdx', ''), // Lấy slug từ filename nếu chưa có
    } as Blog;
  });
}
