import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { DistributorDetails } from "../distributors/DistributorDetails"
import { DistributorsList } from "../distributors/DistributorsList"
import { NurseriesList } from "../nurseries/NurseriesList"
import { NurseryDetails } from "../nurseries/NurseryDetails"
import { RetailersList } from "../retailers/RetailersList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Thorns and Roses</h1>

                    <Outlet />
                </>
            }>

                <Route path="nurseries" element={ <NurseriesList /> } />
                <Route path="distributors" element={ <DistributorsList /> } />
                <Route path="distributors/:distributorId" element={ <DistributorDetails /> } />
                <Route path="retailers" element={ <RetailersList /> } />
                <Route path="nurseries/:nurseryId" element={ <NurseryDetails /> } />
            </Route>
        </Routes>
    )
}