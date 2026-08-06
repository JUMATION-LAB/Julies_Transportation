
const storage = (()=>{
// console.log('Storage file rendered succesfully.')
    // const TOKEN_KEY = '';
//gte, set, has

        return ({
            getToken(){
               return localStorage.getItem('TOKEN_KEY');
            }
            ,
           setToken(token){
                localStorage.setItem( 'TOKEN_KEY' ,token);
           },

           hasToken(){
            return !!localStorage.getItem('TOKEN_KEY')
           },

           removeToken(){
            localStorage.removeItem('TOKEN_KEY');

           }


        })


})();