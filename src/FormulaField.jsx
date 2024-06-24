import { useEffect } from "react";

import { useStore } from "./store";
import { getExpressionString } from "./utils";
import styles from "./Result.module.css"
export const FormulaField = () => {
  const { expression, setExpression, formulaTokens } = useStore();

  useEffect(() => {
    setExpression(getExpressionString(formulaTokens));
  }, [formulaTokens, setExpression]);

  return (
    <div className={styles.formula}>
      <p>Formula:</p>
      <p>{expression}</p>
    </div>
  );
};
