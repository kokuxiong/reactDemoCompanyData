import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { Button, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap'
import useCommon from '../hooks/useCommon'
import { doCheck6LetterOrNum } from '../services/util'


var timeCount = null


/** TODO
 *      名前:中国語、日本語、英語のみ使えます。
 *      性別:必須選択のこと エラーメッセージ出す
 *      国籍:必須選択のこと エラーメッセージ出す
 *      データベースの操作が失敗する場合は、画面に「ＳＱＬ実行例外が発生しました。」のメッセージを表示する。
 */

export default function RegisterUpdate(props){

    //社員新規登録か、編集かフラグ
    //true: insert , false: update
    const [flag, setFlag] = useState(true)// default:新規
    //社員コード
    const [cmpCdInput, setCmpCdInput] = useState('')
    //社員コードチェックフラグ
    const [cmpCdInputCheck, setCmpCdInputCheck] = useState(true) //６桁英数字入力するフラグ（必須入力チェック含む）
    const [cmpCdInputCheck2, setCmpCdInputCheck2] = useState(false) //既に存在しているフラグ
    //名前
    const [name, setName] = useState('')
    const [nameInputCheck, setNameInputCheck] = useState(true) //必須入力フラグ
    //性別
    const [sexCd, setSexCd] = useState('01') //TODO check
    //生年月日
    const [birthday, setBirthday] = useState('1990-10-01')
    const [birthdayInputCheck, setBirthdayInputCheck] = useState(true)　//必須入力フラグ
    //国籍
    const [countryCd, setCountryCd] = useState('001') //TODO check
    //hisitory
    const history = useHistory()

    //編集の場合、パスパラメータからcmpCdを取得
    let params = useParams()
    let cmpCd = params.cmpCd

    //編集の場合の社員情報検索処理と新規登録の場合のＩＤ重複チェック処理
    const { findEmpByCmpCd, doCheckDoubleEmp } = useCommon(false)

    //初期化処理
    useEffect(() => {
        //編集の場合、当該社員情報を検索
        if(cmpCd){
            //フラグを編集にする
            setFlag(false)
            //当該社員情報を検索し、画面へ表示する
            findEmpByCmpCd(cmpCd, (data) => {
                setCmpCdInput(data.cmpCd)
                setName(data.name)
                setSexCd(data.sexCd)
                setBirthday(data.birthday.slice(0, 10))
                setCountryCd(data.countryCd)
            })
        }
        
    },[])

    //画面で入力した社員コードを随時stateへ反映し、かつチェックする
    function updateCmpCd(e){
        setCmpCdInput(e.target.value) 
        //e.target.valueを退避する
        let tempValue = e.target.value
        //入力ある場合
        if(tempValue){
            //-------------------------debounce------------------
            //カンター処理をクリア
            clearTimeout(timeCount)
            //カンター処理再開
            timeCount = setTimeout(() => {
                // console.log("time out run")
                doCheck6LetterOrNum(tempValue) ? setCmpCdInputCheck(true) : setCmpCdInputCheck(false)
                doCheckDoubleEmp(tempValue, (result) => {
                    result ? setCmpCdInputCheck2(true) : setCmpCdInputCheck2(false)
                })
            }, 500)
            //-----------------------------------------------------
        }else{
            //入力した内容を削除した場合
            //カンターを削除
            clearTimeout(timeCount)
            //エラーメッセージを消す
            setCmpCdInputCheck(true)
            setCmpCdInputCheck2(false)
        }
    }

    //画面で入力した社員nameを随時stateへ反映
    function updateName(e){
        setName(e.target.value)
        //nameを弄ると、エラーメッセージを消す
        if(!nameInputCheck){
            setNameInputCheck(true)
        }
    }

    //画面で入力した社員sexを随時stateへ反映
    function updateSexCd(e){
        setSexCd(e.target.value)
    }

    //画面で入力した社員birthdayを随時stateへ反映
    function updateBirthday(e){
        setBirthday(e.target.value)
        //birthdayを弄ると、エラーメッセージを消す
        if(e.target.value){
            if(!birthdayInputCheck){
                setBirthdayInputCheck(true)
            }
        }else{
            setBirthdayInputCheck(false)
        }
        
    }

    //画面で入力した社員国籍を随時stateへ反映
    function updateCountryCd(e){
        setCountryCd(e.target.value)
    }

    //name必須入力チェック
    function doCheckName() {
        name.length > 0 ? setNameInputCheck(true) : setNameInputCheck(false)
    }

    //確定ボタンを非アクティブにするかチェック
    function doActive() {
        //画面で入力した内容は不正の場合、非アクティブにする
        if(cmpCdInput.length != 6 || name.length < 1 || !birthday){
            return true
        }
        //ＩＤが既に存在している場合、非アクティブにする
        if(cmpCdInputCheck2){
            return true
        }
        //上記以外はアクティブにする
        return false
    }

    //更新or登録処理
    function doUpdate(){
        //register or update
        let tempObj = {}
        tempObj.cmpCd = cmpCdInput
        tempObj.name = name
        tempObj.sexCd = sexCd
        tempObj.birthday = birthday
        tempObj.countryCd = countryCd
        //画面で入力した内容が全部ＯＫの場合、処理を実行
        if(cmpCdInput.length == 6 && !cmpCdInputCheck2 && name && sexCd && birthday && countryCd){
            //更新処理
            if(cmpCd){
                props.updateEmpinfo(tempObj, () => {
                    history.push('/list') //更新成功⇒社員リスト画面へ遷移
                })
            }else{ //新規登録処理
                props.insertEmpinfo(tempObj, () => {
                    history.push('/list') //登録成功⇒社員リスト画面へ遷移
                })
            }
        }
    }

    return(
        <div style={{paddingLeft:300,paddingRight:300}}>
            <Container>
                <h5>社員基本情報登録画面</h5><br/>
                <Form>
                    <FormGroup>
                        <Label for="cmpCd">社員番号</Label>
                        <Input type="text" name="cmpCd" id="cmpCd" value={cmpCdInput} 
                            onChange={updateCmpCd}
                            placeholder="６桁英数字を入力してください" disabled={flag ? '' : 'disabled'}/>
                        <Alert color="danger" isOpen={!cmpCdInputCheck}>
                            ６桁英数字を入力してください。
                        </Alert>
                        <Alert color="danger" isOpen={cmpCdInputCheck2}>
                            当該社員ＩＤはすでに存在しています。
                        </Alert>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">名前</Label>
                        <Input type="text" name="name" id="name" value={name} 
                            onChange={updateName} onBlur={doCheckName}  placeholder="名前を入力してください"/>
                        <Alert color="danger" isOpen={!nameInputCheck}>
                            名前を入力してください。
                        </Alert>
                    </FormGroup>
                    <FormGroup check row>
                        {/* <Label for="">性別</Label> */}
                        <legend className="col-form-label">性別</legend>
                        <FormGroup check inline>
                            <Label check for="sexCd1">
                                <Input type="radio" name="sexCd" value="01" id="sexCd1" 
                                    onChange={updateSexCd} checked={sexCd == '01'} />男
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check for="sexCd2">
                                <Input type="radio" name="sexCd" value="02" id="sexCd2" 
                                    onChange={updateSexCd} checked={sexCd == '02'} />女
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <Label for="birthday">生年月日</Label>
                        <Input type="date" name="birthday" id="birthday" value={birthday} 
                            onChange={updateBirthday} />
                        <Alert color="danger" isOpen={!birthdayInputCheck}>
                            生年月日を選択してください。
                        </Alert>
                    </FormGroup>
                    <FormGroup>
                        <Label for="countryCd">国籍</Label>
                        <Input type="select" name="countryCd" id="countryCd" value={countryCd} onChange={updateCountryCd}>
                            <option value="001">中国</option>
                            <option value="002">日本</option>
                            <option value="003">韓国</option>
                        </Input>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <Button color="primary" onClick={doUpdate} disabled={doActive() ? 'disabled' : ''}>確定</Button>
                        <Button color="secondary" onClick={() => history.push('/list')} >戻る</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )

}