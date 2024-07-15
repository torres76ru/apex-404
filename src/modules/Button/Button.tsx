import React from "react";
import css from "./Button.module.scss";
import { Link } from "react-router-dom";

interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement> {
  children?: React.ReactNode;
  variant?:
    | "white"
    | "black"
    | "grey"
    | "blue"
    | "red"
    | "inline_white"
    | "inline_black";
  href?: string;
  to?: string;
}

const Button = ({
  children,
  variant = "white",
  href,
  to,
  ...props
}: ButtonProps) => {
  if (href) {
    // Separate props for anchor element
    return (
      <a href={href} className={`${css.button} ${css[variant]}`} {...props}>
        <span>{children}</span>
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={`${css.button} ${css[variant]}`} {...props}>
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <div className={`${css.button} ${css[variant]}`} {...props}>
      <span>{children}</span>
    </div>
  );
};

export default Button;
