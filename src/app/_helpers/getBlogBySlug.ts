import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getBlogBySlug(slug: string) {
  const fullPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  return {
    frontmatter,
    content,
  };
}
