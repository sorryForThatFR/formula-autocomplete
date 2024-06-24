import { useEffect } from "react";

import { useStore } from "./store";
import { evaluateExpression } from "./utils";
import styles from "./Result.module.css"

export const ResultField = () => {
  const { result, setResult, expression } = useStore();

  useEffect(() => {
    const calculatedValue = evaluateExpression(expression);
    setResult(Number.isNaN(calculatedValue) ? "ERROR" : calculatedValue);
  }, [expression, setResult]);

  return (
    <div className={styles.result}>
      <p>Result:</p>
      <p>{result}</p>
    </div>
  );
};
