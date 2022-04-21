import { useUser } from "src/utils/useUser";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { UserData } from "../types";
import { toast } from "react-toastify";

const updateUser = async ({ name, surname }: UserData, userId: string) => {
  const { error } = await supabase
    .from("users")
    .update({
      name,
      surname
    })
    .eq("id", userId);
  if (error) {
    return new Error("Cannot update user name and surname");
  }
};

export const useUpdateUserNameAndSurname = () => {
  const { userId } = useUser();
  return useMutation((values: UserData) => updateUser(values, userId), {
    onSuccess: () => {
      toast.success("You updated user");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    }
  });
};
