import { definitions } from "./../../../../types/supabase";
import { useQuery } from "react-query";
import { supabase } from "./../../../utils/supabaseClient";
import { useUserContext } from "src/context/UserContext";
import { toast } from "react-toastify";

const getUserMeals = async (days: string[], userId: string) => {
  const { data, error } = await supabase
    .from<definitions["usermeal"]>("usermeal")
    .select("id,mealname,mealdate")
    .eq("userid", userId)
    .gte("mealdate", days[0])
    .lte("mealdate", days[days.length - 1]);
  if (error) {
    throw error.message;
  }
  return data;
};

export const useGetUserMeals = (days: string[]) => {
  const { user } = useUserContext();

  const { error, data, isLoading } = useQuery(
    ["getUserMeals", days, user.userId],
    () => getUserMeals(days, user.userId)
  );
  if (error) {
    toast.error(error as string);
  }
  return { entities: data || [], isLoading };
};
