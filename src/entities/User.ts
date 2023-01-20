import { Entity } from "../@types/Entity";

export type TUser = Entity & {
	nome: string
	email: string
	user: string
	password: string
}

export class User {

	create(data: TUser) {
		//

		//connection.
	}
}
