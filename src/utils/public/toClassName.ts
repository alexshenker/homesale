import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const toClassName = (...cn: ClassValue[]): string => {
  return twMerge(clsx(cn));
};

export default toClassName;
