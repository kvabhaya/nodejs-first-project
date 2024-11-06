const UserSchema = require('../model/UserSchema');
const signup = (req,resp)=> {
    // console.log(req.body);
    try {
        let userSchema = new UserSchema({
            email: req.body.email,
            password: req.body.password,
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

module.exports = {signup}
