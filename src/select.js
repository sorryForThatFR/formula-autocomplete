export const formatCreateLabel = (inputValue) => `Insert ${inputValue}`;

export const isValidNewOption = (input, selected, groups) => {
  const overallOptions = groups.flatMap((group) => group.options);

  if (!input) return false;

  const shouldDisplay = !overallOptions.some(
    (option) => option.label === input
  );

  return shouldDisplay;
};

export const isOptionSelected = () => false;

export const getOptionValue = (option) => option.id;

export const formatOptionLabel = (data) => {
  if (data.label === data.value) return data.label;

  return `${data.label} <${data.value}>`;
};
