import React, { useEffect, useState } from "react"
import { getAllNurseries } from "../ApiManager"
import { Nursery } from "./Nursery"
import "./Nursery.css"

export const NurseriesList = () => {

    const [nurseries, setNurseries] = useState([])
    const [flowers, setFlowers] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])

    useEffect(
        () => {
            getAllNurseries(setNurseries)
        },
        []
    )
    
    return <article className="nurseries">
        {
            nurseries.map(nursery => <Nursery key={`nursery--${nursery.id}`}  
                id={nursery.id} 
                name={nursery.name} 
            />)
        }
    </article>
}