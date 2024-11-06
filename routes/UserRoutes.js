const express=require('express');
const router = express.Router();
const userController=require('../controller/UserController');

router.post('/signup',userController.signup);
// router.get('/find/:id',customerController.findOneById);
// router.delete('/delete/:id',customerController.deleteOneById);
// router.put('/update/:id',customerController.updateById);
// router.get('/search',customerController.search);

module.exports = router;

