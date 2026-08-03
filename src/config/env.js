const requiredVariables = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SECRET_KEY'
]

requiredVariables.forEach( (variable ) =>{

    if(!process.env[variable]){

        throw new Error(`Missing required environment variable: ${variable} in the .env file.`);
    }else{
        // console.log('All configured.')
    }


})



