import MenuSideBar from "Components/SideBar/MenuSideBar";
import SideBar from "Components/SideBar/SideBar";
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutForm = ({ children }) => {
	const [open, setOpen] = useState(true);
	const { user, isLoggedIn } = useSelector(state => state.auth);

	if (user?.role_id === 2 || isLoggedIn === false) {
		return <Navigate to="/" />;
	}

	return (
		<div className="bg-white  w-full h-screen mx-auto flex-col justify-center items-center">
			<MenuSideBar setOpen={setOpen} open={open} />
			<div className="flex">
				<SideBar open={open} />
				{children}
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutForm;
