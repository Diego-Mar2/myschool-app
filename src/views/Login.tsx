import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { supabase } from "../config/supabase";

interface AuthForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<AuthForm>();

  const onSubmit = async (body: AuthForm) => {
    const { error } = await supabase.auth.signInWithPassword(body);

    if (error) {
      const { data, error } = await supabase.auth.signInWithPassword(body);

      if (error || !data.user.user_metadata.is_admin) {
        return alert("Credenciais inválidas");
      }
    }
  };

  return (
    <HStack w="full" h="100vh" bg="#152259" padding={100} justifyContent="end">
      <Flex></Flex>
      <Flex
        as="aside"
        w="full"
        h="full"
        maxW={360}
        maxH={360}
        bg="gray.100"
        alignItems="start"
        padding={6}
        flexDirection="column"
        justifyContent="center"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        <FormLabel mb={8} fontSize={20}>
          Entrar
        </FormLabel>

        <FormControl>
          <Input
            {...register("email")}
            type="email"
            placeholder="Digite seu email"
          />
        </FormControl>

        <FormControl mt={8} mb={10}>
          <Input
            {...register("password")}
            type="password"
            placeholder="Digite sua senha"
          />
        </FormControl>

        <Button
          onClick={handleSubmit(onSubmit)}
          colorScheme="blue"
          mr={3}
          w="full"
          bgColor="#152259"
          borderRadius="3xl"
        >
          Log in
        </Button>
      </Flex>
    </HStack>
  );
};
