import { supabase } from "src/utils/supabaseClient";

export const updateUserAvatar = async ({
  imageLink,
  userId
}: {
  imageLink: string;
  userId: string;
}) => {
  const { error, data } = await supabase
    .from("users")
    .update({
      avatar: imageLink
    })
    .match({ id: userId });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
