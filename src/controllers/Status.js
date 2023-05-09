const { where, DATE } = require('sequelize');
const sequelize = require('../model/index')
const initModel = require('../model/init-models')
const model = initModel(sequelize)
const _ = require("lodash")

const { successCode, errorCode, failCode } = require('../ulti/response');
const { includes } = require('lodash');
const user = require('../model/user');

const StatusPost = async (req, res) => {
    try{
        const {content, type_id, user_id} = req.body;
        var d = new Date()
        let object = {
            content,
            type_id,
            update_time: d.toISOString(),
            user_id,
            gr_id: 0
        }
        const data = await model.status.create(object);
        successCode(res, data,"Đăng bài thành công!")
    }
    catch(err)
    {
            failCode(res,'',"Lỗi")
    }
}

const StatusDelete = async (req, res) => {
    const { user_id, status_id } = req.body;
    let checkStt = await model.status.findByPk(id);

    if (checkStt) {
        let data = await model.status.destroy({
            where: {
                status_id: status_id,
                user_id: user_id
            }
        })
        successCode(res,data,"Xóa thành công")
    }
    else {
        errorCode(res, "Không tìm thấy bài cần xóa!!!")
    }
}

const StatusUpdate = async (req, res) => {
    const {user_id, status_id, type_id, content} = req.body
    let object = {
        type_id,
        content,
        update_time: Date.now()
    }

    let checkStt = await model.status.findByPk(id);
    
    if(checkStt) {
        let data = await model.status.update(object, {
            where: {
                Status_id: id
            }
        })

        let dataNew = await model.status.findByPk(id)
        successCode(res,dataNew,"Cập nhật status thành công!!!")
    }
    else {
        errorCode(res,"Không tìm thấy status!!!")
    }
}

const addDoc = async(req,res) => {

}

const addImg = async(req,res) => {
    
}
const addVid = async(req,res) => {
    
}

const StatusShow = async(req, res) => {
    let data = await model.status.findAll({include: ['type','user','comments','likes']});
    successCode(res,_.orderBy(data,['update_time'],['desc']))
}


const StatusShowId = async(req,res) => {
    const {id} = req.params;
    let data = await model.status.findAll({
        include: ['user','likes','comments'],
        where: {
            user_id: id
        }
    })
    successCode(res,data)
}

const StatusLike = async(req,res) => {
    try{
        const {user_id,status_id} = req.body;
        let object = {
            user_id,
            status_id
        }
        let checkLike = await model.like.findOne({
            where: {
                status_id: status_id,
                user_id: user_id
            }
        })
        if(checkLike) {
            const data = await model.like.destroy({
                where: {
                    status_id: status_id,
                    user_id: user_id
                }
            })
            successCode(res,data,"Bỏ like thành công")
        }
        else {
            const data = await model.like.create(object);
            successCode(res, data,"Like thành công!")
        }


    }
    catch(err)
    {
            failCode(res,'',"Lỗi")
    }
}

const LikeShow = async(req,res) => {
    const {id} = req.body;
    let data = await model.like.findAll({
        include: ['user'],
        where: {
            status_id: id
        }
    })
    if(data.length == 0)
        successCode(res,data,'Chưa có lượt thích nào nào')
    else
        successCode(res,data)
}

const StatusCmt = async (req,res) => {
    try{
        const {user_id,status_id,comment} = req.body;
        var d = new Date()
        let object = {
            user_id,
            status_id,
            comment,
            comment_time: d.toISOString()
        }
        const data = await model.comment.create(object);
        successCode(res, data,"Bình luận thành công!")
    }
    catch(err)
    {
            failCode(res,'',"Lỗi")
    }
}

const CmtShow = async(req,res) => {
    const {id} = req.body;
    let data = await model.comment.findAll({
        include: ['user'],
        where: {
            status_id: id
        }
    })
    if(data.length == 0)
        successCode(res,data,'Chưa có bình luận nào')
    else
        successCode(res,data)
}

const StatusRp = async (req, res) => {
    const {user_id,status_id,reason} = req.body;
    let object = {
        user_id,
        status_id,
        reason
    }
    const data = await model.report.create(object);
    successCode(res,data,'Báo cáo thành công!')
}



module.exports = {
    StatusPost,
    StatusDelete,
    StatusUpdate,
    StatusShow,
    StatusShowId,
    StatusLike,
    LikeShow,
    StatusCmt,
    CmtShow,
    StatusRp
}