import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
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
        return alert('Credenciais inválidas')
    }
  };

  return (
    <>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>E-mail</FormLabel>
        <Input {...register("email")} placeholder="E-mail" />
      </FormControl>

      <FormControl mt={4} mb={8}>
        <FormLabel>Senha</FormLabel>
        <Input {...register("password")} placeholder="Senha" type="password" />
      </FormControl>

      <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
        Entrar
      </Button>
    </>
  );
};
