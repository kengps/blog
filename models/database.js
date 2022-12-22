const mongoose = require('mongoose');


urlDb = process.env.MONGOOSE_DATABASE_URL;


mongoose.connect(urlDb , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => console.log(err));


const productSchema = mongoose.Schema({
   
    postedAt:{
        type: String,
        default: new Date().toLocaleString('th-TH', {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit'
       })
    },
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
})

const MongoDb = mongoose.model('products', productSchema)


module.exports = MongoDb;


//ออกแบบ function สำหรับบันทึกข้อมูล

module.exports.sendProduct = ((model, data) =>{
    model.save(data)
})

