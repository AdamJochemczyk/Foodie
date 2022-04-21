import { useQuery } from "react-query";
import { useUserContext } from "src/context/UserContext";
import { supabase } from "./supabaseClient";

interface FoodieUser {
  id: string;
  name: string;
  surname: string;
  avatar: string;
  usertype: string;
}

const getUser = async (userId: string, email: string) => {
  if (userId !== "") {
    const { data, error } = await supabase
      .from<FoodieUser>("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    if (!data) {
      throw new Error("User not found");
    }
    return { data, userId: data?.id, email };
  }
};

export const useUser = () => {
  const { user, isLoggedIn, setIsLoggedIn } = useUserContext();
  const query = useQuery(["foodieUser", user, isLoggedIn], () =>
    getUser(user.userId, user.email)
  );

  return {
    ...query,
    data: query.data?.data,
    userId: user.userId,
    email: user.email,
    isLoggedIn,
    setIsLoggedIn
  };
};
