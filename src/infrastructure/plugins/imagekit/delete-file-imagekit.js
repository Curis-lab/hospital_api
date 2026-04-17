import { imagekit } from "./imagekit-config.js";

export const deleteImageKitImage = async (url) => {
	const files = await imagekit.listFiles({
		searchQuery: `name="${url.split("/").pop()}"`,
	});
	await imagekit.deleteFile(files[0].fileId);
};
