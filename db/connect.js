const mongoose = require('mongoose');

const connectdb = (url)=>{
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("connected to mongodb"))
    .catch(()=>console.log("error in mongo connection"))
}

module.exports = connectdb;