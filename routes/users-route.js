import express from 'express';
import userLogin from '../controllers/user-controller'
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();


// Welcome Page
// router.get('/', (req, res) => res.json('index'));

// Docs Welcome Page
router.get('/', (req, res) => res.json({ message: "Welcome to Sign UP. Try /user/add"}))

router.post('/login', userLogin )

export default router;