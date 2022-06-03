import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getNurseryFlowers } from "../ApiManager"

export const NurseryDetails = () => {
    //only displays when route = nursery/:nurseryId (some number)
    const {nurseryId} = useParams()
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [nurseryObj, setNurseryObj] = useState([])
    const [distributorNurseries, setDistributorNurseries] = useState([])
    const [filteredDistributors, setFiltered] = useState([])
    const [editButton, editButtonState] = useState(false)
    const [nurseryFlowerId, setNurseryFlowerId] = useState(0)
    const [newNurseryFlower, updateNurseryFlower] = useState({})

    let navigate = useNavigate()
    
    useEffect(
        () => {
            getNurseryFlowers(nurseryId, setNurseryFlowers)
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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

         fetch(`http://localhost:8088/nurseryFlowers/${nurseryFlowerId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNurseryFlower)
        })
            .then(response => response.json())
            .then(() => {
                getNurseryFlowers(nurseryId, setNurseryFlowers)
                navigate(`/nurseries/${nurseryId}`)
            }) 
    }


    return <> 
        <h2>{nurseryObj[0]?.nursery?.name} Details</h2>
        <h4>Flowers</h4>
        { nurseryFlowers.map(nurseryFlower => {
            return <>
            <section className="nursery">
                <header className="nursery__header" key={nurseryId}>{nurseryFlower?.flower?.species}</header>
                <div>Color: {nurseryFlower?.flower?.color}</div>
                { editButton ? <>
                    { nurseryFlowerId === nurseryFlower.id ? <>
                        <form className="editPrice">
                                <fieldset>
                                    <div className="form-group">
                                    <label htmlFor="price">Price: </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={
                                            (event) => {
                                                let foundFlower = nurseryFlowers.find(flower => nurseryFlowerId === flower.id)
                                                const copy = {...foundFlower}
                                                copy.price = parseFloat(event.target.value)
                                                console.log(copy)
                                                updateNurseryFlower(copy)
                                            }
                            } />
                                    </div>
                                </fieldset>
                        </form>
                        <button
                            onClick={(clickEvent) =>  {
                                handleSaveButtonClick(clickEvent)
                                editButtonState(false)
                            }}
                            className="btn btn-primary">
                            Save
                    </button></> : 
                        <div>Price: {nurseryFlower.price}<button onClick={() => {
                            editButtonState(true)
                            setNurseryFlowerId(nurseryFlower.id)}}>Change Price</button></div>  }</> : <>
                        <div>Price: {nurseryFlower.price}</div>
                        <button onClick={() => {
                            editButtonState(true)
                            setNurseryFlowerId(nurseryFlower.id)}}>Change Price</button> 
                        </>}
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