import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        outline:
          "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus-visible:ring-blue-500",
        ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500",
      },
      size: {
        sm: "button-s-medium px-3 py-1.5",
        md: "button-m-medium px-4 py-2",
        lg: "button-l-semibold px-6 py-3",
        xl: "button-xl-semibold px-8 py-4",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
