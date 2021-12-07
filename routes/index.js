import express from 'express';
const router =  express.Router();
import adminRoutes from './admin-router'
import userRoutes  from './users-route'

// Welcome Page
// router.get('/', (req, res) => res.json('index'));

// Docs Welcome Page
router.get('/', (req, res) => res.json({message: "Welcome"}))
router.use('/admin', adminRoutes)
router.use('/user', userRoutes)

export default router