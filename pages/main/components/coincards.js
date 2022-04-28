import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

const Coincards = ({ wide, name, avl, value }) => {
   let coinPath, shortName;
   switch (name) {
      case 'Bitcoin':
         coinPath = '/btc.png';
         shortName = 'BTC';
         break;
      case 'Algorent':
         coinPath = '/algo.png';
         shortName = 'ALGO';
         break;
      case 'Dogecoin':
         coinPath = '/doge.png';
         shortName = 'DOGE';
         break;
      case 'Tron':
         coinPath = '/tron.png';
         shortName = 'TRON';
         break;
      case 'BitTorrent':
         coinPath = '/BitTorrent.png';
         shortName = 'BTTC';
         break;
      case 'Harmony':
         coinPath = '/Harmony.png';
         shortName = 'ONE';
         break;
      case 'Litecoin':
         coinPath = '/Litecoin.png';
         shortName = 'LTC';
         break;
      case 'Etherium':
         coinPath = '/Etherium.png';
         shortName = 'ETH';
         break;
      case 'Zilliqa':
         coinPath = '/Zilliqa.png';
         shortName = 'ZIL';
         break;
      case 'Digibyte':
         coinPath = '/Digibyte.png';
         shortName = 'DGB';
         break;
      case 'Stellar':
         coinPath = '/Stellar.png';
         shortName = 'XLM';
         break;
      case 'Ripple':
         coinPath = '/Ripple.png';
         shortName = 'XRP';
         break;
      default:
         coinPath = '/btc.png';
         shortName = 'BTC';
   }
   const router = useRouter();

   async function coinClicked(name) {
      try {
         const singleInr = await axios
            .get(
               `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${name}&to_currency=INR&apikey=ZEOHYLMZ8WIMTUAJ&fbclid=IwAR22vEckEjEfp9e-KTDl_VsNacjPbMX8PdCyuWspQvM7c0rUou8uoJwaO80`
            )
            .then((response) => {
               return response.data['Realtime Currency Exchange Rate'][
                  '5. Exchange Rate'
               ];
            });
         let ttlCoins = value / singleInr;
         console.log(ttlCoins);
         if (ttlCoins < avl) {
            router.push({
               pathname: '/main/sendpage',
               query: { cryptoA: ttlCoins, cryptoN: name },
            });
         }
         if (ttlCoins > avl) {
            alert('Insufficient funds');
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div
         className={`${
            wide ? 'w-[94%] mt-5 h-[138px]' : 'w-40 h-40'
         }  md:w-52 md:h-52 bg-[#1a1a1a] rounded-md p-3`}
      >
         <div className="relative flex flex-col justify-between border rounded-md h-full border-myColor px-3 py-2">
            <h1
               onClick={() => coinClicked(shortName)}
               className=" font-semibold text-xl md:text-2xl"
            >
               {name}
               <br />
               <p className=" text-sm md:text-lg text-[#d3d3d3]">Avl: {avl}</p>
            </h1>
            <p
               className={` text-sm md:text-lg text-[#d3d3d3] ${
                  wide ? 'text-right' : 'text-left'
               }`}
            >
               INR:
            </p>

            <div className=" -right-8 top-2/4 -translate-y-2/4 flex flex-col justify-center cursor-pointer items-center absolute bg-myColor overflow-hidden h-fit p-1 md:p-2 lg:p-3 rounded-full">
               <span className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ">
                  <Image src={coinPath} layout="fill" alt="payImage" />
               </span>
            </div>
         </div>
      </div>
   );
};
export default Coincards;
