const sequelize = require('../model/index')
const initModel = require('../model/init-models')
const model = initModel(sequelize)

const { successCode, errorCode, failCode } = require('../ulti/response');

const userHastag = async(req, res) => {
    try {
        const {hastag_id, user_id} = req.body;

        let object = {
            hastag_id,
            user_id
        }
        const data = await model.user_hastag.create(object);
        successCode(res, data,"Chọn hastag thành công!!!")
    }
    catch {
        failCode(res,'','Có lỗi!!!')
    }
}

const sttHastag = async(req, res) => {
    try {
        const {hastag_id, status_id} = req.body;


        let object = {
            hastag_id,
            status_id
        }
        const data = await model.status_hastag.create(object);
        successCode(res, data,"Chọn hastag thành công!!!")
    }
    catch {
        failCode(res,'','Có lỗi!!!')
    }
}

const grHastag = async(req, res) => {
    try {
        const {hastag_id, gr_id} = req.body;
        let object = {
            hastag_id,
            gr_id
        }
        const data = await model.group_hastag.create(object);
        successCode(res, data, 'Chọn hastag thành công!!!')
    }
    catch {
        failCode(res,'','Có lỗi!!!')
    }
}

module.exports = {
    userHastag,
    sttHastag,
    grHastag
}