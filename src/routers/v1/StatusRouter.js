const express = require('express');
const {StatusPost, StatusDelete,StatusUpdate,
    StatusShow,StatusShowId,StatusLike, StatusCmt,CmtShow,StatusRp,LikeShow} = require('../../controllers/Status')
const StatusRouter =express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd() + "/public/image");
    },
    filename: (req, file, cb) => {
        //nên đặt tên file upload theo ngày tháng năm giờ phút giây để tên file không bị trùng lặp
        const fileNewName = Date.now() + "_" + file.originalname;
        cb(null, fileNewName);
    }
})

const upload = multer({ storage });

StatusRouter.post("/statuspost", StatusPost)
StatusRouter.get("/statusdelete/:id", StatusDelete)
StatusRouter.get("/statusupdate/:id",StatusUpdate)
StatusRouter.get("/statusshow",StatusShow)
StatusRouter.get("/statusshowid/:id",StatusShowId)
StatusRouter.post("/statuslike", StatusLike)
StatusRouter.get("/likeshow", LikeShow)
StatusRouter.post("/statuscmt",upload.single(""),StatusCmt)
StatusRouter.post("/statusrp",StatusRp)
StatusRouter.get("/cmtshow",CmtShow)



module.exports = StatusRouter;