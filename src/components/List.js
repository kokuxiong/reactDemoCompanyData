import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Table, NavLink, Form, FormGroup, Input, Label, Col, Badge  } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { getCountryName } from '../services/util'
import { useTranslation } from 'react-i18next';

export default function List(props){

    //検索バーで入力した内容
    const [target, setTarget] = useState('')
    //historyを利用し、画面遷移する
    const history = useHistory()
    //すべての社員情報をpropsから取得
    let empinfos = props.emplist
    //i18n処理
    const { t } = useTranslation();

    useEffect(() => {
        //ログインステータスチェック
        props.loginStatusCheck()
    },[])

    //検索バーで入力した内容を随時stateへ更新
    function updateTarget(e) { 
        setTarget(e.target.value)
        //入力した内容を削除したら、すべての社員情報を表示する
        if(!e.target.value){
            props.doSearch('')
        }else{
            //特にしません。
        }

    }
    //検索バーの入力内容をクリアする
    function doClear() {
        setTarget('') //stateをクリア
        props.doSearch('') //全量検索
    }
    //社員削除する処理
    function doDelete(empinfo) {
        //本当に削除するかをユーザへ確認する
        let result = window.confirm(`${t('list.delete-confirm1')}${empinfo.name}${t('list.delete-confirm2')}`)
        //はいを押下する場合、削除を実行、それ以外は削除しません。
        if(result){
            props.deleteEmpinfo(empinfo)
        }
    }

    //画面表示用　社員テーブル
    const empinfoList = empinfos.map(empinfo => {
        return  (
            <tr key={empinfo.cmpCd}>
                <td>{empinfo.cmpCd}</td>
                <td><NavLink onClick={() => history.push('/infomation/' + empinfo.cmpCd)} style={{padding:0}}>{empinfo.name}</NavLink></td>
                <td>{empinfo.sexCd == '01' ? '男' : '女'}</td>
                <td>{empinfo.birthday.slice(0, 10)}</td>
                <td>{getCountryName(empinfo.countryCd)}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" onClick={() => history.push('/registerUpdate/' + empinfo.cmpCd)} >{t('list.action-update')}</Button>
                        <Button size="sm" color="danger" onClick={() => doDelete(empinfo)}>{t('list.action-delete')}</Button>
                        {/* <Button size="sm" color="danger" onClick={() => history.push('/delete/' + empinfo.cmpCd)}>削除</Button> */}
                    </ButtonGroup>
                </td>
            </tr>
        )
    })

    return (
            <div>
                {/* <Container className="themed-container" fluid> */}
                <Container>
                    <div className="float-right">
                        <Button color="success" onClick={() => history.push('/registerUpdate/')}>{t('list.create-user')}</Button>
                    </div>
                    <h3>{t('list.title')}</h3><br/><br/>
                    <Form>
                        <FormGroup row>
                            <Label for="cmpSearch" sm={2}>{t('list.search-label')}</Label>
                            <Col sm={4}>
                            <Input type="text" name="cmpSearch" id="cmpSearch" value={target} onChange={updateTarget}
                                placeholder={t('list.search-placeholder')}/>
                            </Col>
                            <Button color="primary" sm={2} onClick={() => {props.doSearch(target)}} disabled={target.length > 0 ? false : true}>{t('list.search')}</Button>
                            <Button color="secondary" sm={2} onClick={doClear} disabled={target.length > 0 ? false : true}>{t('list.clear')}</Button>
                        </FormGroup>
                    </Form>
                    {/* <Table striped className="mt-4"> */}
                    <Table dark className="mt-4">
                        <thead>
                            <tr>
                                <th width="10%">{t('list.thead.id')}</th>
                                <th width="10%">{t('list.thead.name')}</th>
                                <th width="10%">{t('list.thead.sex')}</th>
                                <th width="10%">{t('list.thead.birth')}</th>
                                <th width="10%">{t('list.thead.country')}</th>
                                <th width="10%">{t('list.thead.action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empinfoList}
                        </tbody>
                    </Table>
                </Container>
            </div>
    )
}