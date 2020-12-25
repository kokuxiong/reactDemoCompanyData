let express = require('express');
let router = express.Router();

const empinfos = require('../controllers/empinfoController');
const loginusers = require('../controllers/loginuserController');
const sexs = require('../controllers/sexController');
const countrys = require('../controllers/countryController');

router.post('/api/empinfo', empinfos.createEmpinfo);
router.get('/api/empinfo/:cmpCd', empinfos.getEmpinfo);
router.get('/api/empinfos', empinfos.empinfos);
router.put('/api/empinfo', empinfos.updateEmpinfo);
router.delete('/api/empinfo/:cmpCd', empinfos.deleteEmpinfo);

router.post('/api/loginuser', loginusers.createLoginuser);
router.get('/api/loginuser/:accountId', loginusers.getLoginuser);
router.get('/api/loginusers', loginusers.loginusers);
router.put('/api/loginuser', loginusers.updateLoginuser);
router.delete('/api/loginuser/:accountId', loginusers.deleteLoginuser);

router.get('/api/sexs', sexs.sexs);

router.get('/api/countrys', countrys.countrys);


module.exports = router;