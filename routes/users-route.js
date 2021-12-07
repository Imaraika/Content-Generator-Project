import express from 'express';
import addUser from '../controllers/user-controller'
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();


// Welcome Page
// router.get('/', (req, res) => res.json('index'));

// Docs Welcome Page
router.get('/', (req, res) => res.json({ message: "Welcome to Sign UP. Try /user/add"}))

router.post('/add', verifyToken, addUser )

export default router;