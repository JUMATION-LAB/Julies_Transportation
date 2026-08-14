// console.log('API file rendered succesfully.')

const API = (() => {
    const BASE_URL = 'http://localhost:3000/api';
    const request = async (endpoint,method , options = {}) => {

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method:method,
            headers: {
                'Content-Type': 'application/json',
                 //This acts as a callback.
                 ...( storage.getToken() && { 'Authorization': `Bearer ${ storage.getToken() }` }),


            },
                
            // body: JSON.stringify({"email": "kk"  })  
            body: JSON.stringify( {  ...(options || {}) }),
        
        })

             

        const result = await response.json();

        console.log("API FILE")

        if (!response.ok) {
    console.log("No response retuned ", response)

            throw result;
        }

        return result;
    };

    return {

        get(endpoint) {
            return request(endpoint, 'GET' ,{});
        },

        post(endpoint, body) {
            
            console.log('This is the body.', body);

            return request(endpoint,'POST', {
                //  ...( storage.getToken() && { 'Authorization': `Bearer ${ storage.getToken() }` }),

                 body: body
            });
        },

        patch(endpoint, body) {
            return request(endpoint,'PATCH', {
                 body: JSON.stringify(body)
            });
        },

        put(endpoint, body) {
            return request(endpoint,'PUT', {
                //  ...( storage.getToken() && { 'Authorization': `Bearer ${ storage.getToken() }` }),
                body: JSON.stringify(body)
            });
        },

        delete(endpoint) {
            
            return request(endpoint,'DELETE' , {
                //  ...( storage.getToken() && { 'Authorization': `Bearer ${ storage.getToken() }` }),

            });
        }
    };
})();