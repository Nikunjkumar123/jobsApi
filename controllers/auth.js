const User = require('../models/User.js');
const {BadRequestError} = require('../errors/bad-request.js')
const {UnauthenticatedError} = require('../errors/unauthenticated.js')

const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            throw new BadRequestError('pls provide name, email, password')
        }
        const user = await User.create({...req.body});
        const token = user.createJWT()
        res.status(201).json({user:{name:user.name},token});
    } catch (error) {
        res.status(500).json({error});
    }
}
const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            throw new BadRequestError('pls provide email, password')
        }
        const user = await User.findOne({email});
        if(!user){
            throw new UnauthenticatedError('invalid credentials')
        }
        const ispasswordCorrect = await user.comparePassword(password)
        if(!ispasswordCorrect){
            throw new UnauthenticatedError('invalid credentials')
        }
        const token = user.createJWT()
        res.status(200).json({user:{name:user.name},token});
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = {login,register};