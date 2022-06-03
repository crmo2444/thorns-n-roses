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

export const getAllDistributors = (setDistributors) => {
    return fetch(`http://localhost:8088/distributors`)
            .then(response => response.json())
            .then((distributorArray) => {
                setDistributors(distributorArray)
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