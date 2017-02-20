/**
 * How to use :
 * When you add a new rouer, what you should do:
 * 1. import yourRouter from 'yourRouter';
 * 2. router.use(yourRouter);
 *
 * that's all
 */

import {Router } from "express";
const router = Router();
// 定义测试环境下的data服务器中转

// ***  VVV  在下面添加新的router  VVV ****
// import apiJump from "./apiJump"
// import appIndex from "./appIndex"

router.get('*', function(req, res, next){
  let Ua = req.headers['user-agent'];
  req.userUA = {
    isPhont: !!Ua.match(/(iPhone|iPod|iPad|android|BlackBerry)/i),
    isAndroid: !!Ua.match(/(android)/i),
    isMac: !!Ua.match(/()/i)
  };
	next();
});

router.get('/favicon.ico', function(req, res, next){
	res.end();
});
// router.use(apiJump)
// router.use(appIndex)

// *****^^^^  router end  ^^^^^*****
export default router;
