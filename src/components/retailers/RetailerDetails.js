import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getAllDistributors, getAllNurseries, getCurrentRetailer, getDistributorFlowers } from "../ApiManager"

export const RetailerDetails = () => {
    const [flowers, setDistributorFlowers] = useState([])
    const {retailerId} = useParams()
    const [currentRetailer, setCurrentRetailer] = useState([])
    const [distributors, setDistributors] = useState([])
    const [nurseries, setNurseries] = useState([])
    const [filteredDistributors, setFiltered] = useState([])
    const [filteredNurseries, setFilteredNurseries] = useState([])

    useEffect(
        () => {
            getCurrentRetailer(retailerId, setCurrentRetailer)
            getAllDistributors(setDistributors)
            getAllNurseries(setNurseries)
        },
        []
    )

    useEffect(
        () => {
            getDistributorFlowers(currentRetailer[0]?.distributorId, setDistributorFlowers)
        },
        [currentRetailer]
    )

    useEffect ( 
        () => {
            let filtered = distributors.filter(distributor => distributor.id === currentRetailer[0].distributorId)
            setFiltered(filtered)
        },
        [distributors]
    )

    useEffect (
        () => {
            let filteredSet = new Set()
            flowers.map(flower => {
                nurseries.map(nursery => {
                    if(nursery.id === flower?.nurseryFlower?.nurseryId) {
                        filteredSet.add(nursery)
                        console.log(filteredSet)
                    }
                })
                let filteredArray = [...filteredSet]
                setFilteredNurseries(filteredArray)
            })
        },
        [flowers]
    )

    return <>
    <h2>{currentRetailer[0]?.name} Retailer</h2>
        <h4>Flowers</h4>
        { flowers.map(flower => {
            let foundDistributor = distributors.find(distributor => flower.distributorId === distributor.id) 
            return <>
            <section className="retailer">
                <header className="retailer__header">{flower?.nurseryFlower?.flower?.species} from <Link to={`/distributors/${foundDistributor.id}`}>{foundDistributor.name}</Link></header>
                <div>Color: {flower?.nurseryFlower?.flower?.color}</div>
                <div>Price: {((flower?.nurseryFlower?.price) * (currentRetailer[0]?.priceMarkup) * (foundDistributor.priceMarkup)).toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>
                <div>Price Markup: {parseInt((currentRetailer[0].priceMarkup - 1) * 100)}%</div>
            </section></>
        })}
    <h2>Distributors</h2>
    <section className="retailer">
        <header className="retailer__header">{filteredDistributors[0]?.name}</header>
        <div className="nurseryHeader">Flower Providers</div>
        { filteredNurseries.map(nursery => {
            return <div><Link to={`/nurseries/${nursery.id}`}>{nursery.name}</Link></div>
        })}
    </section>
    </>

}