var db=require('../config/connection')
var collection=require('../config/collections')
var objectId= require('mongodb').ObjectId
const bcrypt=require('bcrypt')
const { response } = require('../app')
const { ObjectId } = require('mongodb')
const { ADMIN_COLLECTION } = require('../config/collections')
module.exports={

getNames:()=>{
    return new Promise(async (resolve,reject)=>{
        let questionnaire=await db.get().collection(collection.DATA_COLLECTION).find().toArray()
        resolve(questionnaire)
    })
},

getAlldata:(studId)=>{
    return new Promise(async (resolve,reject)=>{

       let studentData=await db.get().collection(collection.DATA_COLLECTION).findOne({_id:ObjectId(studId)})
           
            resolve(studentData)
    })
},

deleteData:(studId)=>{
    return new Promise((resolve,reject)=>{

        db.get().collection(collection.DATA_COLLECTION).remove({_id:ObjectId(studId)}).then((response)=>{
            resolve(response)
       
        })        
     })
},

adminLog:(adminData)=>{
    return new Promise(async (resolve,reject)=>{
        let loginstatus=false
        let response={}
    let admin=await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email})
        if(admin){
            bcrypt.compare(adminData.password,admin.password).then((status)=>{
                if(status){
                    console.log("login success");
                    response.admin=admin
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
