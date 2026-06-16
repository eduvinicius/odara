export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  onChange: (value: number) => void;
  className?: string;
}
