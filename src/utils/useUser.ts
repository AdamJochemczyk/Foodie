import { useQuery } from "react-query";
import { supabase } from "./supabaseClient";

interface FoodieUser {
  id: string;
  name: string;
  surname: string;
  avatar: string;
  usertype: string;
}

const getUser = async () => {
  const userData = await supabase.auth.user();
  const { data, error } = await supabase
    .from<FoodieUser>("users")
    .select("*")
    .eq("id", userData?.id || "")
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    throw new Error("User not found");
  }
  return { data, userId: data?.id, email: userData?.email };
};

export const useUser = () => {
  const query = useQuery("foodieUser", () => getUser());

  return {
    ...query,
    data: query.data?.data,
    userId: query.data?.userId,
    email: query.data?.email
  };
};
