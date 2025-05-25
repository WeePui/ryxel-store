# Breadcrumb Component

## Overview

The Breadcrumb component provides a standardized way to implement breadcrumb navigation across the application. It supports internationalization through the LanguageContext and provides a consistent visual appearance.

## Props

| Prop      | Type             | Description               | Required |
| --------- | ---------------- | ------------------------- | -------- |
| items     | BreadcrumbItem[] | Array of breadcrumb items | Yes      |
| className | string           | Additional CSS classes    | No       |

### BreadcrumbItem Interface

| Property     | Type   | Description                                | Required |
| ------------ | ------ | ------------------------------------------ | -------- |
| label        | string | Text to display (use this or translateKey) | No\*     |
| translateKey | string | Translation key from LanguageContext       | No\*     |
| href         | string | Link URL for the breadcrumb item           | No       |

\*Either label or translateKey must be provided

## Usage Examples

### Basic Usage

```tsx
import Breadcrumb from "@/app/_components/UI/Breadcrumb";

export default function MyPage() {
  return (
    <Breadcrumb
      items={[
        { translateKey: "products.home", href: "/" },
        { translateKey: "products.shop", href: "/products" },
        { label: "Product Name" },
      ]}
    />
  );
}
```

### With Custom Styling

```tsx
<Breadcrumb
  className="border-primary-500 my-8 border-l-4 pl-4"
  items={[
    { translateKey: "products.home", href: "/" },
    { translateKey: "products.shop", href: "/products" },
    { label: "Product Name" },
  ]}
/>
```

### Dynamic Breadcrumbs

```tsx
// For a category page
const categoryBreadcrumbItems = [
  { translateKey: "products.home", href: "/" },
  { translateKey: "products.shop", href: "/products" },
  { translateKey: `navigation.categories.gaming.${categorySlug}` },
];

<Breadcrumb items={categoryBreadcrumbItems} />;
```

## Design

- The last item has no link and is displayed with primary color
- Separators (chevron icons) are automatically added between items
- Mobile-friendly with truncation for long text
- Respects the application's language setting
