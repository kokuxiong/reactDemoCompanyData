const db = require('../config/db.config.js');
const Country = db.Country;

/**
* データベースからcountry listを取得する
* @param {*} req 
* @param {*} res 
*/
exports.countrys = (req, res) => {
    // country listを検索します
    try{
        Country.findAll({attributes: ['countryCd', 'countryName']}
        )
        .then(countrys => {
            res.status(200).json(countrys);
        })
    }catch(error) { 
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    } 
}