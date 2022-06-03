export const getAllNurseries = (setNurseries) => {
    return fetch(`http://localhost:8088/nurseries`)
            .then(response => response.json())
            .then((nurseryArray) => {
                setNurseries(nurseryArray)
            })
}

export const getNurseryFlowers = (id, setNurseryFlowers) => {
    return fetch(`http://localhost:8088/nurseryFlowers?_expand=flower&nurseryId=${id}`)
                .then(response => response.json())
                .then((data) => {
                    setNurseryFlowers(data)
                })
}

export const getNurseryFlowersOnly = (setNurseryFlowers) => {
    return fetch(`http://localhost:8088/nurseryFlowers?_expand=flower`)
                .then(response => response.json())
                .then((data) => {
                    setNurseryFlowers(data)
                })
}

export const getAllDistributors = (setDistributors) => {
    return fetch(`http://localhost:8088/distributors`)
            .then(response => response.json())
            .then((distributorArray) => {
                setDistributors(distributorArray)
            })
}

export const getAllPurchases = (setPurchases) => {
    return fetch(`http://localhost:8088/purchases?_expand=distributorNursery`)
            .then(response => response.json())
            .then((data) => {
                setPurchases(data)
            })
}

export const getAllRetailers = (setRetailers) => {
    return fetch(`http://localhost:8088/retailers`)
            .then(response => response.json())
            .then((data) => {
                setRetailers(data)
            })
}

export const getAllUsers = (setUserList) => {
    return fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((data) => {
                setUserList(data)
            })
}

export const getCurrentRetailer = (id, setCurrentRetailer) => {
    return fetch(`http://localhost:8088/retailers?_expand=distributor&id=${id}`)
            .then(response => response.json())
            .then((data) => {
                setCurrentRetailer(data)
            })
}

export const getDistributorFlowers = (id, setDistributorFlowers) => {
    return fetch(`http://localhost:8088/distributorNurseries?_expand=nurseryFlower&distributorId=${id}`)
                .then(response => response.json())
                .then((data) => {
                    setDistributorFlowers(data)
                })
}

export const getCurrentDistributorArray = (id, setCurrent) => {
    return fetch(`http://localhost:8088/distributorNurseries?_expand=distributor&distributorId=${id}`)
                .then(response => response.json())
                .then((data) => {
                    setCurrent(data)
                })
}

export const getDistributorRetailers = (id, setDistributorRetailers) => {
    return fetch(`http://localhost:8088/retailers?_expand=distributor&distributorId=${id}`)
                .then(response => response.json())
                .then((data) => {
                    setDistributorRetailers(data)
                })
}

export const savePurchase = (newPurchase, setFeedback) => {
    return fetch('http://localhost:8088/purchases', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Product purchased!")
            })
}

export const getUsersAndCurrent = (setUserList, setCurrentUser, thornUserObject) => {
    return fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((usersArray) => {
                setUserList(usersArray)
                let currentUser = usersArray.find(user => thornUserObject.id === user.id)   
                setCurrentUser(currentUser) 
            })
}