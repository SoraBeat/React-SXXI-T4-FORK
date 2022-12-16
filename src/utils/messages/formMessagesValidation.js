export const yupErrorMessages = {
	required: "Este campo es requerido",
	invalidEmail: "Debe contener un correo electronico valido.",
	min4: "*Minimo 4 caracteres",
	min8: "*Minimo 8 caracteres",
	password6: "La contraseña debe contener al menos 6 caracteres, una letra, un numero y un simbolo $%#",
	password8: "La contraseña debe contener al menos 8 caracteres, una letra, un numero y un simbolo $%#",
	comparePass: "Las contraseñas deben coincidir",
	format: "*Formato no soportado",
	urlValida: "Ingresa una URL valida",
};

export const yupRegexValidation = {
	messageRgx: /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
};
