import React, { CSSProperties } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = "button",
}) => (
  <button type={type} className={`btn  ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
