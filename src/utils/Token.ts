import { sign } from "jsonwebtoken";

export async function getAccessToken({ ...payload }): Promise<string> {
	console.log('JSONWEBTOKEN=>', process.env.JWT_KEY)
	const token = sign({ ...payload }, process.env.JWT_KEY, {
		expiresIn: "10m",
	});

	return token;
}
