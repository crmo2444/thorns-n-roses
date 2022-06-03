import { Link } from "react-router-dom"

export const Retailer = ({id, name, address}) => {
    return <section className="retailer">
                    <div>
                        <Link to={`/retailers/${id}`} >{name}</Link>
                    </div>
                    <div>Address: {address}</div>
                </section>
}