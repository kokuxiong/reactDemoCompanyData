import axios from 'axios'

//社員新規登録
//objを新規登録し、成功したらcallbackを呼び出す
function insertEmpinfo(obj, callback){
    axios.post('/api/empinfo', obj) 
        .then(() => {
            callback()
        })
        .catch(() => {
            console.log("insertEmpinfo failed")
        })
}

//社員全量検索
//全量検索し、成功したらcallbackを呼び出す
function findAllEmpinfo(callback){
    axios.get('/api/empinfos')
        .then((result) => {
            callback(result.data)
        })
        .catch(() => {
            console.log("findAllEmpinfo failed")
            callback([])
        })
}

//社員cmpCdにより検索する
//成功したらcallbackを呼び出す
function findByCmpCd(cmpCd,callback){
    axios.get('/api/empinfo/' + cmpCd)
        .then((result) => {
            callback(result.data)
        })
        .catch(() => {
            console.log("findByCmpCd failed")
            callback([])
        })
}

//社員情報更新
//objを更新し、成功したらcallbackを呼び出す
function updateEmpinfo(obj, callback){
    axios.put('/api/empinfo', obj)
        .then(() => {
            callback()
        })
        .catch(() => {
            console.log("updateEmpinfo failed")
        })
}

//社員削除
//obj.CmpCdにより、objを削除し、成功したらcallbackを呼び出す
function deleteByCmpCd(obj, callback){
    axios.delete('/api/empinfo/' + obj.cmpCd)
        .then(() => {
            callback()
        })
        .catch(() => {
            console.log("deleteById failed")
        })
}

//上記ファンクションをexportする
export {
    insertEmpinfo,  //新規
    findAllEmpinfo, //全量検索
    findByCmpCd,    //ＩＤより検索
    updateEmpinfo,  //更新
    deleteByCmpCd   //削除
}