const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const wt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secret = process.env.SECRET;

nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        password:process.env.EMAIL_PASSWORD
    }
});

const signup = async (req, resp) => {
    // console.log(req.body);
    try {

        const existingUser = await UserSchema.findOne({email: req.body.email});

        if(existingUser){
            return resp.status(400).json({'message': 'User already exist'});
        }

        const hash = await bcrypt.hash(req.body.password,10);

        let userSchema = new UserSchema({
            email: req.body.email,
            password: hash,
            fullName: req.body.fullName
        });
        userSchema.save()
            .then(result => resp.status(201).json({
                'message': 'User Saved'
            }))
            .catch(error => resp.status(500).json({
                'message': 'Something went wrong', error
            }))
    } catch (e) {
        resp.status(500).json({
            'message': 'Something went wrong', error: e
        })
    }
}
const login = async (req, resp) => {
    // console.log(req.body);
    try {

        const existingUser = await UserSchema.findOne({email: req.body.email});

        if(!existingUser){
            return resp.status(404).json({'message': 'User not found'});
        }

        const isConfirmed = await bcrypt.compare(req.body.password,existingUser.password);

        if(!isConfirmed){
            return resp.status(401).json({'message': 'Password is wrong'});
        }

        const token = wt.sign({userId:existingUser._id,
                        email:existingUser.email,
                        fullName:existingUser.fullName},
            secret, {expiresIn: '5h'});

        resp.status(200).json({'token': token, 'message':'user logged'});
    } catch (e) {
        resp.status(500).json({
            'message': 'Something went wrong', error: e
        })
    }
}
// const findOneById = (req,resp)=> {
//     try{
//         const userId=req.params.id;
//         UserSchema.findById(userId)
//             .then(result=>{
//                 if(result){
//                     resp.status(200).json({'data':result})
//                 }else{
//                     resp.status(404).json({'message':'User Not Found'})
//                 }
//             })
//     }catch (e) {
//         resp.status(500).json({
//             'message': 'Something went wrong', error: e
//         })
//     }
// }
// const deleteOneById = (req,resp)=> {
//     try{
//         const userId=req.params.id;
//         UserSchema.findByIdAndDelete(userId)
//             .then(result => resp.status(201).json({
//                 'message': 'User Deleted'
//             }))
//             .catch(error => resp.status(500).json({
//                 'message': 'Something went wrong', error
//             }))
//     } catch (e) {
//         resp.status(500).json({
//             'message': 'Something went wrong', error: e
//         })
//     }
// }
// const updateById = (req,resp)=> {
//     try{
//         const userId=req.params.id;
//         UserSchema.findByIdAndUpdate(userId, {
//             email: req.body.email,
//             password: req.body.password,
//             fullName: req.body.fullName
//         })
//             .then(result => resp.status(201).json({
//                 'message': 'User Updated'
//             }))
//             .catch(error => resp.status(500).json({
//                 'message': 'Something went wrong', error
//             }))
//     } catch (e) {
//         resp.status(500).json({
//             'message': 'Something went wrong', error: e
//         })
//     }
// }
// const search = (req,resp)=> {
//     try{
//         const email = req.query.searchText || '';
//         const fullName = req.query.searchText || '';
//
//         const page = parseInt(req.query.page) || 1;
//         const size = parseInt(req.query.size) || 10;
//         const query ={
//             $or:[
//                 {email:new RegExp(searchText, 'i')},
//                 {fullName:new RegExp(searchText, 'i')},
//             ]
//         };
//
//         UserSchema.find(query)
//             .skip((page-1)*size)
//             .limit(size)
//             .then(result => resp.status(200).json({
//                 'data':result
//             }))
//             .catch(error => resp.status(500).json({
//                 'message': 'Something went wrong', error:error
//             }))
//     } catch (e) {
//         resp.status(500).json({
//             'message': 'Something went wrong', error: e
//         })
//     }
// }

module.exports = {signup, login}
