import axios from 'axios'

//ログインユーザ新規登録
//objを新規登録し、成功したらcallbackを呼び出す
function insertLoginuser(obj, callback){
    axios.post('/api/loginuser', obj)
        .then(() => {
            callback()
        })
        .catch(() => {
            console.log("insertLoginuser failed")
        })
}

//ログインユーザ全量検索　※未利用
//全量検索し、成功したらcallbackを呼び出す
function findAllLoginuser(callback){
    axios.get('/api/loginusers')
        .then((result) => {
            callback(result.data)
        })
        .catch(() => {
            console.log("findAllLoginuser failed")
            callback([])
        })
}

//ログインユーザのaccountIdにより検索する
//成功したらcallbackを呼び出す
function findByAccId(accountId,callback){
    axios.get('/api/loginuser/' + accountId)
        .then((result) => {
            callback(result.data)
        })
        .catch(() => {
            console.log("findByAccId failed")
            callback([])
        })
}

//ログインユーザ更新　※未利用
//objを更新し、成功したらcallbackを呼び出す
function updateLoginuser(obj, callback){
    axios.put('/api/loginuser', obj)
        .then(() => {
            callback()
        })
        .catch(() => {
            console.log("updateLoginuser failed")
        })
}

//ログインユーザ削除　※未利用
//ログインユーザのaccountIdにより、objを削除し、成功したらcallbackを呼び出す
function deleteByAccId(obj, callback){
    axios.delete('/api/loginuser/' + obj.accountId)
        .then(() => {
            callback()
        })
        .catch(() => {
            console.log("deleteById failed") 
        })
}

//上記ファンクションをexportする
export {
    insertLoginuser,  //新規
    findAllLoginuser, //全量検索
    findByAccId,      //ＩＤより検索
    updateLoginuser,  //更新
    deleteByAccId     //削除
}