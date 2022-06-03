import { useEffect, useState } from "react";
import { savePurchase } from "../ApiManager";

export const Purchase = ({id, flowerId, price, retailer}) => {
        // TODO: Create the object to be saved to the API

        const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])
        
       const handleSaveButtonClick = () => {
        let today = new Date();
        let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' at '+time;

        const newPurchase = {
            customerId: id,
            distributorNurseryId: flowerId,
            quantity: 1,
            date: dateTime,
            price: price,
            retailer: retailer
        }

        // TODO: Perform the fetch() to POST the object to the API
        savePurchase(newPurchase, setFeedback)
        }

    return <>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
            <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Purchase
        </button>
        </>
}
