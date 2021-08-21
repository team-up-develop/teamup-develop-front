import { Job } from "@/types/index";

const backGroundImage = (user_image: Job["user"]["user_image"]) => {
  if (user_image) {
    return `background-image: url("${user_image.image_url}"); background-size: cover;`;
  }
  return;
};

export { backGroundImage };
