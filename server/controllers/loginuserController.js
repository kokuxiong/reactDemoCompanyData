const db = require('../config/db.config.js');
const Loginuser = db.Loginuser;
/**
* Loginuser オブジェクトをデータベース MySQL に保存する
* @param {*} req 
* @param {*} res 
*/
exports.createLoginuser = (req, res) => {
 let loginuser = {};
 try{
    // リクエストの本文のアップロードから Loginuser オブジェクトを構築する
    loginuser.accountId = req.body.accountId;
    loginuser.password = req.body.password;
    
    // MySQL データベースに保存する
    Loginuser.create(loginuser, 
            {
                attributes: ['accountId', 'password']
            }
    )
    .then(result => { 
        res.status(200).json(result);
    });
}catch(error){
    res.status(500).json({
        message: "Fail!",
        error: error.message
    });
}}

 /**
* 単一のログインユーザデータを取得する
* @param {*} req 
* @param {*} res 
*/
exports.getLoginuser = (req, res) => {
    Loginuser.findByPk(req.params.accountId, 
        {attributes: ['accountId', 'password']}
    )
    .then(loginuser => {
        res.status(200).json(loginuser);
    }).catch(error => { 
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    })
}

/**
* データベースからログインユーザデータを取得する
* @param {*} req 
* @param {*} res 
*/
exports.loginusers = (req, res) => {
    // すべてのログインユーザ情報を検索します
    try{
        Loginuser.findAll({attributes: ['accountId', 'password']}
        )
        .then(loginusers => {
            res.status(200).json(loginusers);
        })
    }catch(error) { 
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    } 
}


        /**
* accountId でログインユーザデータを削除する
* @param {*} req
* @param {*} res 
*/

exports.deleteLoginuser = async (req, res) => {
    try{
        let loginuserAccountId = req.params.accountId;
        let loginuser = await Loginuser.findByPk(loginuserAccountId);
        if(!loginuser){
            res.status(404).json({
                message: "Does Not exist a Loginuser with accountId = " + loginuserAccountId,
                error: "404",
            });
        } else {
            await loginuser.destroy();
            // res.status(200);
            res.status(200).json({
                message: "delete with accountId = " + loginuserAccountId,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a loginuser with accountId = " + loginuserAccountId,
            error: error.message
        });
    } 
}

 /**
* ログインユーザデータを更新する
* @param {*} req 
* @param {*} res 
*/
exports.updateLoginuser = async (req, res) => {
    try{
        let loginuserAccountId = req.body.accountId;
        let loginuser = await Loginuser.findByPk(loginuserAccountId);
    
        if(!loginuser){
            // クライアントに応答を返す
            res.status(404).json({
                message: "Not Found for updating a loginuser with accountId = " + loginuserAccountId,
                error: "404"
            });
        } else { 
            // データベースへを更新します
            let updatedObject = {
                accountId: req.body.accountId,
                password: req.body.password
            }
            let result = await Loginuser.update(updatedObject,
                { 
                    returning: true, 
                    where: {accountId: loginuserAccountId},
                    attributes: ['accountId', 'password']
                }
            );
            // クライアントに応答を返す
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a loginuser with accountId = " + loginuserAccountId,
                    error: "Can NOT Updated",
                });
            }
            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a loginuser with accountId = " + loginuserAccountId,
            error: error.message
        });
    } 
}