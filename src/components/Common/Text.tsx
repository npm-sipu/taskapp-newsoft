interface TextProps
  extends React.LabelHTMLAttributes<
    HTMLLabelElement | HTMLHeadingElement | HTMLParagraphElement
  > {
  children: React.ReactNode;
  as?: string;
  className?: string;
}
export function Text(props: TextProps): JSX.Element {
  let { children, as, className, ...rest } = props;
  as = as || "span";
  switch (as) {
    case "h1":
      return (
        <h1 className={`${className || ""} text-5xl`} {...rest}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${
            className || ""
          } text-4xl lg:text-3xl md:text-2xl sm:text-xl max-sm:text-lg font-bold text-black capitalize`}
          {...rest}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`${
            className || ""
          } text-2xl lg:text-xl md:text-lg max-md:text-base font-medium text-black capitalize `}
          {...rest}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`${
            className || ""
          } lg:text-lg sm:text-base max-sm:text-sm font-normal text-black`}
          {...rest}
        >
          {children}
        </h4>
      );
    case "p":
      return (
        <p
          className={`${
            className || ""
          } lg:text-lg sm:text-base max-sm:text-sm font-normal text-black`}
          {...rest}
        >
          {children}
        </p>
      );
    default:
      return (
        <span
          className={`${
            className || ""
          } md:text-16 sm:text-base max-sm:text-sm text-black`}
          {...rest}
        >
          {children}
        </span>
      );
  }
}
