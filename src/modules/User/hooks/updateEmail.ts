import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "src/utils/supabaseClient";

export const useUpdateEmail = () => {
  return useMutation(
    async (email: string) => {
      const { user, error } = await supabase.auth.update({
        email
      });
      if (error) {
        throw new Error("Cannot update email");
      }
      return user;
    },
    {
      onSuccess: () => {
        toast.success("We sent to you a confirmation mail to change email");
      },
      onError: () => {
        toast.error("Cannot update email");
      }
    }
  );
};
