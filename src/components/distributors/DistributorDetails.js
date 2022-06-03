import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllDistributors, getAllNurseries, getCurrentDistributorArray, getDistributorFlowers, getDistributorRetailers } from "../ApiManager"

export const DistributorDetails = () => {
    const [distributorFlowers, setDistributorFlowers] = useState([])
    const [distributors, setDistributors] = useState([])
    const {distributorId} = useParams()
    const [currentDistributor, setCurrent] = useState({})
    const [nurseries, setNurseries] = useState({})
    const [retailer, setDistributorRetailers] = useState({})

    useEffect(
        () => {
            getAllDistributors(setDistributors)
            getAllNurseries(setNurseries)
        },
        []
    )

    useEffect(
        () => {
            getDistributorFlowers(distributorId, setDistributorFlowers)
            getCurrentDistributorArray(distributorId, setCurrent)
            getDistributorRetailers(distributorId, setDistributorRetailers)
        },
        [distributorId]
    )

    return <> 
        <h2>{currentDistributor[0]?.distributor?.name} Details</h2>
        <h4>Flowers</h4>
        { distributorFlowers.map(distributorFlower => {
            let foundNursery = nurseries.find(nursery => distributorFlower?.nurseryFlower?.nurseryId === nursery.id)
            return <>
            <section className="distributor">
                <header className="distributor__header" key={distributorId}>{distributorFlower?.nurseryFlower?.flower?.species} from {foundNursery.name}</header>
                <div>Color: {distributorFlower?.nurseryFlower?.flower?.color}</div>
                <div>Price: {((distributorFlower?.nurseryFlower?.price) * (currentDistributor[0]?.distributor?.priceMarkup)).toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>
                <div>Price Markup: {(parseFloat(currentDistributor[0]?.distributor?.priceMarkup - 1).toFixed(2)) * 100}%</div>
            </section></>
        })}
        <h4>Retailers</h4>
            <section className="distributor">
                <header className="distributor__header">{retailer[0]?.name}</header>
                <div>Address: {retailer[0]?.address}</div>
            </section>
        </>

}