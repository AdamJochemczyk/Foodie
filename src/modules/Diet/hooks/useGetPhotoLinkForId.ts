import { supabase } from "./../../../utils/supabaseClient";
import { useQuery } from "react-query";

const getPhotoLinkForId = async ({
  id,
  type
}: {
  id: string;
  type: string;
}) => {
  const { data, error } = await supabase
    .from(`${type}s`)
    .select("photolink")
    .eq(`${type}id`, id)
    .single();
  if (error) {
    throw Error("Cannot find image");
  }
  return data;
};

const fallbackImg =
  "https://fnevhlvngucqubadzzsi.supabase.co/storage/v1/object/public/images/fallback";

export const useGetPhotoLinkForId = ({
  id,
  type
}: {
  id: string;
  type: string;
}) => {
  const { error, data, isLoading } = useQuery(
    ["getIngredientId", id, type],
    () => getPhotoLinkForId({ id, type })
  );
  if (error) {
    return { photoLink: fallbackImg, isLoading: false };
  }
  return {
    photoLink: data?.photolink || fallbackImg,
    isLoading
  };
};
