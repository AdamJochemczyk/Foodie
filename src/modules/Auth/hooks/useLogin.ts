import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useUserContext } from "src/context/UserContext";
import { setToStorage } from "src/common/utils/localStorage";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useUserContext();
  return useMutation(
    "login",
    async ({ email, password }: LoginData) => {
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
      onSuccess: (user: User | null) => {
        if (user && user.email) {
          setToStorage("userid", user.id);
          setToStorage("email", user.email);
          setUser({ userId: user.id, email: user.email });
          setIsLoggedIn(true);
          router.push("/recipes");
        }
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
