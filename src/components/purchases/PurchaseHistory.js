import { useEffect, useState } from "react"
import { getAllPurchases, getNurseryFlowersOnly, getUsersAndCurrent } from "../ApiManager"
import "./Purchase.css"

export const PurchaseHistory = ({id, customerId, price}) => {

    const [purchases, setPurchases] = useState([])
    const [userPurchases, setUserPurchase] = useState([])
    const [usersList, setUserList] = useState([])
    const [loggedInUser, setCurrentUser] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])

    const localThornsUser = localStorage.getItem("thorns_user")
    const thornsUserObject = JSON.parse(localThornsUser)

    useEffect(
        () => {
            getAllPurchases(setPurchases) // View the initial state of userPurchases
            getUsersAndCurrent(setUserList, setCurrentUser, thornsUserObject)
            getNurseryFlowersOnly(setNurseryFlowers)
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            let userPurchaseArray = purchases.filter(purchase => thornsUserObject.id === purchase.customerId)
            setUserPurchase(userPurchaseArray)
        },
        [purchases]
    )

    /* useEffect(
        () => {
            const categorizedPurchases = new Map()

            userPurchases.map(userPurchase => {
                let object = JSON.stringify(userPurchase.product.price + ':' + userPurchase.product.name)
                if (categorizedPurchases.has(object)) {
                    categorizedPurchases.set(object, categorizedPurchases.get(object) + 1)
                }
                else {
                    categorizedPurchases.set(object, 1)
                }
            })

            const categorizedPurchasesArray = Array.from(categorizedPurchases, ([key, value]) => {
                return {product: JSON.parse(key),
                        quantity: value};
              });

            setQuantityPerProduct(categorizedPurchasesArray)

        },
        [userPurchases]
    ) */
    
    let counter = 0

    return <>
    <h2>Purchase History for {loggedInUser.fullName}</h2>
    <article className="products">
    {  userPurchases.length !== 0 ? 
            <>  
            {userPurchases.map((userPurchase) => {
                let foundProduct = nurseryFlowers.find(flower => flower.id === userPurchase?.distributorNursery?.nurseryFlowerId)
                counter++
                    return <section className="product" key={`product--${userPurchase.id}`}>
                        <>
                        <div>Order #{counter}</div>
                        <div>Product: {foundProduct?.flower?.species}</div>
                        <div>Quantity: {userPurchase.quantity}</div>
                        <div>Price: {userPurchase.price.toLocaleString('en-US', {style:'currency', currency:'USD'})}</div>
                        <div>Retailer: {userPurchase.retailer}</div>
                        </> 
                    </section>
             })} </> : <div>No orders placed.</div>
    }
    </article>
    </>
}