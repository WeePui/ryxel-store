"use client";

import ErrorBoundary from "./ErrorBoundary";
import InlineError from "./InlineError";
import Button from "./Button";
import { User } from "@/app/_types/user";
import { Product } from "@/app/_types/product";

// Import client components
import FormUpdateProfile from "../Account/FormUpdateProfile";
import WishlistProductList from "../Wistlist/WishlistProductList";
import AddressesList from "../Address/AddressesList";
import FormUpdatePassword from "../Account/FormUpdatePassword";

/**
 * Error boundary wrapper for FormUpdateProfile component
 * Provides error handling for profile update functionality
 */
export function SafeFormUpdateProfile({ user }: { user: User }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <InlineError
            message="Unable to load profile form"
            type="error"
            size="medium"
          />
          <div className="mt-4 text-center">
            <p className="mb-3 text-sm text-gray-600">
              The profile form could not be loaded. This might be due to:
            </p>
            <ul className="mb-4 text-left text-sm text-gray-600">
              <li>• Network connectivity issues</li>
              <li>• Server temporarily unavailable</li>
              <li>• Invalid user data</li>
            </ul>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              size="small"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      }
      resetKeys={[user?._id, user?.email]}
    >
      <FormUpdateProfile user={user} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for WishlistProductList component
 * Handles wishlist display errors gracefully
 */
export function SafeWishlistProductList({ items }: { items: Product[] }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <InlineError
            message="Wishlist temporarily unavailable"
            type="warning"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-600">
            Your wishlist could not be displayed. Please try refreshing the page.
          </p>
          <div className="mt-4 text-center">
            <Button
              onClick={() => window.location.reload()}
              variant="secondary"
              size="small"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      }
      resetKeys={[items?.length]}
    >
      <WishlistProductList items={items} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for AddressesList component
 * Protects address management functionality
 */
export function SafeAddressesList() {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <InlineError
            message="Address list unavailable"
            type="info"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-600">
            Your addresses could not be loaded at this time.
          </p>
          <div className="mt-4 text-center">
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              size="small"
            >
              Retry
            </Button>
          </div>
        </div>
      }
    >
      <AddressesList />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for FormUpdatePassword component
 * Protects password update functionality from crashes
 */
export function SafeFormUpdatePassword() {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <InlineError
            message="Password update form unavailable"
            type="error"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-600">
            The password update form encountered an error and could not be loaded
          </p>
          <div className="mt-4">            <Button
              href="/account"
              size="small"
              variant="secondary"
            >
              Back to Account
            </Button>
          </div>
        </div>
      }
    >
      <FormUpdatePassword />
    </ErrorBoundary>
  );
}

/**
 * Higher-order component for wrapping client components with error boundary
 * Provides a generic error boundary solution for account pages
 */
export function withClientErrorBoundary<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  errorMessage: string = "Component could not be loaded",
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary
        fallback={
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <InlineError message={errorMessage} type="warning" size="medium" />
            <div className="mt-3">
              <Button
                onClick={() => window.location.reload()}
                variant="secondary"
                size="small"
              >
                Refresh
              </Button>
            </div>
          </div>
        }
        resetKeys={Object.values(props).filter(
          (value): value is string | number =>
            typeof value === "string" || typeof value === "number",
        )}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
