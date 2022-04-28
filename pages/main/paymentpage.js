import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import cookieCutter from 'cookie-cutter';
import Coincards from './components/coincards';
import { useRouter } from 'next/router';

const Paymentpage = () => {
   const [data, setData] = useState({});

   const router = useRouter();
   const slug = router.query;

   async function getData() {
      const loggedToken = cookieCutter.get('oursiteJWT', { path: '/' });
      const newdata = sessionStorage.getItem('userdata');

      const userData = newdata.split(',');

      const response = await axios.get(
         `http://43.204.35.41/api/wallets/${userData[1]}/`,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Token ${loggedToken}`,
            },
         }
      );
      if (response.status == 200) {
         setData(response.data);
      }
   }

   useEffect(() => {
      getData();
   }, []);

   return (
      <div className="relative w-full h-screen bg-black text-white px-5 md:px-7 pb-12 overflow-x-hidden hide-scroll-bar ">
         <div className="flex sticky top-0 w-full bg-black pt-12 pb-2 justify-between items-center z-10">
            <h1 className=" text-2xl md:text-4xl">
               Pay to,
               <br />
               <span className="text-[25px] md:text-4xl font-semibold">
                  {slug.name}
               </span>
            </h1>
         </div>
         <h1 className=" mt-6 text-4xl">Rs. {slug.amount}</h1>
         <div className="text-white mt-1 w-full text-lg ">
            <h1 className=" text-md md:text-2xl font-medium ">
               Using your favorite coin
            </h1>
         </div>
         <h1 className=" mt-10 font-primary font-semibold text-lg">
            Select your coin
         </h1>
         <div className="grid grid-cols-1 md:grid-cols-3">
            {Object.keys(data).map((key, index) => {
               if (index === 0) {
                  return;
               }
               return (
                  <Coincards
                     key={index}
                     name={data[key].name}
                     avl={data[key].value}
                     value={slug.amount}
                     wide
                  />
               );
            })}
         </div>
      </div>
   );
};

export default Paymentpage;
