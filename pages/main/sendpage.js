import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookieCutter from 'cookie-cutter';

const Sendpage = () => {
   const [nosuccess, setNoSuccess] = useState(true);
   const router = useRouter();
   const slug = router.query;
   const toSend = slug.id;
   const cointoSend = slug.cryptoN;
   const amt = slug.cryptoA;
   const inrtoSend = slug.amount;
   const dataToSend = {
      sent_to: toSend,
      coin_name: cointoSend,
      amount: amt,
      inr: inrtoSend,
   };

   const decimalAmt = parseFloat(slug.cryptoA).toFixed(6);

   const payCrypto = async () => {
      const loggedToken = cookieCutter.get('oursiteJWT', { path: '/' });
      try {
         await axios
            .post('https://cryp2pay.ml/merchant/transfer/', dataToSend, {
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${loggedToken}`,
               },
            })
            .then((response) => {
               if (response.status === 200) {
                  setNoSuccess(false);
               }
            });
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogout = async () => {
      try {
         cookieCutter.set('oursiteJWT', '', {
            path: '/',
            expires: new Date(0),
         });
         setTimeout(() => {
            window.close();
         }, 3000);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="relative w-full h-screen bg-black text-white flex items-center justify-center px-5 md:px-7  overflow-x-hidden hide-scroll-bar flex-col gap-20 ">
         <div className=" px-3 rounded-lg pb-3 pt-12 w-[330px] h-[405px] bg-[#191919] relative">
            <div className=" -top-16 left-2/4 -translate-x-2/4 flex flex-col justify-center cursor-pointer items-center absolute bg-myColor overflow-hidden h-fit p-1 rounded-full">
               <span className="relative w-24 h-24 rounded-full overflow-hidden ">
                  <Image
                     src="/checkCircle.svg"
                     layout="fill"
                     alt="checkCircle"
                  />
               </span>
            </div>
            <div className=" w-full border rounded-lg px-5 py-16 border-myColor grid gap-28 h-full">
               {nosuccess ? (
                  <>
                     <div className="grid grid-cols-3 w-full items-end">
                        <h1 className=" font-medium text-base col-span-2">
                           Sending <br />{' '}
                           <span className=" font-primary font-md text-xl">
                              {decimalAmt} {slug.cryptoN}
                           </span>{' '}
                        </h1>
                        <h1 className=" font-primary font-md text-xl">
                           {slug.amount} Rs
                        </h1>
                     </div>
                     <div className=" flex justify-center items-center flex-col gap-[13px]">
                        <p>Press pay to proceed.</p>
                        <button onClick={payCrypto} className="btn">
                           Pay
                        </button>
                     </div>
                  </>
               ) : (
                  <div className="relative text-white">
                     <h1 className="font-primary text-xl text-center">
                        Payment Processed
                     </h1>
                     <h2 className="text-center my-10">
                        Thank you for using Cryp2pay. <br /> Please stay tuned
                        for updates and cashback offers.
                     </h2>
                     <div className=" flex justify-center items-center">
                        <button onClick={handleLogout} className="btn">
                           Done
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </div>
         <div className=" text-base md:text-xl font-medium font-primary">
            Powered by Cryp2pay wallet
         </div>
      </div>
   );
};

export default Sendpage;
