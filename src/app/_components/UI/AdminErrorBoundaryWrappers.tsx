"use client";

import ErrorBoundary from "./ErrorBoundary";
import InlineError from "./InlineError";
import Button from "./Button";

// Import admin components
import UserTable from "../Admin/Users/UserTable";
import UserStatistics from "../Admin/Users/UserStatistics";
import TopCustomersByProvince from "../Admin/Users/TopCustomersByProvince";
import TopCustomers from "../Admin/Dashboard/TopCustomers";
import SalesByCategories from "../Admin/Dashboard/SalesByCategories";
import TopCityByOrder from "../Admin/Orders/TopCityByOrder";

/**
 * Error boundary wrapper for UserTable component
 * Provides granular error handling for user management functionality
 */
export function SafeUserTable({ authToken }: { authToken: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <InlineError
            message="Unable to load user management table"
            type="error"
            size="medium"
          />
          <div className="mt-4 text-center">
            <p className="mb-3 text-sm text-gray-600">
              The user table could not be loaded. This might be due to:
            </p>
            <ul className="mb-4 text-left text-sm text-gray-600">
              <li>• Network connectivity issues</li>
              <li>• Server temporarily unavailable</li>
              <li>• Data formatting problems</li>
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
      resetKeys={[authToken]}
    >
      <UserTable authToken={authToken} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for UserStatistics component
 * Provides fallback for complex statistics calculations
 */
export function SafeUserStatistics({ authToken }: { authToken: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
          <InlineError
            message="Statistics temporarily unavailable"
            type="warning"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-600">
            User statistics could not be calculated. The system is working to
            resolve this.
          </p>
        </div>
      }
      resetKeys={[authToken]}
    >
      <UserStatistics authToken={authToken} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for TopCustomersByProvince component
 * Handles geographic data visualization errors gracefully
 */
export function SafeTopCustomersByProvince({
  authToken,
}: {
  authToken: string;
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
          <InlineError
            message="Geographic data unavailable"
            type="info"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-500">
            Regional customer data could not be loaded
          </p>
        </div>
      }
      resetKeys={[authToken]}
    >
      <TopCustomersByProvince authToken={authToken} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for TopCustomers component
 * Ensures customer ranking functionality remains stable
 */
export function SafeTopCustomers({ cookies }: { cookies: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
          <InlineError
            message="Top customers data unavailable"
            type="info"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-500">
            Customer ranking information could not be loaded
          </p>
        </div>
      }
      resetKeys={[cookies]}
    >
      <TopCustomers cookies={cookies} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for SalesByCategories component
 * Protects category-based sales analytics
 */
export function SafeSalesByCategories({ cookies }: { cookies: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
          <InlineError
            message="Sales analytics temporarily unavailable"
            type="info"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-600">
            Category sales data could not be processed
          </p>
        </div>
      }
      resetKeys={[cookies]}
    >
      <SalesByCategories cookies={cookies} />
    </ErrorBoundary>
  );
}

/**
 * Error boundary wrapper for TopCityByOrder component
 * Handles geographic order analytics gracefully
 */
export function SafeTopCityByOrder({ authToken }: { authToken: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
          <InlineError
            message="Regional order data unavailable"
            type="info"
            size="medium"
          />
          <p className="mt-2 text-sm text-gray-600">
            Geographic order analytics could not be loaded
          </p>
        </div>
      }
      resetKeys={[authToken]}
    >
      <TopCityByOrder authToken={authToken} />
    </ErrorBoundary>
  );
}

/**
 * Higher-order component for wrapping admin components with error boundary
 * Provides a generic error boundary solution
 */
export function withAdminErrorBoundary<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  errorMessage: string = "Component could not be loaded",
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary
        fallback={
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <InlineError message={errorMessage} type="warning" size="medium" />
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
