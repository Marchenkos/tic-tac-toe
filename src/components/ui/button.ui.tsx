import { memo } from "react";
import styles from './button-styles.module.css';
import classNames from "classnames";

export enum ButtonTypesEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

interface ButtonUIProps {
  label?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  style?: ButtonTypesEnum;
  type?: "button" | "submit" | "reset";
}

export const ButtonUI: React.FC<ButtonUIProps> = memo(function ButtonUI ({
  label, children, handleClick, style = ButtonTypesEnum.PRIMARY, type = 'button'
}) {
  
  return (
    <button type={type} className={classNames(styles.button, styles[`button-${style}`])} onClick={handleClick}>
      {label || children}
    </button>
  )
});
