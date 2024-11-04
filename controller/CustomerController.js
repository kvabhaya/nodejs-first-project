const CustomerSchema = require('../model/CustomerSchema');
const create = (req,resp)=> {
    // console.log(req.body);
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
                    resp.status(200).json({'data':result})
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
    try{
        const customerId=req.params.id;
        CustomerSchema.findByIdAndDelete(customerId)
            .then(result => resp.status(201).json({
            'message': 'Customer Deleted'
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
const updateById = (req,resp)=> {
    try{
        const customerId=req.params.id;
        CustomerSchema.findByIdAndUpdate(customerId, {
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        })
            .then(result => resp.status(201).json({
                'message': 'Customer Updated'
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
const search = (req,resp)=> {
    try{
        const name = req.query.searchText || '';
        const address = req.query.searchText || '';

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const query ={};
        if(name) query.name=new RegExp(name,'i');
        if(address) query.address=new RegExp(address,'i');

        CustomerSchema.find(query)
            .skip((page-1)*size)
            .limit(size)
            .then(result => resp.status(200).json({
                'data':result
            }))
            .catch(error => resp.status(500).json({
                'message': 'Something went wrong', error:error
            }))
    } catch (e) {
        resp.status(500).json({
            'message': 'Something went wrong', error: e
        })
    }
}

module.exports = {create, findOneById, deleteOneById, updateById, search}
