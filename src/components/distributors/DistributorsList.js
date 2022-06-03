import { useEffect, useState } from "react"
import { getAllDistributors } from "../ApiManager"
import { Distributor } from "./Distributor"
import "./Distributor.css"

export const DistributorsList = () => {
    const [distributors, setDistributors] = useState([])

    useEffect(
        () => {
            getAllDistributors(setDistributors)
        },
        []
    )
    
    return <article className="distributors">
        {
            distributors.map(distributor => <Distributor key={`distributor--${distributor.id}`}  
                id={distributor.id} 
                name={distributor.name}
                price={distributor.priceMarkup} 
            />)
        }
    </article>
}