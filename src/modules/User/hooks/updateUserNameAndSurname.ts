import { useUser } from "src/utils/useUser";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { UserData } from "../types";
import { toast } from "react-toastify";

const updateUser = async (
  { name, surname }: UserData,
  userId: string | undefined
) => {
  const errorMsg = "Cannot update user name and surname";
  if (typeof userId === "undefined") {
    throw new Error(errorMsg);
  }

  const { error } = await supabase
    .from("users")
    .update({
      name,
      surname
    })
    .eq("id", userId);
  if (error) {
    return new Error(errorMsg);
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
