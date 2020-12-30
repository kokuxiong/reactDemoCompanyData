import axios from 'axios'

//全量検索
function findAllCountry(callback){
    axios.get('/api/countrys')
        .then((result) => {
            callback(result.data)
        })
        .catch(() => {
            console.log("findAllCountry failed")
            callback([])
        })
}

export {
    findAllCountry  //全量検索
}