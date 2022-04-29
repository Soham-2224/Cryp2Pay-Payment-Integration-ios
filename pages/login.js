import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import cookieCutter from 'cookie-cutter';
import { useRouter } from 'next/router';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const router = useRouter();
   const slug = router.query;

   const userData = {
      username: email,
      password: password,
      email: email,
   };

   const handleSubmit = async () => {
      try {
         const response = await axios.post(
            'https://cryptopayapi.ml/api/login/',
            userData,
            { mode: 'cors' }
         );

         if (response.status == 200) {
            const loggedToken = response.data.token;
            const udata = Object.entries(response.data.user_data);
            console.log(udata);
            sessionStorage.setItem('userdata', udata);

            cookieCutter.set('oursiteJWT', loggedToken, {
               path: '/',
               expires: new Date(Date.now() + 6.048e8),
            });
            router.push({
               pathname: '/main/paymentpage',
               query: slug,
            });
         }
      } catch ({ err, response }) {
         console.log(response.data.non_field_errors[0]);
         alert(response.data.non_field_errors[0]);
      }
   };

   return (
      <div className=" bg-gray-100 min-h-screen flex flex-col">
         <div className="container max-w-[350px] md:max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2 before:w-[300px] md:before:w-[440px] before:h-[422px] before:bg-black before:absolute before:top-[170px] md:before:top-[25%] before:rounded-3xl before:border-black">
            <div className="bg-white relative px-6 py-8 rounded-3xl border border-black text-black w-full   ">
               <h1 className=" text-4xl md:text-6xl md:text-center font-semibold font-primary">
                  Login
               </h1>
               <p className=" text-gray-500 md:text-center mb-[48px]">
                  to continue with the app
               </p>

               <div className="relative flex w-full flex-wrap items-stretch mb-[23px]">
                  <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="text"
                     placeholder="Email"
                     className="px-3 md:py-5 py-3 placeholder-slate-600  text-slate-600 relative bg-white  rounded text-sm md:text-xl border-2 outline-none focus:outline-none focus:ring w-full pr-10"
                  />
                  <span className="z-10 h-full  absolute rounded w-9 md:w-16  flex items-center justify-center right-0 px-1">
                     <span className="md:w-12 md:h-12 relative">
                        <Image src="/email.png" layout="fill" alt="email" />
                     </span>
                  </span>
               </div>
               <div className="relative flex w-full flex-wrap items-stretch mb-[23px]">
                  <input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     placeholder="Password"
                     className="px-3 py-3 md:py-5 placeholder-slate-600  text-slate-600 relative bg-white  rounded text-sm md:text-lg border-2 outline-none focus:outline-none focus:ring w-full pr-10"
                  />
                  <span className="z-10 h-full  absolute rounded w-9 md:w-16  flex items-center justify-center right-0 px-1">
                     <span className="md:w-12 md:h-12 relative">
                        <Image src="/hidden.png" layout="fill" alt="eyelash" />
                     </span>
                  </span>
               </div>

               <div className="w-full flex flex-col items-center">
                  <button
                     onClick={handleSubmit}
                     type="submit"
                     className="btn max-w-[90px] md:max-w-lg text-[13px] md:text-lg"
                  >
                     Login
                  </button>
               </div>

               <div className=" py-9">
                  <div className="w-[200px] relative left-2/4 -translate-x-2/4 border-t border-gray-300"></div>
               </div>

               <div className=" text-base md:text-xl font-medium font-primary text-center">
                  Powered by Cryp2pay wallet
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
