const db = require('../config/db.config.js');
const Empinfo = db.Empinfo;
/**
* Empinfo オブジェクトをデータベース MySQL に保存する
* @param {*} req 
* @param {*} res 
*/
exports.createEmpinfo = (req, res) => {
 let empinfo = {};
 try{
    // リクエストの本文のアップロードから Empinfo オブジェクトを構築する
    empinfo.cmpCd = req.body.cmpCd;
    empinfo.name = req.body.name;
    empinfo.sexCd = req.body.sexCd;
    empinfo.birthday = req.body.birthday;
    empinfo.countryCd = req.body.countryCd;
    
    // MySQL データベースに保存する
    Empinfo.create(empinfo, 
            {
                attributes: ['cmpCd', 'name', 'sexCd', 'birthday','countryCd']
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
* 単一の社員データを取得する
* @param {*} req 
* @param {*} res 
*/
exports.getEmpinfo = (req, res) => {
    Empinfo.findByPk(req.params.cmpCd, 
        {attributes: ['cmpCd', 'name', 'sexCd', 'birthday','countryCd']}
    )
    .then(empinfo => {
        res.status(200).json(empinfo);
    }).catch(error => { 
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    })
}

/**
* データベースから社員データを取得する
* @param {*} req 
* @param {*} res 
*/
exports.empinfos = (req, res) => {
    // すべての社員情報を検索します
    try{
        Empinfo.findAll({attributes: ['cmpCd', 'name', 'sexCd', 'birthday','countryCd']}
        )
        .then(empinfos => {
            res.status(200).json(empinfos);
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
* cmpCd で社員データを削除する
* @param {*} req
* @param {*} res 
*/

exports.deleteEmpinfo = async (req, res) => {
    try{
        let empinfoCmpCd = req.params.cmpCd;
        let empinfo = await Empinfo.findByPk(empinfoCmpCd);
        if(!empinfo){
            res.status(404).json({
                message: "Does Not exist a Empinfo with cmpCd = " + empinfoCmpCd,
                error: "404",
            });
        } else {
            await empinfo.destroy();
            res.status(200).json({
                message: "delete success with cmpCd = " + empinfoCmpCd
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a empinfo with cmpCd = " + req.params.cmpCd,
            error: error.message
        });
    } 
}

 /**
* 社員データを更新する
* @param {*} req 
* @param {*} res 
*/
exports.updateEmpinfo = async (req, res) => {
    try{
        let empinfoCmpCd = req.body.cmpCd;
        let empinfo = await Empinfo.findByPk(empinfoCmpCd);
    
        if(!empinfo){
            // クライアントに応答を返す
            res.status(404).json({
                message: "Not Found for updating a empinfo with cmpCd = " + empinfoCmpCd,
                error: "404"
            });
        } else { 
            // データベースへを更新します
            let updatedObject = {
                name: req.body.name,
                sexCd: req.body.sexCd,
                birthday: req.body.birthday,
                countryCd: req.body.countryCd
            }
            let result = await Empinfo.update(updatedObject,
                { 
                    returning: true, 
                    where: {cmpCd: empinfoCmpCd},
                    attributes: ['cmpCd', 'name', 'sexCd', 'birthday','countryCd']
                }
            );
            // クライアントに応答を返す
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a empinfo with cmpCd = " + empinfoCmpCd,
                    error: "Can NOT Updated",
                });
            }
            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a empinfo with cmpCd = " + empinfoCmpCd,
            error: error.message
        });
    } 
}