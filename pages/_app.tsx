import "styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useQueryClientConfig } from "src/utils/react-query-client";
import { UserProvider } from "src/context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { queryClient } = useQueryClientConfig();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools position="top-right" initialIsOpen={false} />
        )}
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
        <ToastContainer
          position="top-right"
          limit={3}
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
