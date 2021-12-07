import jwt from 'jwt-simple';
import dotEnv from 'dotenv';
dotEnv.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.decode(token, process.env.SECRET_KEY)
       
        if (decoded.role === 'admin')

        next()
        else
        res.status(401).send({
            message: 'Unauthorized. you must be an Admin'
        })
    } catch (e) {
        console.log(e)
        res.status(401).send({
            message: 'Unauthorized. Please provide a valid token '
        })
    }
}
export default verifyToken;