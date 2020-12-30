import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import { Button, Col, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import useCommon from '../hooks/useCommon'
import { getCountryName } from '../services/util'
import { useTranslation } from 'react-i18next';

export default function Infomation(){

    //画面表示項目
    const [cmpCdInput, setCmpCdInput] = useState('')
    const [name, setName] = useState('')
    const [sexCd, setSexCd] = useState('01')
    const [birthday, setBirthday] = useState('1990-10-01')
    const [countryCd, setCountryCd] = useState('001')
    //historyを利用し、画面遷移する
    const history = useHistory()
    //パスからパラメータ取得、新規か編集かを判定用
    let { cmpCd } = useParams()
    //社員コードにより社員情報検索処理を取得
    const { findEmpByCmpCd } = useCommon(false)
    //i18n処理
    const { t } = useTranslation();

    //初期化処理
    useEffect(() => {
        //当該社員情報をＤＢから検索し、画面へ表示する
        if(cmpCd){
            findEmpByCmpCd(cmpCd, (data) => {
                setCmpCdInput(data.cmpCd)
                setName(data.name)
                setSexCd(data.sexCd)
                setBirthday(data.birthday.slice(0, 10))
                setCountryCd(data.countryCd)
            })
        } 
    },[])

    return(
        <div>
            <Container>
                <h3 style={{textAlign:'center'}}>{t('infomation.title')}</h3><br/><br/>
                <Form>
                    <FormGroup row style={{justifyContent: 'center'}}>
                        <Label for="cmpCd" sm={2}>{t('list.thead.id')}</Label>
                        <Col sm={4}>
                            <Input type="text" id="cmpCd" value={cmpCdInput} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{justifyContent: 'center'}}>
                        <Label for="name" sm={2}>{t('list.thead.name')}</Label>
                        <Col sm={4}>
                            <Input type="text" id="name" value={name} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{justifyContent: 'center'}}>
                        <Label for="sexCd" sm={2}>{t('list.thead.sex')}</Label>
                        <Col sm={4}>
                            <Input type="text" id="sexCd" value={sexCd == '01' ? '男' : '女'} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{justifyContent: 'center'}}>
                        <Label for="birthday" sm={2}>{t('list.thead.birth')}</Label>
                        <Col sm={4}>
                            <Input type="date" id="birthday" value={birthday} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{justifyContent: 'center'}}>
                        <Label for="countryCd" sm={2}>{t('list.thead.country')}</Label>
                        <Col sm={4}>
                            <Input type="text" id="countryCd" value={getCountryName(countryCd)} disabled/>
                        </Col>
                    </FormGroup>
                    <br/>
                    <br/>
                    <br/>
                    <FormGroup row  style={{justifyContent: 'center'}}>
                        <Button color="secondary" onClick={() => history.push('/list')} >{t('infomation.cancel')}</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )

}