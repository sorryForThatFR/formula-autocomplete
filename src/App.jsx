import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PrySelectField } from "./PrySelectField";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrySelectField />
    </QueryClientProvider>
  );
}

export default App;
