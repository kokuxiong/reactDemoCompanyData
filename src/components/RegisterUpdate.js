import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import useCommon from '../hooks/useCommon'
import { useForm, Controller } from 'react-hook-form'

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
    //名前
    const [name, setName] = useState('')
    //性別
    const [sexCd, setSexCd] = useState('01') //TODO check
    //生年月日
    const [birthday, setBirthday] = useState('')
    //国籍
    const [countryCd, setCountryCd] = useState('001') //TODO check
    //hisitory
    const history = useHistory()

    //編集の場合、パスパラメータからcmpCdを取得
    let params = useParams()
    let cmpCd = params.cmpCd

    //編集の場合の社員情報検索処理と新規登録の場合のＩＤ重複チェック処理
    const { findEmpByCmpCd, doCheckDoubleEmp } = useCommon(false)

    //
    const { errors, handleSubmit, control, setValue } = useForm({
        mode: "onSubmit",
        defaultValues:{
            cmpCd: '',
            name: '',
            birthday: '1990-10-01'
        }
    })

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
                setValue('cmpCd', data.cmpCd)
                setValue('name', data.name)
            })
        }
        
    },[])

    //画面で入力した社員コードを随時stateへ反映し、かつチェックする
    function updateCmpCd(e){
        console.log("update CmpCd " + e.target.value)
        setCmpCdInput(e.target.value) 
    }

    //画面で入力した社員nameを随時stateへ反映
    function updateName(e){
        console.log("update name " + e.target.value)
        setName(e.target.value)
    }

    //画面で入力した社員sexを随時stateへ反映
    function updateSexCd(e){
        setSexCd(e.target.value)
    }

    //画面で入力した社員birthdayを随時stateへ反映
    function updateBirthday(e){
        setBirthday(e.target.value)
    }

    //画面で入力した社員国籍を随時stateへ反映
    function updateCountryCd(e){
        setCountryCd(e.target.value)
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
        console.log(name)
        //画面で入力した内容が全部ＯＫの場合、処理を実行
        if(cmpCdInput.length == 6 && name && sexCd && birthday && countryCd){
            console.log("update called")
            //更新処理
            if(cmpCd){
                props.updateEmpinfo(tempObj, () => {
                    console.log("update success")
                    history.push('/list') //更新成功⇒社員リスト画面へ遷移
                })
            }else{ //新規登録処理
                doCheckDoubleEmp(cmpCdInput).then((result) => {
                    if(!result){
                        props.insertEmpinfo(tempObj, () => {
                            history.push('/list') //登録成功⇒社員リスト画面へ遷移
                        })
                    }else{
                        alert("既存ＩＤです")
                    }
                })
            }
        }else{
            alert("入力ミスある")
        }
    }

    return(
        <div style={{paddingLeft:300,paddingRight:300}}>
            <Container>
                <h5>社員基本情報登録画面</h5><br/>
                <Form onSubmit={handleSubmit(doUpdate)}>
                    <FormGroup>
                        <Label for="cmpCd">社員番号</Label>
                        {/* React Hook Form优先采用非受控组件和原生的输入组件，第三方受控组件需要使用controller
                            controller的用法介绍请参照官网 */}
                        <Controller 
                            control= {control} //使用useForm时必须，使用FormContext时可选
                            name='cmpCd' //必须，输入组件唯一的名称
                            rules={ //与register格式一致的校验规则
                                {
                                    required: true,
                                    maxLength: 6,
                                    minLength: 6,
                                    validate: {
                                        //可写同步校验，可写异步校验
                                        asyncValidate: async value => { //返回true不触发error，返回false触发error
                                            if(cmpCd){ //更改时一律不触发该错误
                                                return true
                                            }else{
                                                let result = await doCheckDoubleEmp(value)
                                                return result === false
                                            }
                                            
                                        }
                                    }
                                }
                            }
                            //返回React元素并将事件和值附加到组件中的函数
                            //这很容易与带有非标准属性名称的外部受控组件集成，为子组件提供onChange，onBlur和value属性
                            //注意 下个版本弃用as了，所以尽量用render不要用as
                            render={(props) => (
                                <Input onChange={　
                                    (value) => {
                                        props.onChange(value)
                                        updateCmpCd(value) //自定义onChange事件的写法
                                    }
                                }
                                value={props.value}
                                placeholder="６桁英数字を入力してください" 
                                disabled={flag ? false : true}
                                type='text'
                                id='cmpCd'
                                name='cmpCd'
                            />)
                            }
                        />
                        {errors.cmpCd?.type === "required" && <span style={{color:"red"}}>必須入力です。</span>}
                        {errors.cmpCd?.type === "maxLength" && <span style={{color:"red"}}>６桁英数字を入力してください。</span>}
                        {errors.cmpCd?.type === "minLength" && <span style={{color:"red"}}>６桁英数字を入力してください。</span>}
                        {errors.cmpCd?.type === "asyncValidate" && <span style={{color:"red"}}>既存社員ＩＤです。</span>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">名前</Label>
                        <Controller 
                            control= {control}
                            name='name'
                            rules={{ required: true }}
                            render={(props) => (
                                <Input onChange={
                                    (value) => {
                                        props.onChange(value)
                                        updateName(value)
                                    }
                                }
                                value={props.value}
                                placeholder="名前を入力してください" 
                                name='name'
                                type='text'
                                id='name'
                            />)
                            }
                        />
                        {errors.name?.type === "required" && <span style={{color:"red"}}>必須入力です。</span>}
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
                        {/* <Input type="date" name="birthday" id="birthday" value={birthday} 
                            onChange={updateBirthday} /> */}
                        <Controller 
                            control= {control}
                            name='birthday'
                            rules={{ required: true }}
                            render={(props) => (
                                <Input onChange={
                                    (value) => {
                                        props.onChange(value)
                                        updateBirthday(value)
                                    }
                                }
                                value={props.value}
                                name='birthday'
                                type='date'
                                id='birthday'
                            />)
                            }
                        />
                        {errors.birthday?.type === "required" && <span style={{color:"red"}}>必須入力です。</span>}
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
                        {/* <Button color="primary" onClick={doUpdate}>確定</Button> */}
                        <Button color="primary" type="submit">確定</Button>
                        <Button color="secondary" onClick={() => history.push('/list')} >戻る</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )

}