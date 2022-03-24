import { supabase } from "src/utils/supabaseClient";

export const getCount = async (tableName: string) => {
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact" });
  if (error) {
    throw error.message;
  }
  return count;
};
