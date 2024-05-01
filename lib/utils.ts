import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.round(
    (now.getTime() - createdAt.getTime()) / 1000
  );
  const minutes = Math.round(diffInSeconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30); // Approximation, as months have varying numbers of days
  const years = Math.round(months / 12);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

export function formatNumber(number: number) {
  if (number < 1000) {
    // If the number is less than 1000, return it as is
    return number.toString();
  } else if (number < 1000000) {
    // If the number is at least 1000 but less than a million, divide by 1000 and append 'K'
    return (number / 1000).toFixed(1) + "K";
  } else {
    // If the number is a million or more, divide by a million and append 'M'
    return (number / 1000000).toFixed(1) + "M";
  }
}
