import { backGroundImage } from "@/modules/images";

describe("images.ts", () => {
  describe("backGroundImage", () => {
    it("画像が登録されていれば正しく表示されること", () => {
      const userImage = {
        id: 1,
        image_url: "https://unsplash.com/photos/ZBWvARLyV_Y",
      };
      const result = backGroundImage(userImage);
      expect(result).toBe(
        `background-image: url("${userImage.image_url}"); background-size: cover;`
      );
    });
    it("画像が登録されていれなければ表示がされないこと", () => {
      const userImage = null;
      const result = backGroundImage(userImage);
      expect(result).toBe(undefined);
    });
  });
});
