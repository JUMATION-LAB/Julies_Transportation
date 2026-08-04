
const API = (()=>{
    const BASE_URL = 'http://localhost:3000';

    const request = (BASE_URL , options ={})=>{
        fetch(BASE_URL , {
            'Content-type': 'application/json',
            ...(options || {} )
        } ).then(
            
        )

    }

    return({
        
    })


});



