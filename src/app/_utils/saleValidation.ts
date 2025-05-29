/**
 * Client-side utility functions for sale offer validation and calculations
 */

export interface SaleOffer {
  percentage: number;
  startDate: string | Date;
  endDate: string | Date;
}

/**
 * Checks if a sale offer is currently active based on time period
 * @param saleOffer - The sale offer object containing startDate and endDate
 * @param currentDate - Optional current date for testing, defaults to new Date()
 * @returns boolean indicating if the sale is currently active
 */
export function isSaleOfferActive(
  saleOffer: SaleOffer | null | undefined,
  currentDate: Date = new Date(),
): boolean {
  if (!saleOffer) {
    return false;
  }

  // Check if required fields exist
  if (!saleOffer.startDate || !saleOffer.endDate || !saleOffer.percentage) {
    return false;
  }

  // Check if percentage is valid
  if (saleOffer.percentage <= 0 || saleOffer.percentage > 100) {
    return false;
  }

  const startDate = new Date(saleOffer.startDate);
  const endDate = new Date(saleOffer.endDate);

  // Validate date range
  if (endDate <= startDate) {
    return false;
  }

  // Check if current time is within the sale period
  return currentDate >= startDate && currentDate <= endDate;
}

/**
 * Calculates the final price for a variant considering sale offers
 * @param originalPrice - The original price of the variant
 * @param saleOffer - The sale offer object
 * @param currentDate - Optional current date for testing, defaults to new Date()
 * @returns The final price after applying sale discount if applicable
 */
export function calculateFinalPrice(
  originalPrice: number,
  saleOffer: SaleOffer | null | undefined,
  currentDate: Date = new Date(),
): number {
  if (!isSaleOfferActive(saleOffer, currentDate)) {
    return originalPrice;
  }

  const discount = (originalPrice * saleOffer!.percentage) / 100;
  const finalPrice = originalPrice - discount;

  // Round to nearest 100 VND (common practice in Vietnamese e-commerce)
  return Math.round(finalPrice / 100) * 100;
}

/**
 * Calculates the sale discount amount
 * @param originalPrice - The original price of the variant
 * @param saleOffer - The sale offer object
 * @param currentDate - Optional current date for testing, defaults to new Date()
 * @returns The discount amount if sale is active, otherwise 0
 */
export function calculateSaleDiscount(
  originalPrice: number,
  saleOffer: SaleOffer | null | undefined,
  currentDate: Date = new Date(),
): number {
  if (!isSaleOfferActive(saleOffer, currentDate)) {
    return 0;
  }

  return Math.round((originalPrice * saleOffer!.percentage) / 100 / 100) * 100;
}

/**
 * Gets time-related information about a sale offer
 * @param saleOffer - The sale offer object
 * @param currentDate - Optional current date for testing, defaults to new Date()
 * @returns Object with sale timing information
 */
export function getSaleOfferStatus(
  saleOffer: SaleOffer | null | undefined,
  currentDate: Date = new Date(),
): {
  isActive: boolean;
  hasStarted: boolean;
  hasEnded: boolean;
  timeUntilStart?: number; // milliseconds
  timeUntilEnd?: number; // milliseconds
} {
  if (!saleOffer || !saleOffer.startDate || !saleOffer.endDate) {
    return { isActive: false, hasStarted: false, hasEnded: false };
  }

  const startDate = new Date(saleOffer.startDate);
  const endDate = new Date(saleOffer.endDate);
  const now = currentDate.getTime();

  const hasStarted = now >= startDate.getTime();
  const hasEnded = now > endDate.getTime();
  const isActive = hasStarted && !hasEnded;

  return {
    isActive,
    hasStarted,
    hasEnded,
    timeUntilStart: hasStarted ? undefined : startDate.getTime() - now,
    timeUntilEnd: hasEnded ? undefined : endDate.getTime() - now,
  };
}

/**
 * Formats remaining time until sale ends
 * @param timeUntilEnd - Time in milliseconds until sale ends
 * @returns Formatted string showing remaining time
 */
export function formatSaleTimeRemaining(timeUntilEnd: number): string {
  const days = Math.floor(timeUntilEnd / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeUntilEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} ngày ${hours} giờ`;
  } else if (hours > 0) {
    return `${hours} giờ ${minutes} phút`;
  } else {
    return `${minutes} phút`;
  }
}
