import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { useUserContext } from "src/context/UserContext";
import { setToStorage } from "src/common/utils/localStorage";

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};

export const useLogout = () => {
  const { setUser, setIsLoggedIn } = useUserContext();
  return useMutation(() => logout(), {
    onSuccess: () => {
      toast.success("Logged out");
      setToStorage("userid", "");
      setToStorage("email", "");
      setUser({ userId: "", email: "" });
      setIsLoggedIn(false);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    }
  });
};
