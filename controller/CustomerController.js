const CustomerSchema = require('../model/CustomerSchema');
const create = (req,resp)=> {
    try {
        let customerSchema = new CustomerSchema({
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        });
        customerSchema.save()
            .then(result => resp.status(201).json({
                'message': 'Customer Saved'
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
const findOneById = (req,resp)=> {
    try{
        const customerId=req.params.id;
        CustomerSchema.findById(customerId)
            .then(result=>{
                if(result){
                    resp.status(201).json({'data':result})
                }else{
                    resp.status(404).json({'message':'Customer Not Found'})
                }
            })
    }catch (e) {
        resp.status(500).json({
            'message': 'Something went wrong', error: e
        })
    }
}
const deleteOneById = (req,resp)=> {

}
const updateById = (req,resp)=> {

}
const search = (req,resp)=> {

}

module.exports = {create, findOneById, deleteOneById, updateById, search}
