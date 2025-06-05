/**
 * Client-side cookie utilities
 * These functions work in the browser environment only
 */

/**
 * Get a cookie value by name from document.cookie
 * @param name - The name of the cookie to retrieve
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    // Server-side environment
    console.warn('getCookie called in server environment');
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  
  return null;
}

/**
 * Set a cookie with optional parameters
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param options - Optional cookie settings
 */
export function setCookie(
  name: string, 
  value: string, 
  options: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}
): void {
  if (typeof document === 'undefined') {
    // Server-side environment
    console.warn('setCookie called in server environment');
    return;
  }

  let cookieString = `${name}=${value}`;

  if (options.days) {
    const date = new Date();
    date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Delete a cookie by setting its expiration date to the past
 * @param name - The name of the cookie to delete
 * @param path - The path of the cookie (should match the path used when setting)
 * @param domain - The domain of the cookie (should match the domain used when setting)
 */
export function deleteCookie(
  name: string, 
  path: string = '/', 
  domain?: string
): void {
  if (typeof document === 'undefined') {
    // Server-side environment
    console.warn('deleteCookie called in server environment');
    return;
  }

  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  
  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  document.cookie = cookieString;
}

/**
 * Check if a cookie exists
 * @param name - The name of the cookie to check
 * @returns True if the cookie exists, false otherwise
 */
export function cookieExists(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Get all cookies as an object
 * @returns Object with cookie names as keys and values as values
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === 'undefined') {
    // Server-side environment
    console.warn('getAllCookies called in server environment');
    return {};
  }

  const cookies: Record<string, string> = {};
  
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = value;
    }
  });

  return cookies;
}
