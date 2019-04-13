
export default class DataStore {

    fetchData(url) {
        return fetch(url).then(response => response.json())
            .then((responseJson) => {
                console.log('data')
                return responseJson;
            })
            .catch((error) => {
                console.log(error)
            })
    }
}