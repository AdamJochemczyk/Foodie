import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation(() => logout(), {
    onSuccess: () => {
      toast.success("Zostałeś wylogowany");
      router.push("/");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    }
  });
};
