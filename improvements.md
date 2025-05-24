# Website Improvements

## Button Component Optimization

### 1. Modern Libraries Integration

- Added `clsx` for conditional class merging
- Integrated `tailwind-merge` to resolve Tailwind CSS conflicts
- Implemented `class-variance-authority` (CVA) for robust variant system

### 2. Enhanced API

- Replaced string-based type system with type-safe variants
- Added `fullWidth` prop for responsive design
- Added `rounded` prop for customizable border radius
- Introduced icon support with proper positioning
- Added `iconOnly` prop for square icon-only buttons
- Used forwardRef for better component composition
- Added proper TypeScript types with VariantProps

### 3. New Variants

- `ghost` - Minimal visual presence with subtle hover effect
- `success` - Green-themed buttons for confirmations
- `warning` - Amber-colored buttons for cautionary actions
- Added `xl` size for primary CTAs
- Icon-only square button variant for compact UI elements

### 4. Improved UX

- Enhanced accessibility with proper ARIA attributes
- Consistent focus styles across variants
- Improved loading state visualization
- Better disabled state handling
- Responsive sizing adaptations

### 5. Testing & Documentation

- Created a dedicated `/button-test` page showcasing all variants
- Provided combined examples for common use cases
- Included examples with icons and different sizes

### 6. Component Updates

- Updated existing components to use the new API
- Changed `type` prop to `variant`
- Utilized built-in `loading` state

# Multilingual Support Improvements

## 1. Consistent Approach for Translation Keys

Currently, translations are handled using two different approaches:

- Using direct language conditionals: `language === 'vi' ? 'Vietnamese text' : 'English text'`
- Using the translation function: `t("contact.title")`

**Recommendation:** Standardize on using the `t()` function approach for all translations to maintain consistency and make future additions easier.

## 2. Mobile Menu Translation

The MobileMenu component has a hardcoded "Ngôn ngữ:" label that should be translated:

```tsx
// Change from
<span className="text-primary-500">Ngôn ngữ:</span>

// To
<span className="text-primary-500">{t("header.language")}:</span>
```

## 3. Language Switcher Enhancement

The current language switcher button shows the same text regardless of which language is selected. Consider making it clearer:

```tsx
// Current implementation shows "EN" in both languages
{
  t("buttons.switchToVi");
}

// Instead, show the language you'll switch TO
{
  language === "vi" ? "EN" : "VI";
}
```

## 4. Persist Language Preference

Consider storing the user's language preference in localStorage to persist it between sessions:

```tsx
useEffect(() => {
  const savedLang = localStorage.getItem("preferredLanguage");
  if (savedLang === "vi" || savedLang === "en") {
    setLanguage(savedLang as Language);
  }
}, []);

const setLanguageWithStorage = (lang: Language) => {
  localStorage.setItem("preferredLanguage", lang);
  setLanguage(lang);
};
```

## 5. SEO Improvements for Multilingual Content

Consider implementing proper language attributes in the HTML for SEO purposes:

```tsx
// In layout.tsx
<html lang={language}>
```

## 6. URL-based Language Selection

For more advanced multilingual support, consider implementing URL-based language selection (e.g., /en/contact, /vi/contact) for better SEO and user experience.

## 7. Language Auto-detection

Implement language auto-detection based on browser settings to automatically select the appropriate language for first-time visitors.

```tsx
useEffect(() => {
  if (!localStorage.getItem("preferredLanguage")) {
    const browserLang = navigator.language.split("-")[0];
    setLanguage(browserLang === "vi" ? "vi" : "en");
  }
}, []);
```

## 8. Add a Language Indicator

Consider adding a visual indicator showing the currently selected language for better user experience.
