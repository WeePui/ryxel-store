# Component Standards and Best Practices

## Button Component

The Button component has been standardized using modern React practices. Follow these guidelines when using buttons throughout the application.

### Import

```tsx
import Button from "@/app/_components/UI/Button";
```

### Basic Usage

```tsx
<Button variant="primary">Click Me</Button>
```

### Variants

| Variant           | Usage                                 | Visual Style                  |
| ----------------- | ------------------------------------- | ----------------------------- |
| `primary`         | Default, main actions                 | Solid blue with hover effect  |
| `primaryOnDark`   | Main actions on dark backgrounds      | Transparent hover effect      |
| `secondary`       | Secondary actions                     | Light gray background, subtle |
| `secondaryOnDark` | Secondary actions on dark backgrounds | Transparent hover             |
| `tertiary`        | Less important actions                | Outlined style                |
| `filter`          | Filter toggles, selections            | Pill-shaped with active state |
| `ghost`           | Minimal visual presence               | Text-only with hover effect   |
| `danger`          | Destructive actions                   | Red background                |
| `success`         | Confirmations, positive actions       | Green background              |
| `warning`         | Alerts, caution needed                | Amber background              |

### Sizes

- `small`: Compact buttons for tight spaces
- `medium`: Default size for most uses
- `large`: For primary CTAs
- `xl`: Extra emphasis, hero sections

### Props

| Prop        | Type      | Default     | Description                                                                 |
| ----------- | --------- | ----------- | --------------------------------------------------------------------------- |
| `variant`   | string    | `'primary'` | The button styling variant                                                  |
| `size`      | string    | `'medium'`  | Button size                                                                 |
| `rounded`   | string    | `'default'` | Border radius style (`'default'`, `'full'`, `'pill'`, `'none'`, `'square'`) |
| `href`      | string    | -           | Makes button a link to specified URL                                        |
| `active`    | boolean   | `false`     | Whether button is in active/selected state                                  |
| `disabled`  | boolean   | `false`     | Disables the button                                                         |
| `loading`   | boolean   | `false`     | Shows a spinner and disables the button                                     |
| `fullWidth` | boolean   | `false`     | Makes button take full width of container                                   |
| `icon`      | ReactNode | -           | Icon to display alongside text                                              |
| `iconOnly`  | boolean   | `false`     | Creates a square icon-only button (no text)                                 |
| `className` | string    | `''`        | Additional CSS classes                                                      |
| `onClick`   | function  | -           | Click handler                                                               |

### Examples

#### Standard Button

```tsx
<Button variant="primary" onClick={handleSubmit}>
  Submit Form
</Button>
```

#### Link Button

```tsx
<Button variant="secondary" href="/products">
  View Products
</Button>
```

#### Icon Button

```tsx
import { FaPlus } from "react-icons/fa6";

<Button variant="primary" icon={<FaPlus />}>
  Add Item
</Button>;
```

#### Icon-Only Square Button

```tsx
import { FaPlus, FaTrash } from "react-icons/fa6";

// Basic icon-only button
<Button iconOnly icon={<FaPlus />} />

// With variants and sizes
<Button iconOnly icon={<FaTrash />} variant="danger" size="large" />

// With rounded borders
<Button iconOnly icon={<FaTrash />} rounded="full" />
```

#### Full Width Button

```tsx
<Button variant="success" fullWidth>
  Complete Purchase
</Button>
```

#### Loading State

```tsx
<Button variant="primary" loading={isSubmitting}>
  Save Changes
</Button>
```

#### Custom Styling

```tsx
<Button
  variant="ghost"
  className="border border-pink-300 text-pink-500 hover:bg-pink-50"
  rounded="full"
>
  Custom Style
</Button>
```

### Best Practices

1. Use the appropriate variant for the action's importance
2. Maintain consistent sizing within the same section
3. Utilize the loading state during async operations
4. Add meaningful icons to improve clarity
5. Group related buttons with consistent styling
6. Use `danger` variant sparingly and only for destructive actions
7. Ensure button text clearly communicates the action
8. Consider mobile users - use appropriate touch targets
