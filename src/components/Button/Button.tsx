import React, { CSSProperties } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    className={`btn ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
