import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

export default class ImageKitServices {
  constructor() {
    this.imagekit = new ImageKit({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });
  }

  async uploadImage(image) {
    const uploaded = await this.imagekit.upload({
      file: image.buffer,
      fileName: `${Date.now()}-${image.originalname}`,
      useUniqueFileName: false,
    });

    return uploaded;
  }
  async deleteImage(image){}
}
