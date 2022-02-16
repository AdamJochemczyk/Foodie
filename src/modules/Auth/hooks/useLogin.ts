import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "../../../utils/supabaseClient";
import { User } from "./types";

export const useLogin = () => {
  const router = useRouter();
  return useMutation(
    "login",
    async ({ email, password }: User) => {
      const { user, error } = await supabase.auth.signIn({
        email,
        password
      });
      if (error) {
        throw error;
      }
      return user;
    },
    {
      onSuccess: () => {
        router.push("/recipes");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
