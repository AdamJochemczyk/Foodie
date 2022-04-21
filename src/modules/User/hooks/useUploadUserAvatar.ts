import { uploadImage, updateImage } from "../../../utils/uploadImage";
import { useMutation } from "react-query";
import { useUser } from "src/utils/useUser";
import { updateUserAvatar } from "./updateUserAvatar";
import { toast } from "react-toastify";

export const useUploadUserAvatar = (mode: "add" | "edit") => {
  const { userId } = useUser();

  return useMutation(
    async (file: File) => {
      const image =
        mode === "add"
          ? await uploadImage(`users/${userId}`, file)
          : await updateImage(`users/${userId}`, file);
      if (image?.link) {
        return await updateUserAvatar({
          imageLink: image.link,
          userId
        });
      }
    },
    {
      onSuccess: () => {
        toast.success("You uploaded avatar");
      },
      onError: () => {
        toast.error("Can't upload avatar");
      }
    }
  );
};
