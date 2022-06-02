import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import "./ThornsNRoses.css"
import React from "react"


export const ThornsNRoses = () => {
	return <Routes>

		<Route path="*" element={
                <>
					<NavBar />
					<ApplicationViews />
                </>
		} />
	</Routes>
}

