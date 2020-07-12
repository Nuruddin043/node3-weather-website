const request = require("request")


const forecast=(latitude,longtitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=daf08710d5ca1938af22d31209ccc38f&query='+latitude+','+longtitude+'&units=m'
    request({url,json : true },(error,{body})=>{ 
        if(error){
            callback('unable to connect to the weather server',undefined)
        }else if(body.error){
            callback('no result found',undefined)
        }else{
      
            callback(undefined,{
                temp:body.current.temperature,
                feel:body.current.feelslike,
                des:body.current.weather_descriptions[0],
                humidity:body.current.humidity

            })
            
        }
    })
}

module.exports=forecast