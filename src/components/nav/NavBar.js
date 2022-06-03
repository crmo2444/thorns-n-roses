import { Link } from "react-router-dom"
import "./NavBar.css"
import React from "react"

export const NavBar = () => {

    return <>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/nurseries">Nurseries</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/distributors">Distributors</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/retailers">Retailers</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login">Log Out</Link>
            </li>
        </ul>
        </>
}

