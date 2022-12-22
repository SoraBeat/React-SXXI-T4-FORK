import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router";
import { act } from "react-dom/test-utils";
import MembersForm from "./MembersForm";
import store from "store/app/store";

import { setupServer } from "msw/node";
import { rest } from "msw";
window.scrollTo = jest.fn();

const handlers = [
	rest.get("https://ongapi.alkemy.org/api/members/1", (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					id: 1,
					name: "Lautaro Roa",
					image: "http://ongapi.alkemy.org/storage/LyMcQmg6Gv.jpeg",
					description: "<p>Programador</p>",
					facebookUrl: "https://www.facebook.com/LautaroRoa/",
					linkedinUrl: "https://www.linkedin.com/LautaroRoa/",
					created_at: "2022-12-13T02:46:57.000000Z",
					updated_at: "2022-12-13T05:12:28.000000Z",
					deleted_at: null,
				},
				message: "Member retrieved successfully",
			})
		);
	}),
	rest.get("https://ongapi.alkemy.org/api/members/2", (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					id: 2,
					name: "",
					image: "",
					description: "",
					facebookUrl: "",
					linkedinUrl: "",
					created_at: "",
					updated_at: "",
					deleted_at: "",
				},
				message: "Member retrieved successfully",
			})
		);
	}),
	rest.put("https://ongapi.alkemy.org/api/members/2", (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.post("https://ongapi.alkemy.org/api/members", (req, res, ctx) => {
		return res(ctx.status(200));
	}),
];
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
afterAll(() => server.close());

test("Renderizacion de formulario de creacion,se validan los campos, mock de api y creacion de miembro", async () => {
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/backoffice/members/create"]}>
				<Routes>
					<Route path="/backoffice/members/create" element={<MembersForm showCKEditor={true} />} />
				</Routes>
			</MemoryRouter>
		</Provider>
	);

	//Se renderiza correctamente los componentes del formulario
	const inputName = await screen.findByPlaceholderText("Juan Perez");
	const inputImage = await screen.findByAltText("image");
	const inputFacebook = await screen.findByPlaceholderText("https://www.facebook.com/JuanPerez");
	const inputLinkedin = await screen.findByPlaceholderText("https://www.linkedin.com/JuanPerez");
	const inputDescription = await screen.findByPlaceholderText("Escribe aqui tu descripcion");
	const submitButton = await screen.findByRole("button", { type: "submit" });
	expect(await screen.findByRole("heading", { level: 2 })).toContainHTML("Crear Miembro");
	expect(inputName).toBeInTheDocument();
	expect(inputImage).toBeInTheDocument();
	expect(inputFacebook).toBeInTheDocument();
	expect(inputLinkedin).toBeInTheDocument();
	expect(inputDescription).toBeInTheDocument();
	expect(await screen.findByText("Enviar")).toBeInTheDocument();

	//Aparece los mensajes de error al no llenar los campos y submitear el formulario
	userEvent.click(submitButton);
	const errorMessages5 = await screen.findAllByText("*Este campo es requerido");
	expect(errorMessages5.length).toBe(5);

	//Aparece error minimo 4 caracteres nombre
	userEvent.type(inputName, "Lau");
	expect(await screen.findByText("**Minimo 4 caracteres")).toBeInTheDocument();
	userEvent.type(inputName, "Lautaro Roa");

	//Aparece error URL INVALIDO facebook y linkedin
	userEvent.type(inputFacebook, "asd");
	userEvent.type(inputLinkedin, "asd");
	const errorMessagesURL = await screen.findAllByText("*URL invalido");
	expect(errorMessagesURL.length).toBe(2);
	userEvent.clear(inputFacebook);
	userEvent.type(inputFacebook, "https://www.facebook.com");
	userEvent.clear(inputLinkedin);
	userEvent.type(inputLinkedin, "https://www.linkedin.com");

	//Aparece error Formato no valido
	const imageGIF = new File(["(⌐□_□)"], "hello.gif", { type: "image/gif" });
	const imagePNG = new File(["(⌐□_□)"], "hello.png", { type: "image/png" });
	userEvent.upload(inputImage, imageGIF);
	expect(await screen.findByText("Seleccione un formato .png o .jpg.")).toBeInTheDocument();
	const buttonOKImage = await screen.findByText("OK");
	userEvent.click(buttonOKImage);
	userEvent.upload(inputImage, imagePNG);

	//Llenado de descripcion
	userEvent.type(inputDescription, "Esto es una descripcion");
	expect(await screen.findByDisplayValue("Esto es una descripcion")).toBeInTheDocument();

	//Testing sumbit del formulario
	const submitButton2 = await screen.findByRole("button", { type: "submit" });
	expect(await screen.findByText("Enviar")).toBeInTheDocument();
	userEvent.click(submitButton2);
	expect(await screen.findByText("¡Creación exitosa!")).toBeInTheDocument();
});

test("Renderizacion de formulario de edicion,se validan los campos, mock de api y update de miembro", async () => {
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/backoffice/members/edit/2"]}>
				<Routes>
					<Route path="/backoffice/members/edit/:id" element={<MembersForm showCKEditor={true} />} />
				</Routes>
			</MemoryRouter>
		</Provider>
	);

	//Se renderiza correctamente los componentes del formulario
	const inputName = await screen.findByPlaceholderText("Juan Perez");
	const inputImage = await screen.findByAltText("image");
	const inputFacebook = await screen.findByPlaceholderText("https://www.facebook.com/JuanPerez");
	const inputLinkedin = await screen.findByPlaceholderText("https://www.linkedin.com/JuanPerez");
	const inputDescription = await screen.findByPlaceholderText("Escribe aqui tu descripcion");
	const submitButton = await screen.findByText("Enviar");
	expect(await screen.findByRole("heading", { level: 2 })).toContainHTML("Editar Miembro");
	expect(inputName).toBeInTheDocument();
	expect(inputImage).toBeInTheDocument();
	expect(inputFacebook).toBeInTheDocument();
	expect(inputLinkedin).toBeInTheDocument();
	expect(inputDescription).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();

	//Aparece los mensajes de error al no llenar los campos y submitear el formulario
	userEvent.click(submitButton);
	const errorMessages5 = await screen.findAllByText("*Este campo es requerido");
	expect(errorMessages5.length).toBe(5);

	//Aparece error minimo 4 caracteres nombre
	userEvent.type(inputName, "Lau");
	expect(await screen.findByText("**Minimo 4 caracteres")).toBeInTheDocument();
	userEvent.type(inputName, "Lautaro Roa");
	//Aparece error URL INVALIDO facebook y linkedin
	userEvent.type(inputFacebook, "asd");
	userEvent.type(inputLinkedin, "asd");
	const errorMessagesURL = await screen.findAllByText("*URL invalido");
	expect(errorMessagesURL.length).toBe(2);
	userEvent.clear(inputFacebook);
	userEvent.type(inputFacebook, "https://www.facebook.com");
	userEvent.clear(inputLinkedin);
	userEvent.type(inputLinkedin, "https://www.linkedin.com");

	//Aparece error Formato no valido
	const imageGIF = new File(["(⌐□_□)"], "hello.gif", { type: "image/gif" });
	const imagePNG = new File(["(⌐□_□)"], "hello.png", { type: "image/png" });
	userEvent.upload(inputImage, imageGIF);
	expect(await screen.findByText("Seleccione un formato .png o .jpg.")).toBeInTheDocument();
	const buttonOKImage = await screen.findByText("OK");
	userEvent.click(buttonOKImage);
	userEvent.upload(inputImage, imagePNG);

	//Llenado de descripcion
	userEvent.type(inputDescription, "Esto es una descripcion");
	expect(await screen.findByDisplayValue("Esto es una descripcion")).toBeInTheDocument();

	//Testing sumbit del formulario
	const submitButton2 = await screen.findByRole("button", { type: "submit" });
	expect(await screen.findByText("Enviar")).toBeInTheDocument();
	userEvent.click(submitButton2);
	expect(await screen.findByText("¡Se actualizó con éxito!")).toBeInTheDocument();
});
