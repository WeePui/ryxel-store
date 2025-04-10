import { getAllPosts } from '@helpers/getAllPosts';
import NavLink from '../_components/UI/NavLink';
import { FaChevronRight } from 'react-icons/fa6';
import BlogList from '../_components/Blog/BlogList';

export default function page() {
  const blogs = getAllPosts();
  const sortedBlogs = blogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400 max-w-7xl mx-auto">
        <NavLink href="/">
          <span className="text-grey-400">Trang chủ</span>
        </NavLink>
        <FaChevronRight className="text-xs" />
        <span className="text-primary-500">Blog</span>
      </div>
      <BlogList blogs={sortedBlogs} />
    </div>
  );
}
