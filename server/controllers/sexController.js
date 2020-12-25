const db = require('../config/db.config.js');
const Sex = db.Sex;

/**
* データベースからsex listを取得する
* @param {*} req 
* @param {*} res 
*/
exports.sexs = (req, res) => {
    // sex listを検索します
    try{
        Sex.findAll({attributes: ['sexCd', 'sexName']}
        )
        .then(sexs => {
            res.status(200).json(sexs);
        })
    }catch(error) { 
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    } 
}