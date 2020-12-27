import {useEffect, useState} from 'react'
import {insertEmpinfo, findAllEmpinfo, findByCmpCd, updateEmpinfo, deleteByCmpCd } from '../services/empinfoDAO'
import { insertLoginuser, findByAccId } from '../services/loginuserDAO'

export default　function useCommon(opt){

    //社員情報リスト
    const [emplist, setEmplist] = useState([])

    //初期化処理
    useEffect(() => {
        //すべての社員情報を検索する
        if(opt != false){ //optがfalseの場合、社員情報検索しない、じゃないとuseCommonを呼び出すたびに検索処理が実行される
            findAllEmpinfo((data) => {
                //検索成功の場合、stateを更新
                setEmplist(data)
                //テスト用
                console.log(data)
            })
        }
    },[]) //一回のみ実行するため、第二パラメータに[]を渡す

    //社員情報全量検索
    function findAllEmp() {
        findAllEmpinfo((data) => {
            //検索成功の場合、stateを更新
            setEmplist(data)
        })
    }

    //社員情報新規登録
    function insertEmp(obj, callback){
        //実際の登録処理
        insertEmpinfo(obj, ()=>{
            //登録でき次第、すべてのレコードを再検索する
            findAllEmpinfo((data) => {
                //state更新
                setEmplist(data)
                //callback呼び出す
                callback()
            })
        })
    }

    //社員cmpCdにより、社員情報を検索する
    function findEmpByCmpCd(cmpCd, callback){
        //実際の検索処理
        findByCmpCd(cmpCd, (data)=>{
            //検索結果をcallbackとして返却
            callback(data)
        })
    }

    //指定された社員情報（obj）を更新する 
    function updateEmp(obj, callback){
        //実際の更新処理
        updateEmpinfo(obj, ()=>{
            //すべてのレコードを検索する
            findAllEmpinfo((data) => {
                //state更新
                setEmplist(data)
                //callback呼び出す
                callback()
            })
        })
    }

    //指定された社員情報を削除する
    function deleteEmp(obj){
        //実際の削除処理
        deleteByCmpCd(obj, ()=>{
            //すべてのレコードを検索する
            findAllEmpinfo((data) => {
                //state更新
                setEmplist(data)
            })
        })
    }

    //社員番号すでに存在してるかをチェックする
    function doCheckDoubleEmp(cmpCd) {
        return new Promise((resolve, reject) => {
            console.log("doCheckDoubleEmp")
            //実際の検索処理
            findByCmpCd(cmpCd, (data)=>{
                console.log("data.name" + data.name)
                //検索結果返却
                data.name ? resolve(true) : resolve(false)
            })
        })
        
    }

    //ログインユーザのaccountIdにより、ログインユーザを検索する
    //ログイン処理ユーザチェック用
    function findLoginuserByAccId(accId, callback) {
        findByAccId(accId, (data) => {
            //検索結果をcallbackとして返却
            callback(data)
        })
    }

    //ログインユーザ新規登録処理
    //insert loginuser
    function loginUserRegister(obj, callback) {
        insertLoginuser(obj,() => {
            callback()
        })
    }
    
    return { 
        emplist,                  //社員情報リスト
        setEmplist,               //社員情報リストをstateへ更新
        findAllEmp,               //すべての社員情報を検索する
        insertEmp,                //社員を新規登録する
        findEmpByCmpCd,           //社員コードにより、社員情報を検索する
        updateEmp,                //社員情報を更新する
        deleteEmp,                //社員を削除する
        doCheckDoubleEmp,         //新規登録したい社員コードが既に存在しているかをチェック処理
        loginUserRegister,        //ログインユーザを新規登録したい
        findLoginuserByAccId      //ログインユーザＩＤにより、ログインユーザを検索する 
    }
}