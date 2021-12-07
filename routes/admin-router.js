import express from 'express';
import {addAdmin, login, getAllUsers, getUserById,updateUser,deleteUser}  from '../controllers/admin-controller'

import verifyToken from '../middlewares/verifyToken';

const router = express.Router();


// Welcome Page
// router.get('/', (req, res) => res.json('index'));

// Docs Welcome Page
router.get('/', verifyToken, (req, res) => res.json({ message: "Welcome to Admin Dashbnord."}))

router.post('/add', addAdmin )

router.post('/login',login )

router.get('/admin', getAllUsers)

router.get('/admin', getUserById)
router.put('/admin', updateUser)
router.delete('/admin', deleteUser)

export default router;