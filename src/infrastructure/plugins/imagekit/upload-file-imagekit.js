import { imagekit } from "./imagekit-config.js";

async function uploadImage(image) {
	const uploaded = await imagekit.upload({
		file: image.buffer,
		fileName: `${Date.now()}-${image.originalname}`,
		useUniqueFileName: false,
	});
	return uploaded;
}
export default uploadImage;
