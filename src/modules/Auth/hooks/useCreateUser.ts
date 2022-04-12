import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { uploadImage } from "src/utils/uploadImage";
import { CreateUser, NewUser } from "./types";

const createUser = async (userData: Pick<CreateUser, "email" | "password">) => {
  const { user, error: signUpError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password
  });

  if (signUpError) {
    throw signUpError;
  }

  return user;
};

const insertUserData = async ({ id, name, surname, avatar }: NewUser) => {
  if (!avatar) {
    throw new Error("Cannot create user");
  }
  const data = await uploadImage(`users/${id}`, avatar);
  const { error } = await supabase.from("users").insert({
    id,
    name,
    surname,
    avatar: data?.link || ""
  });
  if (error) {
    throw error;
  }
};

export const useCreateUser = () => {
  const router = useRouter();
  return useMutation(
    async (user: CreateUser) => {
      const createdUser = await createUser(user);
      if (createdUser) {
        return await insertUserData({
          id: createdUser.id,
          name: user.name,
          surname: user.surname,
          avatar: user.avatar
        });
      }
    },
    {
      onSuccess: () => {
        toast.success("You have registered new user");
        router.push("/auth/sign-in");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
