import { getBlogBySlug } from '@/app/_helpers/getBlogBySlug';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import YoutubeEmbed from '@components/UI/YoutubeEmbed';
import BlogHeader from '@/app/_components/Blog/BlogHeader';
import { Blog } from '@/app/_types/blog';
import remarkGfm from 'remark-gfm';
import { getRelatedPosts } from '@/app/_helpers/getRelatedPosts';
import RelatedBlogs from '@/app/_components/Blog/RelatedBlogs';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getBlogBySlug(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { frontmatter, content } = getBlogBySlug(slug);
  const relatedPosts = getRelatedPosts({ slug, ...frontmatter } as Blog);

  return (
    <article className="w-full">
      <BlogHeader blog={frontmatter as Blog} />
      <div className="max-w-5xl mx-auto mt-20">
        <MDXRemote
          source={content}
          options={{
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
          components={{
            YoutubeEmbed,
          }}
        />
      </div>
      <RelatedBlogs relatedPosts={relatedPosts} />
    </article>
  );
}
