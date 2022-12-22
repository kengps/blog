const mongoose = require('mongoose');


urlDb = process.env.MONGOOSE_DATABASE_URL;


mongoose.connect(urlDb , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => console.log(err));


const productSchema = mongoose.Schema({
    
    description:String
})

const MongoDb = mongoose.model('comments', productSchema)


module.exports = MongoDb;


//ออกแบบ function สำหรับบันทึดข้อมูล

module.exports.sendComment = ((model, data) =>{
    model.save(data)
})

