import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { User } from "./types";

const createUser = async (userData: User) => {
  const { user, error: signUpError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password
  });

  if (signUpError) {
    throw signUpError;
  }

  return user;
};

export const useCreateUser = () => {
  //TODO: add new controls dont pass email to our DB
  const router = useRouter();
  return useMutation((user: User) => createUser(user), {
    onSuccess: async createdUser => {
      const { error } = await supabase.from("users").insert({
        id: createdUser?.id,
        email: createdUser?.email
      });
      if (error) {
        throw error;
      }
      toast.success("You have registered new user");
      router.push("/auth/sign-in");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    }
  });
};
