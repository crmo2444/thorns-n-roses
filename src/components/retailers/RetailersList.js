import { useEffect, useState } from "react"
import { getAllRetailers } from "../ApiManager"
import { Retailer } from "./Retailer"
import "./Retailer.css"

export const RetailersList = () => {
    const [retailers, setRetailers] = useState([])

    useEffect(
        () => {
            getAllRetailers(setRetailers)
        },
        []
    )
    
    return <article className="retailers">
        {
            retailers.map(retailer => <Retailer key={`retailer--${retailer.id}`}  
                id={retailer.id} 
                name={retailer.name}
                address={retailer.address}
            />)
        }
    </article>
}