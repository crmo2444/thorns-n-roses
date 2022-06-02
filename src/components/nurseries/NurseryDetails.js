import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getNurseryFlowerDetails } from "../ApiManager"

export const NurseryDetails = () => {
    //only displays when route = nursery/:nurseryId (some number)
    const {nurseryId} = useParams()
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [nurseryObj, setNurseryObj] = useState([])
    const [distributorNurseries, setDistributorNurseries] = useState([])
    const [filteredDistributors, setFiltered] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/nurseryFlowers?_expand=flower&nurseryId=${nurseryId}`)
                .then(response => response.json())
                .then((data) => {
                    setNurseryFlowers(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/nurseryFlowers?_expand=nursery&nurseryId=${nurseryId}`)
                .then(response => response.json())
                .then((data) => {
                    setNurseryObj(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/distributorNurseries?_expand=distributor`)
                .then(response => response.json())
                .then((data) => {
                    setDistributorNurseries(data)
                })
        },
        []
    )

    useEffect(
        () => {
            nurseryFlowers.map(nurseryFlower => {
                let filtered = distributorNurseries.filter(distributorNursery => distributorNursery.nurseryFlowerId === nurseryFlower.id)
                setFiltered(filtered)
            })
        },
        [distributorNurseries]
    )


    return <> 
        <h2>{nurseryObj[0]?.nursery?.name} Details</h2>
        <h4>Flowers</h4>
        { nurseryFlowers.map(nurseryFlower => {
            return <>
            <section className="nursery">
                <header className="nursery__header" key={nurseryId}>{nurseryFlower?.flower?.species}</header>
                <div>Color: {nurseryFlower?.flower?.color}</div>
                <div>Price: {nurseryFlower.price}</div>
            </section> 
                </>
            })}
        <h4>Distributors</h4>
        { filteredDistributors.map(distributorObj => {
            return <>
            <section className="nursery">
                <header className="nursery__header">{distributorObj?.distributor?.name}</header>
            </section>
            </>
        })}
        </>
}