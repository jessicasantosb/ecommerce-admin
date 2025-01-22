import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copiado para a área de transferência!');
};
