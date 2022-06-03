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