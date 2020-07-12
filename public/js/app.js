

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
const msg3=document.querySelector('#msg3')
const msg4=document.querySelector('#msg4')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    msg1.textContent='loading....'
    msg2.textContent=''
    msg3.textContent=''
    msg4.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent=data.error
        }else{
            msg1.textContent=data.location
            msg2.textContent='temperature:'+data.forecast
            msg3.textContent='weather descriptions:'+data.des
            msg4.textContent='humidity:'+data.humidity
     
            
        }
        
    })
    })

}) 