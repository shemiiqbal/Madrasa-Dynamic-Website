var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
module.exports={
    addData:(questionnaire,callback)=>{

db.get().collection(collection.DATA_COLLECTION).insertOne(questionnaire).then((data)=>{
callback(data);
})
    },

    doSignUp:(userData)=>{
        
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.insertedId)
                console.log(userData);
            });
           
        });
        
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
          let loginstatus=false
          let response={}
          let user=await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
          if(user){
              bcrypt.compare(userData.password,user.password).then((status)=>{
                  if(status){
                      console.log("login success");
                      response.user=user
                      response.status=true
                      resolve(response)
                  }else{
                      console.log("login failed");
                      resolve({status:false})
                  }
              })
                   }else
                  {
                    resolve({status:false})
              console.log('login failed');
                  }
      })
   }
   
}







