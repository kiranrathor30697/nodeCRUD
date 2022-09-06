const express = require('express');
const app = express();
const mongoose = require('mongoose'); 

require('dotenv').config();

app.use(express.json())
//produsing code
    //every function return something
    // mongoose.connect('mongodb+srv://kiranrathor:KiranRathor@kiran.ov8n8w8.mongodb.net/?retryWrites=true&w=majority')
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}.ov8n8w8.mongodb.net/?retryWrites=true&w=majority`)
    .then((d)=>{
      console.log('connected')
      const MyFriends = mongoose.model('myFriends',{
        name:String,
        surname:String,
        age:String
      })

      app.post('/friends/createFriends',(req,res)=>{
        console.log(req.body)
        const friends = new MyFriends(req.body)
        friends.save();

        res.status(201).json({
          "msg":"user Created Successfully",
          data:req.body
        })
      })
    })
    .catch(err => console.log(err));
   
let port = process.env.PORT 

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});