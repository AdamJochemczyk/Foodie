import { useQuery } from "react-query";
import { supabase } from "./supabaseClient";

const getUser = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("User not found");
  }
  return data;
};

export const useUser = () => {
  const { userId } = useUserId();

  return useQuery("user", () => getUser(userId));
};

export const useUserId = () => {
  const user = supabase.auth.user();

  return {
    user,
    userId: user?.id
  };
};
