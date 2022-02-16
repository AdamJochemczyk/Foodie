import { User } from "@supabase/supabase-js";
import { useQuery } from "react-query";
import { supabase } from "./supabaseClient";

const getUser = async (user: User | null) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
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
  const user = supabase.auth.user();

  return useQuery("user", () => getUser(user));
};
