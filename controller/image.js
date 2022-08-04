const Clarifai=require('clarifai');
const app = new Clarifai.App({
    apiKey: 'b96ce1a951f945ca8eceaa871d2d8ab4'
});

const handleApiCall=(req,res)=>{
app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input).then(data=>{
    res.json(data);
}).catch(err=>res.status(400).json('Unable to work with api'));
}
const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries);
    })
    .catch(err=>res.status(400).json('Unable to Get entries'));
}
module.exports={
    handleImage,
    handleApiCall
}