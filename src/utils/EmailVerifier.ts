export const verifyEmail = (email: string): boolean => {
	// essa regex verifica se existe um @ seguido de um '.br' ou '.com'
	if (email.match(/(@).*\.([.br]|[.com])/g).length == 0) {
		return false
	}

	return true
}
