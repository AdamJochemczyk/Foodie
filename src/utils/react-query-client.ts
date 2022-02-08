import { QueryClient } from "react-query";

const RETRY_DELAY = 1000;
const STALE_TIME = 60_000;
const RETRY_TIMES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: RETRY_TIMES,
      retryDelay: RETRY_DELAY,
      staleTime: STALE_TIME
    }
  }
});
