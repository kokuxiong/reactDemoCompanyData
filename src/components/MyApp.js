import React,{useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './NavBar'
import List from './List'
import Infomation from './Infomation'
import RegisterUpdate from './RegisterUpdate'
import Login from './Login'
import useCommon from '../hooks/useCommon'
import LoginUserRegister from './LoginUserRegister'
import Background from '../assets/image/background.jpg';

export default function MyApp(){

    //ログインステータスＳｔａｔｅ
    const [login, setLogin] = useState(false)
    //navbarで「登録」、「ログインへ」を表示する制御
    const [navbarpath, setNavbarpath] = useState('login') 
    //社員情報関連
    const { emplist, setEmplist, findAllEmp, insertEmp, updateEmp, deleteEmp } = useCommon()

    //ログイン処理
    //opt: true->ログイン成功 false->ログイン失敗
    function doLogin(opt, callback){
        //ログイン状況をＳｔａｔｅへ反映
        setLogin(opt)
        //ログイン成功、かつcallback関数ある場合、callback関数をよびだす。
        if(opt && callback){
            callback()
        }
    }

    //社員新規登録
    function insertEmpinfo(obj, callback) {
        insertEmp(obj, () => {
            callback()
        })
    }

    //社員更新
    function updateEmpinfo(obj, callback) {
        updateEmp(obj, () => {
            callback()
        })
    }

    //社員削除処理
    function deleteEmpinfo(obj) {
        // console.log("deleteEmpinfo")
        deleteEmp(obj)
    }

    //検索バーで入力内容により、検索処理
    function doSearch(para) {
        // console.log(para)
        //未入力の場合、全量検索
        if(!para){
            findAllEmp()
        }else{
            //入力内容により、フィルタ処理　※ＤＢは検索しない
            let targetList = emplist.filter(element => element.name.indexOf(para) > -1)
            //フィルタ結果をstateへ更新し、子コンポをre-renderさせる
            setEmplist(targetList)
        }
    }

    //-----------------------------------------------------------------
    //全画面でenterキーを使えないようにする(copy internet)
    document.onkeydown = function(event) {  
        var target, code, tag;  
        if (!event) {  
            event = window.event; //针对ie浏览器  
            target = event.srcElement;  
            code = event.keyCode;  
            if (code == 13) {  
                tag = target.tagName;  
                if (tag == "TEXTAREA") { return true; }  
                else { return false; }  
            }  
        }  
        else {  
            target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
            code = event.keyCode;  
            if (code == 13) {  
                tag = target.tagName;  
                if (tag == "INPUT") { return false; }  
                else { return true; }   
            }  
        }  
    };
    //-----------------------------------------------------------------
    //-----------------------------------------------------------------

    return(
        <div style={{ backgroundImage: `url(${Background})`, height:550 }}>
            <NavBar doLogin={doLogin} login={login} navbarpath={navbarpath}/>
            <Router>
                <div>
                    <Switch>
                            <Route exact path="/"><Login setNavbarpath={setNavbarpath} doLogin={doLogin}/></Route>
                            <Route exact path="/loginuserRegister"><LoginUserRegister setNavbarpath={setNavbarpath}/></Route>
                            <Route path="/list">
                                {login ? <List doSearch={doSearch} emplist={emplist} deleteEmpinfo={deleteEmpinfo}/> : (
                                    <Redirect to={{
                                        pathname: "/"
                                    }} /> 
                                )} 
                            </Route>
                            <Route path="/infomation/:cmpCd">
                                {login ? <Infomation/> : (
                                    <Redirect to={{
                                        pathname: "/"
                                    }} /> 
                                )}
                            </Route>
                            <Route path="/registerUpdate/:cmpCd?">
                                {login ? <RegisterUpdate insertEmpinfo={insertEmpinfo} updateEmpinfo={updateEmpinfo}/> : (
                                    <Redirect to={{
                                        pathname: "/"
                                    }} /> 
                                )}
                            </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )

}