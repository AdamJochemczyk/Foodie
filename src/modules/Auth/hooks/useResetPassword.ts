import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
const resetPassword = async (authToken: string, password: string) => {
  const { error, data } = await supabase.auth.api.updateUser(authToken, {
    password
  });
  if (error) {
    throw error;
  }
  return data;
};

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation(
    ({ authToken, password }: { authToken: string; password: string }) =>
      resetPassword(authToken, password),
    {
      onSuccess: () => {
        toast.success("Your password has been reset");
        router.push("/recipes");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
