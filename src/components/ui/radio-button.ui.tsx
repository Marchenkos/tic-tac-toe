import { memo } from "react";

import styles from './radio-button-styles.module.css';

interface RadioButtonUIProps {
  name: string;
  value: string;
  label: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

export const RadioButtonUI: React.FC<RadioButtonUIProps> = memo(function RadioButtonUI ({
  label, name, value, handleChange, checked
}) {
  const id = `radio_${name}_${value}`;
  
  return (
    <>
      <input defaultChecked={checked} className={styles.radio} id={id} type="radio" name={name} value={value} onChange={handleChange} />
      <label className={styles.label} htmlFor={id}>{label}</label>
    </>
  )
});
