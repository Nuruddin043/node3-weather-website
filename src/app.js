const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

const publicDirPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')



app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath);


app.use(express.static(publicDirPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'nuruddin'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'nuruddin'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help ',
        name:'nuruddin'
    })
})
 
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'please provide an address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                forecast:forecastData.temp,
                address:req.query.address
            })
            
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'help ',
        name:'nuruddin',
        msg:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
  
        name:'nuruddin',
        msg:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server running on port 30000')
})