import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "rounded-[8px] bg-button-primary-bg_main text-button-primary-text_default button-l-semibold hover:bg-button-primary-bg_pressed hover:text-button-primary-text_pressed active:bg-button-primary-bg_pressed active:text-button-primary-text_pressed disabled:bg-button-primary-bg_disabled disabled:text-button-primary-text_disabled [&.pressed]:bg-button-primary-bg_pressed [&.pressed]:text-button-primary-text_pressed",
        neutral:
          "rounded-[8px] box-border border border-button-neutral-border bg-button-neutral-bg_default text-button-neutral-text_default button-m-medium hover:bg-button-neutral-bg_pressed hover:text-button-neutral-text_pressed active:bg-button-neutral-bg_pressed active:text-button-neutral-text_pressed disabled:bg-button-neutral-bg_disabled disabled:text-button-neutral-text_disabled [&.pressed]:bg-button-neutral-bg_pressed [&.pressed]:text-button-neutral-text_pressed",
        secondary:
          "rounded-[8px] bg-button-secondary-bg_main text-button-secondary-text_default button-m-medium hover:bg-button-secondary-bg_pressed hover:text-button-secondary-text_pressed active:bg-button-secondary-bg_pressed active:text-button-secondary-text_pressed disabled:bg-button-secondary-bg_disabled disabled:text-button-secondary-text_disabled [&.pressed]:bg-button-secondary-bg_pressed [&.pressed]:text-button-secondary-text_pressed",
        text: "bg-transparent",
        selector:
          "rounded-full border border-blue-500 bg-white text-blue-600 font-semibold w-10 h-10 hover:bg-blue-50 active:bg-blue-100 [&.pressed]:bg-blue-600 [&.pressed]:text-white [&.pressed]:border-blue-600 transition-colors duration-100",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "text",
      fullWidth: false,
    },
  },
);
