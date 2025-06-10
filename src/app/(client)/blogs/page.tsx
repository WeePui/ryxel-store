import { getAllPosts } from "@helpers/getAllPosts";
import BlogList from "../../_components/Blog/BlogList";
import Breadcrumb from "@/app/_components/UI/Breadcrumb";

const breadcrumbItems = [
  { translateKey: "products.home", href: "/" },
  { label: "Blogs" },
];

export default function page() {
  const blogs = getAllPosts();
  const sortedBlogs = blogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="max-w-full">
      <div className="mx-auto mt-4 flex max-w-7xl items-center gap-2 text-sm font-semibold text-grey-400 xl:px-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <BlogList blogs={sortedBlogs} />
    </div>
  );
}
