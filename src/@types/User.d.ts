import { Entity } from "./Entity"

export type User = Entity & {
	nome: string
	email: string
	user: string
	password: string
}
