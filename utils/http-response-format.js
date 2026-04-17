export default function httpResponseFormat(code, message, body = null) {
	return {
		code,
		message,
		body,
	};
}
