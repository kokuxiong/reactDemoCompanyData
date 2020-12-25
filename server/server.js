const express = require('express')
const app = express()

var bodyParser = require('body-parser')

//从正在运行的node.js应用程序确定项目根目录，
//Node有一个名为global的全局命名空间对象 - 您附加到此对象的任何内容都将在您的应用程序中随处可用
global.__basedir = __dirname
console.log("dirname:" + __dirname)
//dirname:E:\react1220\nodeReactMysql

const db = require('./config/db.config')

const Empinfo = db.Empinfo
const Loginuser = db.Loginuser
const Sex = db.Sex
const Country = db.Country

let router = require('./routers/router')

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);
// サーバを作成する
const server = app.listen(8080, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("App listening at http://%s:%s", host, port); 
})

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
    //
    Empinfo.sync().then(() => {
        const empinfos = [
            { 
                cmpCd: 'jhc001', 
                name: '李　雲鵬', 
                sexCd: '01', 
                birthday: '1990-01-12',
                countryCd: '001'
            },
            { 
                cmpCd: 'jhc002', 
                name: '馬　先生', 
                sexCd: '02', 
                birthday: '1991-11-24',
                countryCd: '001'
            },
            { 
                cmpCd: 'jhc003', 
                name: '桜木　花道', 
                sexCd: '01', 
                birthday: '1992-05-16',
                countryCd: '002'
            }
        ]
 
        for(let i=0; i<empinfos.length; i++){
            Empinfo.create(empinfos[i]);
        }
    })
    //
    Loginuser.sync().then(() => {
        const loginusers = [
            { 
                accountId: 'admin', 
                password: '000000', 
            },
            { 
                accountId: 'root', 
                password: '000000', 
            },
            { 
                accountId: 'user', 
                password: '000000', 
            }
        ]
 
        for(let i=0; i<loginusers.length; i++){
            Loginuser.create(loginusers[i]);
        }
    })
    //
    Sex.sync().then(() => {
        const sexs = [
            { 
                sexCd: '01', 
                sexName: '男', 
            },
            { 
                sexCd: '02', 
                sexName: '女', 
            },
            { 
                sexCd: '03', 
                sexName: 'その他', 
            }
        ]
 
        for(let i=0; i<sexs.length; i++){
            Sex.create(sexs[i]);
        }
    })
    //
    Country.sync().then(() => {
        const countrys = [
            { 
                countryCd: '001', 
                countryName: '中国', 
            },
            { 
                countryCd: '002', 
                countryName: '日本', 
            },
            { 
                countryCd: '003', 
                countryName: '韓国', 
            }
        ]
 
        for(let i=0; i<countrys.length; i++){
            Country.create(countrys[i]);
        }
    })
});



//fetch('/api/empinfos').then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/empinfo/111111').then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/empinfo/111111',{method: 'DELETE'}).then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/empinfo',{method: 'POST',headers:{'content-type': 'application/json'},body:JSON.stringify({cmpCd:'111111',name:'gu',sexCd:'01',birthday:'1990-10-01',countryCd:'003'})}).then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/empinfo',{method: 'PUT',headers:{'content-type': 'application/json'},body:JSON.stringify({cmpCd:'111111',name:'guxiong',sexCd:'02',birthday:'1990-10-11',countryCd:'001'})}).then((result) => result.json()).then((data) => {console.log(data)})

//fetch('/api/loginusers').then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/loginuser/root').then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/loginuser/root',{method: 'DELETE'}).then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/loginuser',{method: 'POST',headers:{'content-type': 'application/json'},body:JSON.stringify({accountId:'root',password:'000000'})}).then((result) => result.json()).then((data) => {console.log(data)})
//fetch('/api/loginuser',{method: 'PUT',headers:{'content-type': 'application/json'},body:JSON.stringify({accountId:'root',password:'111111'})}).then((result) => result.json()).then((data) => {console.log(data)})