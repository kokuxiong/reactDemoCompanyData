import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container } from 'reactstrap'
import useCommon from '../hooks/useCommon'
import { AvForm, AvField,} from 'availity-reactstrap-validation';
import { doCheck6LetterOrNum } from '../services/util'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// import debounce from 'locash/debounce'
var debounce = require('lodash.debounce')
var timeout = null  //accountId利用
var timeout2 = null //password利用

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
    //ログインユーザを検索処理
    const { findLoginuserByAccId } = useCommon(false)

    const { t, i18n } = useTranslation();

    //画面で入力したＩＤを随時stateへ反映
    function updateAccountId(e){
        setAccountId(e.target.value)
    }
    //画面で入力したパスワードを随時stateへ反映
    function updatePassword(e){
        setPassword(e.target.value)
    }
    //ログイン処理
    function doLogin(){
        //ＩＤ、パスワード⇒どちらか未入力の場合、なにもしない
        if(!accountId || !password){
            alert('入力ミスあり')
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
                //state更新
                alert("パスワード不正です。")
                props.doLogin(false)
            }
        })
    }

    //async validation use availity reactstrap validation
    const accountIdDoubleCheck = debounce((value, ctx, input, cb) => {
        //-------------------------------------------debounce------------------------
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            //ログインユーザ情報を検索処理
            if(accountId){
                findLoginuserByAccId(accountId, (data) => {
                    //
                    if(data.accountId == accountId){
                        //エラーの場合、エラーメッセージを返却すると、エラーメッセージのカスタマイズはできる
                        cb(true)
                    }else{
                        //正常の場合、trueを返却する
                        cb('存在してないＩＤです。')
                    }
                })
            }else{
                //TODO 异步检查的时候，暂时把必须入力的检查也写在这，是否可以同时使用同步检查，待调查
                //エラーの場合、エラーメッセージを返却すると、エラーメッセージのカスタマイズはできる
                cb('ユーザＩＤは必須入力です。')
            }
        }, 500)
        //-------------------------------------------------------------------------------
    }, 100)

    //async validation use availity reactstrap validation
    const passwordCheck = debounce((value, ctx, input, cb) => {
        //-------------------------------------------debounce------------------------
        clearTimeout(timeout2)
        timeout2 = setTimeout(() => {
            //ログインユーザ情報を検索処理
            if(password){
                if(doCheck6LetterOrNum(password)){
                    findLoginuserByAccId(accountId, (data) => {
                        //
                        if(data.accountId == accountId){
                            if(data.password == password){
                                cb(true)
                            }else{
                                cb('パスワード不正')
                            }
                        }else{
                            //正常の場合、trueを返却する
                            cb('パスワード不正（ユーザＩＤ不正）')
                        }
                    })
                }else{
                    cb('６桁英数字を入力してください。')
                }
                
            }else{
                //TODO 异步检查的时候，暂时把必须入力的检查也写在这，是否可以同时使用同步检查，待调查
                //エラーの場合、エラーメッセージを返却すると、エラーメッセージのカスタマイズはできる
                cb('パスワードは必須入力です。')
            }
        }, 500)
        //-------------------------------------------------------------------------------
    }, 100)

    function doActive() {
        if(accountId && password){
            return false
        }else{
            return true
        }
    }

    return(
    <div>
        <Container style={{paddingLeft:280,paddingRight:220}}>
            {/* <h5>社員管理システムログイン画面</h5><br/><br/> */}
            <h5>{t('login.title')}</h5><br/><br/>
            <AvForm>
                {/* TODO userID要检查是否已经存在，所以使用了异步检查，但好像不能同时使用同步检查，比如必须入力，这个待调查 */}
                <AvField type="text" id="username" name="username" label={t('login.id')}
                    onChange={updateAccountId} placeholder={t('login.id-placeholder')} validate={{
                        // required: true,
                        // required: {value: true, errorMessage: 'ユーザＩＤは必須入力です2。'},
                        async: accountIdDoubleCheck //★异步验证和同步验证好像不能同时进行，待调查★
                    }} />
                <AvField type="password" id="password" name="password" label={t('login.password')}
                    onChange={updatePassword} placeholder={t('login.password-placeholder')} validate={{
                        // required: {value: true, errorMessage: 'パスワードは必須入力です。'},
                        // pattern: {value: '^[a-zA-Z0-9]{6}$', errorMessage: '６桁英数字を入力してください。'}
                        async: passwordCheck //★异步验证和同步验证好像不能同时进行，待调查★
                    }} />
                <Button color="primary" onClick={doLogin} disabled={doActive()} >{t('login.login')}</Button>
            </AvForm>
        </Container>
    </div>
    )

}