import React, { CSSProperties } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  type?: "button" | "submit"; // Add type prop to handle button types
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  style,
  className,
  type = "button",
}) => (
  <button type={type} className={`btn  ${className}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
