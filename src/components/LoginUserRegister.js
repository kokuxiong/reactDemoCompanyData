import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Form, FormGroup, Input, Label, Col, Alert } from 'reactstrap'
import useCommon from '../hooks/useCommon'
import { doCheck6LetterOrNum } from '../services/util'

export default function LoginUserRegister(props){

    //historyを利用し画面遷移する
    let history = useHistory()
    //画面で入力したＩＤとパスワードstate
    const [accountId, setAccountId] = useState('')
    const [password, setPassword] = useState('')
    //画面へエラーメッセージを出すフラグ
    const [visible, setVisible] = useState(false) //ＩＤ必須入力フラグ
    const [visible2, setVisible2] = useState(false) //パスワードに不正ありフラグ
    const [visible2sub, setVisible2sub] = useState(false) //パスワードは未入力かor６桁英数字以外かフラグ
    const [visible3, setVisible3] = useState(false) //ＩＤ存在フラグ
    const [visible4, setVisible4] = useState(false) //登録成功、画面遷移提示フラグ
    const [time3, setTime3] = useState(3) //登録成功の場合、3秒後画面をログインへ遷移する
    //ログインユーザ登録処理と検索処理
    const { loginUserRegister, findLoginuserByAccId } = useCommon(false)

    //navbarで「ログインへ」を表示する
    // props.setNavbarpath('register')
    useEffect(() => {
        props.setNavbarpath('register')
    },[])

    //画面で入力したＩＤを随時stateへ
    function updateAccountId(e){
        setAccountId(e.target.value)
        //ＩＤを弄ると、エラーメッセージを消す
        if(visible){
            setVisible(false)
            setVisible2sub(false)
        }
        //ＩＤを弄ると、エラーメッセージを消す
        if(visible3){
            setVisible3(false)
        }
    }
    //画面で入力したパスワードを随時stateへ
    function updatePassword(e){
        setPassword(e.target.value)
        //パスワードを弄ると、エラーメッセージを消す
        if(visible2){
            setVisible2(false)
            setVisible2sub(false)
        }
        //パスワードを弄ると、エラーメッセージを消す
        if(visible3){
            setVisible3(false)
        }
    }

    //登録処理
    function doRegister(){
        //ＩＤ未入力の場合、エラーメッセージ出す
        if(!accountId){
            // alert("accountID must be inputed")
            setVisible(true)
        }
        //パスワード未入力の場合、エラーメッセージ出す
        if(!password){
            // alert("password must be inputed")
            setVisible2(true)
        }
        //どちらか未入力の場合、なにもしない
        if(!accountId || !password){
            // alert('未入力項目がありますので、ご確認ください。')
            return
        }
        //パスワード６桁英数字チェック、６桁英数字以外の場合、エラーメッセージ出す
        if(!doCheck6LetterOrNum(password)){
            setVisible2(true)
            setVisible2sub(true)
            return
        }
        //ＩＤが重複してるかチェック
        findLoginuserByAccId(accountId, (data) => {
            //ＩＤが重複したら、エラーメッセージ出す
            if(data.accountId == accountId){
                // alert("double user")
                setVisible3(true)
            }else{
                //重複してないなら、登録する
                let tempObj = {}
                tempObj.accountId = accountId
                tempObj.password = password
                loginUserRegister(tempObj, () => {
                    // history.push('/')
                    // alert("登録成功です。３秒後ログイン画面へ自動遷移いたします。")
                    //３秒後遷移するよ　をユーザへ提示するメッセージ出す
                    setVisible4(true)
                    let time = 3
                    let timeCount3 = setInterval(() => {
                        setTime3(time--)
                        if(time == 0){
                            setTimeout(() => {
                                history.push('/')
                                clearInterval(timeCount3)
                            }, 1000);
                        }
                    }, 1000);
                })
            }
        })
    }

    return(
    <div style={{textAlign:'center'}}>
        <Container>
            <h5 style={{paddingLeft:'auto',paddingRight:270}}>ログインユーザ登録画面</h5><br/><br/>
            <Form >
                <FormGroup row style={{justifyContent: 'center'}}>
                    <Label for="username" sm={2}>ユーザＩＤ</Label>
                    <Col sm={4}>
                        <Input type="text" name="username" id="username" 
                            onChange={updateAccountId} placeholder="ログインユーザＩＤ"/>
                    </Col>
                    <Col sm={4}>
                        <Alert color="danger" isOpen={visible} style={{height:38,paddingTop:5,paddingBottom:0,marginBottom:0}}>
                            必須入力です。
                        </Alert>
                    </Col>
                </FormGroup>
                <FormGroup row style={{justifyContent: 'center'}}>
                    <Label for="password" sm={2}>パスワード</Label>
                    <Col sm={4}>
                        <Input type="password" name="password" id="password" 
                            onChange={updatePassword} placeholder="パスワード"/>
                    </Col>
                    <Col sm={4}>
                        <Alert color="danger" isOpen={visible2} style={{height:38,paddingTop:5,paddingBottom:0,marginBottom:0}}>
                            {visible2sub ? '６桁英数字を入力してください。' : '必須入力です。'}
                        </Alert>
                    </Col>
                </FormGroup> 
                <FormGroup row style={{justifyContent: 'center'}}>
                    <Col sm={6}>
                        <Alert color="danger" isOpen={visible3} style={{width:350}}>
                            ユーザＩＤは既に存在しています。
                        </Alert>
                        <Alert color="danger" isOpen={visible4} style={{width:350}}>
                            {`新規登録成功、あと${time3}秒でログイン画面へ自動遷移します。`}
                        </Alert>
                    </Col>
                </FormGroup> 
                <br/>
                <FormGroup style={{justifyContent: 'center'}}>
                    <Col sm={10}><Button color="primary" onClick={doRegister} >登録</Button></Col>
                </FormGroup>
            </Form>
        </Container>
    </div>
    )

}