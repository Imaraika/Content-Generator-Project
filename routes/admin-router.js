import express from 'express';
import {addAdmin, login, getAllUsers, getUserById,updateUser,deleteUser, addUser}  from '../controllers/admin-controller'

import verifyToken from '../middlewares/verifyToken';

const router = express.Router();


// Welcome Page
// router.get('/', (req, res) => res.json('index'));

// Docs Welcome Page
router.get('/', verifyToken, (req, res) => res.json({ message: "Welcome to Admin Dashbnord."}))

router.post('/addAdmin', verifyToken, addAdmin )
router.post('/addUser', verifyToken, addUser )

router.post('/login',login )

router.get('/getAll', verifyToken, getAllUsers)

router.get('/getOne', verifyToken, getUserById)
router.put('/updateUser', verifyToken, updateUser)
router.delete('/deleteUser',verifyToken, deleteUser)

export default router;