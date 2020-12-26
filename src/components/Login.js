import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, Form, FormGroup, Input, Label, Col, Alert } from 'reactstrap'
import useCommon from '../hooks/useCommon'


/** TODO
 *      メールアドレスチェック処理
 *      6桁半角英数字のパスワードチェック処理
 * 
 */

export default function Login(props){

    //hitoryを利用し、画面へ遷移する
    let history = useHistory()
    //画面で入力したＩＤとパスワードstate
    const [accountId, setAccountId] = useState('')
    const [password, setPassword] = useState('')
    //alertを表示するかフラグ
    const [visible, setVisible] = useState(false) //ＩＤ必須入力フラグ
    const [visible2, setVisible2] = useState(false) //パスワード必須入力フラグ
    const [visible3, setVisible3] = useState(false) //ＩＤ　または　パスワード不正フラグ
    const [visible3sub, setVisible3sub] = useState('') //具体的にＩＤか、それともパスワードが不正かフラグ
    //ログインユーザを検索処理
    const { findLoginuserByAccId } = useCommon(false)
    //navbarで「登録」を表示するようにする
    props.setNavbarpath('login')

    //画面で入力したＩＤを随時stateへ反映
    function updateAccountId(e){
        setAccountId(e.target.value)
        //画面ＩＤを弄ると、エラーメッセージを消す
        if(visible){
            setVisible(false)
        }
        //画面ＩＤを弄ると、エラーメッセージを消す
        if(visible3){
            setVisible3(false)
        }
    }
    //画面で入力したパスワードを随時stateへ反映
    function updatePassword(e){
        setPassword(e.target.value)
        //パスワードを弄ると、エラーメッセージを消す
        if(visible2){
            setVisible2(false)
        }
        //パスワードを弄ると、エラーメッセージを消す
        if(visible3){
            setVisible3(false)
        }
    }
    //ログイン処理
    function doLogin(){
        //ＩＤ未入力の場合、エラーメッセージ出す
        if(!accountId){
            // console.log("accountID must be inputed")
            setVisible(true)
        }
        //パスワード未入力の場合、エラーメッセージ出す
        if(!password){
            // console.log("password must be inputed")
            setVisible2(true)
        }
        //ＩＤ、パスワード⇒どちらか未入力の場合、なにもしない
        if(!accountId || !password){
            return
        }
        //ログインユーザ情報を検索処理
        findLoginuserByAccId(accountId, (data) => {
            //ＩＤとパスワード両方一致の場合、ログイン成功
            if(data.accountId === accountId && data.password === password){
                //state更新
                props.doLogin(true)
                //社員リストへ遷移
                history.push('/list')
            }else{
                // console.log("accountID or password not right")
                //エラーメッセージ出す
                setVisible3(true)
                //state更新
                props.doLogin(false)
                //具体的にどっちが間違ってるかを画面へ表示する
                data.accountId === accountId ? setVisible3sub('pwd') : setVisible3sub('id')
            }
        })
    }

    return(
    <div style={{textAlign:'center'}}>
        <Container>
            <h5 style={{paddingLeft:'auto',paddingRight:270}}>社員管理システムログイン画面</h5><br/><br/>
            <Form >
                <FormGroup row style={{justifyContent: 'center'}}>
                    <Label for="username" sm={2}>ユーザＩＤ</Label>
                    <Col sm={4}>
                        <Input type="text" name="username" id="username" 
                            onChange={updateAccountId} placeholder="ログインユーザＩＤ"/>
                    </Col>
                    <Col sm={4}>
                        <Alert color="danger" isOpen={visible} style={{height:38,paddingTop:5,paddingBottom:0,marginBottom:0}}>
                            ログインユーザＩＤは必須入力です。
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
                            パスワードは必須入力です。
                        </Alert>
                    </Col>
                </FormGroup> 
                <FormGroup row style={{justifyContent: 'center'}}>
                    <Col sm={6}>
                        <Alert color="danger" isOpen={visible3} style={{width:350}}>
                            {visible3sub == 'id' ? 'ユーザＩＤが存在しません！' : 'パスワードが不正です！'}
                        </Alert>
                    </Col>
                </FormGroup>
                <br/>
                <FormGroup style={{justifyContent: 'center'}}>
                    <Col sm={10}><Button color="primary" onClick={doLogin} >ログイン</Button></Col>
                </FormGroup>
            </Form>
        </Container>
    </div>
    )

}