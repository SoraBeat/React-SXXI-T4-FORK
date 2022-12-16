import React, { useState, useEffect } from "react";

import { findAllByPageAndSearch as getMembers } from "Services/Member/MemberApiService";
import { error } from "utils/alerts/alerts";

import News from "Components/News";
import Carousel from "Components/Carousel/Carousel";
import Staff from "Components/Staff/Staff";
import WelcomeText from "./WelcomeText";
import { getNews } from "Services/Home/ApiService";

export const Home = () => {
	const [staff, setStaff] = useState([]);
	const [news, setNews] = useState([]);

	const obtainNews = async () => {
		const data = await getNews();
		setNews(data.slice(-4).reverse());
	};

	useEffect(() => {
		getMembers({ limit: 4 })
			.then(res => {
				setStaff(res.data.data);
			})
			.catch(() => {
				error("No se pudo obtener los miembros del staff");
			});
		obtainNews();
	}, []);

	return (
		<div className=" my-5 flex flex-col w-full">
			<div className="flex flex-col lg:flex-row mt-5 w-11/12 md:w-9/12 md:px-8 mx-auto gap-5">
				<WelcomeText />
				<Carousel />
			</div>

			<div className=" my-5">
				<Staff details={staff} />
			</div>
			<div className=" my-5">
				<News details={news} />
			</div>
		</div>
	);
};
