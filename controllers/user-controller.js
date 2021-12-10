import User from '../models/User';
import jwt from 'jwt-simple';
import dotEnv from 'dotenv';
dotEnv.config();

// exports.getToyCars = async (req, res, next) => {
//     try {
//         const toyCar = await ToyCar.find();

//         return res.status(200).json({
//             success: true,
//             count: toyCar.length,
//             data: toyCar
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Getting Toy Cars: ${error.message}`
//         })
//     }
// }

// exports.getToyCarById = async (req, res, next) => {
//     try {
//         const toyCar = await ToyCar.findById(req.params.id);
//         if (!toyCar) {
//             return res.status(404).json( {
//                 success: false,
//                 error: 'Toy Car Not Found'
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             data: toyCar
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Getting Toy Car ${req.params.id}: ${error.message}`
//         })
//     }
// }

// exports.updateToyCar = async (req, res, next) => {
//     try {
//         const toyCar = await ToyCar.findById(req.params.id).exec();
//         if (!toyCar) {
//             return res.status(404).json( {
//                 success: false,
//                 error: 'Toy Car Not Found'
//             })
//         }
//         console.log(req.body)
//         toyCar.set(req.body);
//         var update = await toyCar.save();
//         return res.status(200).json({
//             success: true,
//             data: update
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Getting Toy Car ${req.params.id}: ${error.message}`
//         })
//     }
// }

const userLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.find({email: {$in: [email]}});
        console.log(user);
        var decode = jwt.decode(user[0].password, process.env.SECRET_KEY);
        if (password === decode.password)
        {
            var payload = {userId: user[0]._id, role: user[0].role};
            var secret = process.env.SECRET_KEY;
            var token = jwt.encode(payload, secret);
                    }
        return res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: `Error Logged in failed: ${error.message}`

        })
    }
}
// exports.deleteToyCar = async (req, res, next) => {
//     try {
//         const toyCar = await ToyCar.findById(req.params.id);
//         if (!toyCar) {
//             return res.status(404).json( {
//                 success: false,
//                 error: 'Toy Car Not Found'
//             })
//         }

//         await toyCar.remove();

//         return res.status(200).json({
//             success: true,
//             data: {}
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Deleting Toy Car: ${error.message}`
//         })
//     }
// }
export default userLogin;