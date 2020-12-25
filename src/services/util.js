//国マスタ
const country = [
    {cd: '001', cName: '中国'},
    {cd: '002', cName: '日本'},
    {cd: '003', cName: '韓国'},
]

//国のcountryCdにより、国名を検索し返却する
function getCountryName(countryCd) {
    //検索処理
    let countryTmp = country.find((element) => element.cd == countryCd)
    //検索結果がある場合、国名を返却、それ以外は不明を返却
    return countryTmp ? countryTmp.cName : '不明'
}

//6桁英数字チェック
function doCheck6LetterOrNum(target) {
    var myExpress = "^[0-9a-zA-Z]{6}$"; 
    var re = new RegExp(myExpress); 
    console.log("re test" + re.test(target))
    if (re.test(target)) { 
       return true
    }else{ 
      return false
    }
}

//export
export { 
    getCountryName,           //国のcountryCdにより、国名を検索し返却する
    doCheck6LetterOrNum       //6桁英数字チェック 
}