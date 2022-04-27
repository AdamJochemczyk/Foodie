import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { supabase } from "./../../../utils/supabaseClient";
import { useMutation } from "react-query";
import { useUser } from "./../../../utils/useUser";

interface AddProductToFridge {
  productid: string;
  count: number;
  bestbeforedate: string;
}

const insertProductToFridge = async ({
  bestbeforedate,
  productid,
  userId,
  count
}: AddProductToFridge & { userId: string }) => {
  const { data, error } = await supabase.from("productinfridge").insert({
    bestbeforedate,
    productid,
    userid: userId,
    count
  });
  if (error) {
    throw new Error("Cannot add product to fridge");
  }
  return data;
};

export const useAddProductToFridge = () => {
  const { userId } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    async (values: AddProductToFridge) => {
      return await insertProductToFridge({ ...values, userId });
    },
    {
      onSuccess: () => {
        toast.success("You added product to fridge");
        queryClient.invalidateQueries(["productsInFridge"]);
      },
      onError: (err: Error) => {
        toast.error(err.message);
      }
    }
  );
};
