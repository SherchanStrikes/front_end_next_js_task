import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../../components/context/CartContext";

function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
      <CartProvider>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
      </CartProvider>
  );
}
export default App;
