import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "../FormStyles.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const RegisterForm = () => {
	// eslint-disable-next-line no-unused-vars
	const [userLogin, setUserLogin] = useState({});
	const messages = {
		messageRgx:
			/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
		messageRequired: "Este campo es requerido",
		messageEmail: "Debe contener un correo electronico valido.",
		messageComparePass: "Las contraseñas deben coincidir",
		messagePassRequired:
			"La contraseña debe contener al enos 6 caracteres, una letra, un numero y un simbolo $%#",
	};

	return (
		<div className="flex w-full bg-slate-50  justify-between items-center min-h-screen">
			<div className="w-full sm:w-full sm:mx-auto md:w-1/2 md:mx-auto flex flex-col justify-center items-center">
				<Formik
					initialValues={{ email: "", password: "", confirmPassword: "" }}
					onSubmit={(values, { resetForm }) => {
						setUserLogin(values);
						Swal.fire({
							icon: "success",
							title: "Tu registro fue exitoso!",
						});
						resetForm(values);
					}}
					validationSchema={() =>
						yup.object().shape({
							email: yup
								.string()
								.email(messages.messageEmail)
								.required(messages.messageRequired),
							password: yup
								.string()
								.matches(messages.messageRgx, messages.messagePassRequired)
								.required(messages.messageRequired),
							confirmPassword: yup
								.string()
								.required(messages.messageRequired)
								.oneOf(
									[yup.ref("password"), null],
									messages.messageComparePass
								),
						})
					}
				>
					{({ errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="w-full flex flex-col  gap-4">
								<div className="hidden lg:block md:hidden sm:hidden">
									<h4 className="text-base text-left">Bienvenido</h4>
									<h1 className="sefl-start text-2xl md:text-3xl text-left font-semibold">
										Ingresa tus datos de registro!
									</h1>
								</div>
								<div className="mx-auto lg:hidden md:block">
									<img src="images/logo-somosmas.png" />
								</div>
								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="email"
									placeholder="Ingresa tu correo electronico"
								/>
								<ErrorMessage
									name="email"
									component={() => (
										<span className="text-red-400 text-xs">{errors.email}</span>
									)}
								/>

								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									type="password"
									name="password"
									placeholder="Ingresa una contraseña nueva"
								/>
								<ErrorMessage
									name="password"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.password}
										</span>
									)}
								/>

								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="confirmPassword"
									type="password"
									placeholder="Ingresa nuevamente la contraseña"
								/>
								<ErrorMessage
									name="confirmPassword"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.confirmPassword}
										</span>
									)}
								/>

								<button
									type="submit"
									className="w-full bg-red-600 p-3 mt-3 shadow tracking-wide 
									rounded-lg  mx-auto hover:bg-red-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-xl font-medium"
								>
									Registrarme
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<div className="absolute bottom-4 flex gap-2">
					<p className="font-medium text-slate-600">Ya tienes cuenta?</p>
					<Link to="/login-user" className="text-red-600 font-medium">
						Inicia sesion
					</Link>
				</div>
			</div>

			<div className="hidden lg:w-1/2 lg:block h-screen md:w-1/2 md:hidden sm:hidden">
				<img
					alt="loginRegister"
					src="images/image-loginRegister.jpg"
					className="h-screen w-full"
				/>
			</div>
		</div>
	);
};

export default RegisterForm;
