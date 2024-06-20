import React from "react";
import css from "./Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  variant?: "white" | "black" | "grey";
}
const Button = ({ children, variant = "white" }: ButtonProps) => {
  return (
    <div className={`${css.button} ${css[variant]}`}>
      <span>{children}</span>
    </div>
  );
};

export default Button;
