import { toast } from "react-toastify";
import { supabase } from "../../../utils/supabaseClient";
import { useMutation } from "react-query";

const resetPasswordForEmailRequest = async (email: string) => {
  const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
  if (error) {
    throw error;
  }
  return data;
};

export const useResetPasswordForEmailRequest = () => {
  return useMutation((email: string) => resetPasswordForEmailRequest(email), {
    onSuccess: () => {
      toast.success("We send you a confirmation email");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    }
  });
};
