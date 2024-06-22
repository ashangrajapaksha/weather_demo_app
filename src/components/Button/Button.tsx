import React, { CSSProperties } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  style,
  className,
}) => (
  <button className={`btn  ${className || ""}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
