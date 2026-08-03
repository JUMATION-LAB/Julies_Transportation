require('dotenv').config();
require('../src/config/env')

const bcrypt = require('bcrypt');
const supabase = require('../src/config/supabase');
const { AppError } = require('../src/utils/AppError');


const createAdmin = async ()=>{

    const name = 'Julie Admin';
    const email = 'julie@julie.com';
    const password = 'changed';

    const passwordHash = await bcrypt.hash( password , 12);

    const { data , error } = await supabase.from('admins')
                .insert({
                    name,
                    email: email.toLowerCase(),
                    password_hash: passwordHash 
                })
                .select('id , name , email ,  is_active, created_at')
                .single();


                if(error){
                    throw new AppError('Retrieval Error', error);
                console.log("Admin Errror ", error);
                }

                console.log("Admin ", data);

};


createAdmin()
    .then(() => {
        console.log('Script completed.');
    })
    .catch((error) => {
        console.error('Failed to create admin:', error);
        // process.exitCode = 1;
    });

