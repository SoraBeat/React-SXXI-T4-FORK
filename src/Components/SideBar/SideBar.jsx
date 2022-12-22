import React from "react";
import { Link } from "react-router-dom";
import Chat from "Assets/images/Chat.png";
import User from "Assets/images/User.png";
import Calendar from "Assets/images/Calendar.png";
import Search from "Assets/images/Search.png";
import Chart from "Assets/images/Chart.png";
import Slide from "Assets/images/sidebar-slide.png";
import Testimonial from "Assets/images/sidebar-testimonials.png";
import Categories from "Assets/images/sidebar-categories.png";

export default function SideBar({ open }) {
	const Menus = [
		{ title: "Actividades", src: Chat },
		{ title: "Categorias", src: Categories },
		{ title: "Novedades", src: Search },
		{ title: "Miembros", src: Chart },
		{ title: "Organizacion ", src: Calendar },
		{ title: "Slides", src: Slide },
		{ title: "Testimonios", src: Testimonial },
		{ title: "Usuarios", src: User },
	];
	return (
		<aside
			className={` ${
				open ? "md:w-20 lg:w-20 p-0" : "w-56"
			} hidden sm:block  min-h-screen md:p-5 lg:p-5  pt-8 duration-300 z-10 bg-gray-100 shadow-lg`}
		>
			<div className="flex gap-x-4 justify-center items-center mt-14 ">
				<Link to="/">
					<img src="/images/assets/logo-somosmas.png" alt="logo-somosmas" className="w-32" />
				</Link>
			</div>
			<ul className="pt-6">
				{Menus.map((Menu, index) => (
					<li
						key={index}
						className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-slate-500 font-bold text-sm items-center gap-x-4 mt-2
                                 ${index === 0 && "bg-light-white"} `}
					>
						<Link to={`/backoffice/${Menu.title.toLowerCase()}`}>
							<img src={`${Menu.src}`} />
						</Link>
						<span className={`${open && "hidden"} origin-left duration-200`}>
							<Link to={`/backoffice/${Menu.title.toLowerCase()}`}>{Menu.title}</Link>
						</span>
					</li>
				))}
			</ul>
		</aside>
	);
}
