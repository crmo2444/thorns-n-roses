import React from "react"
import { Link } from "react-router-dom"

export const Nursery = ({id, name}) => {
    return <section className="nursery">
                    <div>
                        <Link to={`/nurseries/${id}`} >{name}</Link>
                    </div>
                </section>
}