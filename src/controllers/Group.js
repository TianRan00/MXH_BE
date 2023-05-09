const { where, DATE } = require('sequelize');
const sequelize = require('../model/index')
const initModel = require('../model/init-models')
const model = initModel(sequelize)

const { successCode, errorCode, failCode } = require('../ulti/response');

const GroupCreate = async (req, res) => {
    try{
        const {gr_name, gr_content, user_id} = req.param;
        const {filename} = req.file

        let object = {
            gr_name,
            gr_ava: `/public/image/${filename}`,
            gr_content,
            user_id
        }
        const data = await model.group.create(object);
        successCode(res, data,"Tạo group thành công!")
    }
    catch(err)
    {
            failCode(res,'',"Lỗi")
    }
}

const PostGrStt = async (req, res) => {
    try {
        const {gr_id} = req.params;
        const {content, type_id, user_id} = req.body;
        var d = new Date()
        let object = {
            content,
            type_id,
            update_time: d.toISOString(),
            user_id,
            gr_id
        }
        const data = await model.status.create(object);
        successCode(res, data,"Đăng bài thành công!")
    }
    catch(err) {
        failCode(res,'','Lỗi!!!')
    }
}

const ShowGrStt = async (req, res) => {
    try {
        const {gr_id} = req.params;
        let data = await model.status.findAll({include: ['type','user','likes','comments']},{
            where: {
                gr_id : gr_id
            }
        });
        successCode(res,_.orderBy(data,['update_time'],['desc']))
    }
    catch(err) {
        failCode(res,'','Lỗi!!!')
    }
}

const ShowGr = async (req, res) => {
    try {
        const {id} = req.body;
        let UHLst = await model.user_hastag.findAll({
            where: {
                user_id: id
            }
        })
        UHLst.forEach(element => {
            let 
        });
    }
    catch(err) {
        failCode(res,'','Lỗi!!!')
    }
}


module.exports = {
    GroupCreate,
    PostGrStt,
    ShowGrStt
}