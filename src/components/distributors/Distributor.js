import React from "react"
import { Link } from "react-router-dom"

export const Distributor = ({id, name, price}) => {
    return <section className="nursery">
                    <div>
                        <Link to={`/distributors/${id}`} >{name}</Link>
                    </div>
                </section>
}