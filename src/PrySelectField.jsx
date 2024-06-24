import { useQuery } from "@tanstack/react-query";
import Creatable from "react-select/creatable";

import { formatOptions, getGroupOptions } from "./utils";
import { useStore } from "./store";
import styles from "./PrySelect.module.css";
import { QUERY_KEY } from "./constants";
import {
  formatCreateLabel,
  formatOptionLabel,
  getOptionValue,
  isOptionSelected,
  isValidNewOption,
} from "./select";
import { FormulaField } from "./FormulaField";
import { ResultField } from "./ResultField";

export const PrySelectField = () => {
  const { formulaTokens, setFormulaTokens } = useStore();

  const { isPending, error, data } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () =>
      fetch(import.meta.env.VITE_AUTOCOMPLETE_API_URL).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return <div className={styles.error}>An error has occurred: {error.message}</div>;


  const options = formatOptions(data);
  const groupedOptions = getGroupOptions(options);

  return (
      <div className={styles.container}>
        <div className={styles.formulaContainer}>
          <Creatable
            createOptionPosition="first"
            formatCreateLabel={formatCreateLabel}
            isValidNewOption={isValidNewOption}
            options={groupedOptions}
            onChange={setFormulaTokens}
            value={formulaTokens}
            isOptionSelected={isOptionSelected}
            getOptionValue={getOptionValue}
            formatOptionLabel={formatOptionLabel}
            isMulti
          />
        </div>
      <div className={styles.resultContainer}>
        <FormulaField className={styles.text}/>
        <ResultField />
      </div>
    </div>
  );
};
