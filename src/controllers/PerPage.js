const sequelize = require('../model/index')
const initModel = require('../model/init-models')
const model = initModel(sequelize)

const { successCode, errorCode, failCode } = require('../ulti/response');

const PerPage = async (req, res) => {
    try {
        const {id} = req.body;
        const data = await model.user.findByPk(id,{
            include: ['statuses']
        })
        object = await model.user_hastag.findAll({
            where: {
                user_id: id
            },
            include: ['hastag']
        })
        const userdata = {data,object}
        if (data) {
            successCode(res, userdata, '');
        }
        else {
            errorCode(res,'', "Người dùng không tồn tại!!!")
        }
    }
    catch {
        failCode(res);
    }
}



module.exports = {
    PerPage
}