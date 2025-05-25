import Breadcrumb from "../UI/Breadcrumb";

/**
 * Example usage of the Breadcrumb component in other parts of the application
 * This is just for demonstration purposes
 */
export default function BreadcrumbExamples() {
  // Example for a product category page
  const categoryBreadcrumbItems = [
    { translateKey: "products.home", href: "/" },
    { translateKey: "products.shop", href: "/products" },
    {
      translateKey: "navigation.categories.gaming.keyboard",
      href: "/products?category=keyboard",
    },
  ];

  // Example for a blog post page
  const blogPostBreadcrumbItems = [
    { translateKey: "products.home", href: "/" },
    { translateKey: "header.blogs", href: "/blogs" },
    { label: "How to Choose the Best Gaming Mouse" },
  ];

  // Example for account settings page
  const accountBreadcrumbItems = [
    { translateKey: "products.home", href: "/" },
    { translateKey: "header.account", href: "/account" },
    { translateKey: "account.settings", href: "/account/settings" },
    { translateKey: "account.security" },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2>Category Page Breadcrumb:</h2>
      <Breadcrumb items={categoryBreadcrumbItems} />

      <h2>Blog Post Breadcrumb:</h2>
      <Breadcrumb items={blogPostBreadcrumbItems} />

      <h2>Account Settings Breadcrumb:</h2>
      <Breadcrumb items={accountBreadcrumbItems} />
    </div>
  );
}
