type BoxProps = {
  children: React.ReactNode;
  styles: {
    size: string;
    rounded: string;
  };
};

const Box = ({ children, styles }: BoxProps) => {
  const { size, rounded } = styles;

  const divStyles = `${
    size === "medium"
      ? "p-2 md:p-6"
      : size === "small"
      ? "p-1 md:p-2"
      : size === "large"
      ? "p-3 md:p-7"
      : ""
  }   w-full h-auto rounded ${rounded && `rounded-${rounded}`}
   bg-white dark:bg-primary-800 dark:text-secondary-50 shadow-lg`;

  return <div className={divStyles}>{children}</div>;
};

export default Box;
