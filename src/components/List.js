import React, { useState } from 'react'
import { Button, ButtonGroup, Container, Table, NavLink, Form, FormGroup, Input, Label, Col, Badge  } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { getCountryName } from '../services/util'

/** TODO
 *      社員情報削除確認画面に遷移する　※社員情報削除確認画面基本設計がない？
 *      「メニュー画面」ボタン　※画面にない？
 */

export default function List(props){

    //検索バーで入力した内容
    const [target, setTarget] = useState('')
    //historyを利用し、画面遷移する
    const history = useHistory()
    //すべての社員情報をpropsから取得
    let empinfos = props.emplist

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
        let result = window.confirm(`本当に社員「${empinfo.name}」を削除してよろしいでしょうか`)
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
                        <Button size="sm" color="primary" onClick={() => history.push('/registerUpdate/' + empinfo.cmpCd)} >編集</Button>
                        <Button size="sm" color="danger" onClick={() => doDelete(empinfo)}>削除</Button>
                        {/* <Button size="sm" color="danger" onClick={() => history.push('/delete/' + empinfo.cmpCd)}>削除</Button> */}
                    </ButtonGroup>
                </td>
            </tr>
        )
    })

    return (
            <div>
                <Container className="themed-container" fluid>
                    <div className="float-right">
                        <Button color="success" onClick={() => history.push('/registerUpdate/')}>新規社員登録</Button>
                    </div>
                    <h3>社員基本情報一覧画面</h3><br/><br/>
                    <Form>
                        <FormGroup row>
                            <Label for="cmpSearch" sm={2}>社員検索</Label>
                            <Col sm={4}>
                            <Input type="text" name="cmpSearch" id="cmpSearch" value={target} onChange={updateTarget}
                                placeholder="名前を入力してください"/>
                            </Col>
                            <Button color="primary" sm={2} onClick={() => {props.doSearch(target)}} disabled={target.length > 0 ? false : true}>検索</Button>
                            <Button color="secondary" sm={2} onClick={doClear} disabled={target.length > 0 ? false : true}>クリア</Button>
                        </FormGroup>
                    </Form>
                    {/* <Table striped className="mt-4"> */}
                    <Table dark className="mt-4">
                        <thead>
                            <tr>
                                <th width="10%">社員番号</th>
                                <th width="10%">名前</th>
                                <th width="10%">性別</th>
                                <th width="10%">生年月日</th>
                                <th width="10%">国籍</th>
                                <th width="10%">操作</th>
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