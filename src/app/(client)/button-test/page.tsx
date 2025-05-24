"use client";

import { FaPlus, FaCheck, FaTrash, FaDownload, FaHeart } from "react-icons/fa6";
import Button from "@/app/_components/UI/Button";

export default function ButtonTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">Button Component Test Page</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="primaryOnDark">Primary on Dark</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondaryOnDark">Secondary on Dark</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="filter">Filter</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Rounded Styles</h2>
        <div className="flex flex-wrap gap-4">
          <Button rounded="default">Default Rounded</Button>
          <Button rounded="full">Full Rounded</Button>
          <Button rounded="pill">Pill</Button>
          <Button rounded="none">No Rounding</Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button active>Active</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button icon={<FaPlus />}>Add New</Button>
          <Button variant="success" icon={<FaCheck />}>
            Confirm
          </Button>
          <Button variant="danger" icon={<FaTrash />}>
            Delete
          </Button>
          <Button variant="secondary" icon={<FaDownload />}>
            Download
          </Button>
          <Button variant="tertiary" icon={<FaHeart />}>
            Favorite
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Full Width</h2>
        <div className="flex flex-col gap-4">
          <Button fullWidth>Full Width Button</Button>
          <Button variant="secondary" fullWidth>
            Full Width Secondary
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button href="/">Home Link</Button>
          <Button href="/products" variant="secondary">
            Products Link
          </Button>
        </div>
      </section>      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Icon-Only Square Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button iconOnly icon={<FaPlus />} size="small" />
          <Button iconOnly icon={<FaCheck />} size="medium" variant="success" />
          <Button iconOnly icon={<FaTrash />} size="medium" variant="danger" />
          <Button iconOnly icon={<FaDownload />} size="large" variant="secondary" />
          <Button iconOnly icon={<FaHeart />} size="xl" variant="primary" rounded="full" />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Combined Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="success"
            size="large"
            rounded="pill"
            icon={<FaCheck />}
          >
            Complete Order
          </Button>
          <Button
            variant="danger"
            size="small"
            rounded="full"
            icon={<FaTrash />}
          >
            Remove Item
          </Button>
          <Button
            variant="ghost"
            size="medium"
            icon={<FaHeart />}
            className="border border-pink-300 text-pink-500 hover:bg-pink-50"
          >
            Custom Styled
          </Button>
        </div>
      </section>
    </div>
  );
}
