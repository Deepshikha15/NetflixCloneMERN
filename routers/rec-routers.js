const express = require('express')

const RecordCtrl = require('../controllers/user-ctrl');
const UsermgmtCtrl = require('../controllers/usermanagement-ctrl');
const MovieCtrl=require('../controllers/movies-ctrl');
const ListCtrl=require('../controllers/list-ctrl');
const verify = require('../verifyToken');
// const fs = require("fs");
// const path = require("path");

const router = express.Router()


router.post('/auth/register', RecordCtrl.userRegistration)
router.post('/auth/login',RecordCtrl.userLogin)
router.get('/users/find/:id',UsermgmtCtrl.getUser)
router.get('/users/stats',UsermgmtCtrl.getUserStat)


router.put('/users/:id',verify,UsermgmtCtrl.updateUser)
router.delete('/users/:id', verify,UsermgmtCtrl.deleteUser)
router.get('/users',UsermgmtCtrl.getAllUser)

router.post("/movies", verify,MovieCtrl.movieCreate)
router.put("/movies/:id", verify,MovieCtrl.movieUpdate)
router.delete("/movies/:id", verify,MovieCtrl.movieDelete)
router.get("/movies/find/:id", verify,MovieCtrl.getMovie)
router.get("/movies/random", verify,MovieCtrl.movieRandom)
router.get("/movies", verify,MovieCtrl.getAllMovie)

router.post("/lists", verify,ListCtrl.listCreate)
router.delete("/lists/:id", verify, ListCtrl.listDelete)
router.get("/lists", verify,ListCtrl.getList)

module.exports = router;