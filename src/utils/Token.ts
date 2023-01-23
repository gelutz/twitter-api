import { sign } from "jsonwebtoken";

export async function getAccessToken({ ...payload }): Promise<string> {
	const token = sign({ ...payload }, process.env.JWT_KEY, {
		expiresIn: "10m",
	});

	return token;
}
