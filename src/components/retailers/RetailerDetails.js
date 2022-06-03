import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllDistributors, getCurrentRetailer, getDistributorFlowers } from "../ApiManager"

export const RetailerDetails = () => {
    const [flowers, setDistributorFlowers] = useState([])
    const {retailerId} = useParams()
    const [currentRetailer, setCurrentRetailer] = useState([])
    const [distributors, setDistributors] = useState([])

    useEffect(
        () => {
            getCurrentRetailer(retailerId, setCurrentRetailer)
            getAllDistributors(setDistributors)
        },
        []
    )

    useEffect(
        () => {
            getDistributorFlowers(currentRetailer[0]?.distributorId, setDistributorFlowers)
        },
        [currentRetailer]
    )

    return <>
    <h2>{currentRetailer[0]?.name} Details</h2>
        <h4>Flowers</h4>
        { flowers.map(flower => {
            let foundDistributor = distributors.find(distributor => flower.distributorId === distributor.id) 
            return <>
            <section className="retailer">
                <header className="retailer__header">{flower?.nurseryFlower?.flower?.species} from {foundDistributor.name}</header>
                <div>Color: {flower?.nurseryFlower?.flower?.color}</div>
                <div>Price: {((flower?.nurseryFlower?.price) * (currentRetailer[0]?.priceMarkup) * (foundDistributor.priceMarkup)).toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>
                <div>Price Markup: {parseInt((currentRetailer[0].priceMarkup - 1) * 100)}%</div>
            </section></>
        })}
    </>

}