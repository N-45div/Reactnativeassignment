import { Stack } from "expo-router";
import './globals.css';
import GlobalProvider from "@/lib/global-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      refetchOnWindowFocus : false,
    },
  },
});
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </GlobalProvider>
    </QueryClientProvider>
);
}
