import { ChakraProvider } from "@chakra-ui/react";

import { AuthContextProvider, initialValue } from "./AuthContext";

import type { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <ChakraProvider>
      <AuthContextProvider {...initialValue}>{children}</AuthContextProvider>
    </ChakraProvider>
  );
};
