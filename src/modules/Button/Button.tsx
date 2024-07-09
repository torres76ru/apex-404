import React from "react";
import css from "./Button.module.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: "white" | "black" | "grey";
}

const Button = ({ children, variant = "white", ...props }: ButtonProps) => {
  return (
    <div className={`${css.button} ${css[variant]}`} {...props}>
      <span>{children}</span>
    </div>
  );
};

export default Button;
