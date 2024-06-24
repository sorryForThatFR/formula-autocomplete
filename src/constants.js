export const ALLOWED_OPERATORS = ["-", "+", "/", "(", ")", "*", "^"];

export const ALLOWED_OPERATORS_OPTIONS = ALLOWED_OPERATORS.map((el) => ({
  id: el,
  label: el,
  value: el,
}));

export const QUERY_KEY = "repoData";
