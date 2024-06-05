import React, { useEffect, useState } from 'react';
import axios from "axios"; 

export default function MainPage() {
    const[date,setDate] = useState(null);
    const[sourceCurrency, setSourceCurrency]= useState("");
    const[targetCurrency, setTargetCurrency]= useState("");
    const[amountInSourceCurrency, setAmountInSourceCurrency]= useState(0);
    const[amountInTargetCurrency, setAmountInTargetCurrency]= useState(0);
    const[currencyNames, setCurrencyNames]= useState([]);
    const[loading,setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the form is submitted
        try {
            const response = await axios.get("http://localhost:5000/convert", {
                params: {
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency,
                },
            });
            setAmountInTargetCurrency(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Set loading to false after receiving the response or encountering an error
        }
    };
    

    //get all currency names

    useEffect(() =>{
        const getCurrencyNames = async() =>{
            try{
                const responce = await axios.get("http://localhost:5000/getAllCurrencies");

                setCurrencyNames(responce.data);
            } catch(err){
                
                console.error(err);
            }
        };
        getCurrencyNames();
    },[])

    const handleExit = () => {

    };

  return (
    
    <div>
        <h1 className=' lg:mx-32 text-5xl font-bold text-purple-500' >Easy Currencies</h1>
        <p className='lg:mx-32 opacity-50 py-6'>
        "Welcome to EasyCurrencies! Enjoy hassle-free currency conversions with real-time rates and a user-friendly interface. Convert currencies effortlessly, whether you're traveling, managing finances, or exploring global markets. EasyCurrencies: Fast, Accurate, and Secure."
        </p>

        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
            <form onSubmit={handleSubmit}>
            <div className='mb-4'>
            <label
             htmlFor={date}
             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
                Date

            </label>

            <input
                onChange={(e) => setDate(e.target.value)}
                type="Date"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" 
                placeholder="" 
                name={date}
                id={date}

            required />
        </div>

        <div className='mb-4'>
            <label
             htmlFor={sourceCurrency}
             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
               Source currencies 

            </label>

            <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" 
                placeholder="" 
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
            
            >
               <option value="">Select source currency</option>
               {Object.keys(currencyNames).map((currency)=>(
                <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                </option>
               ))}
            </select>
        </div>

        <div className='mb-4'>
            <label
             htmlFor={targetCurrency}
             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
              Target currencies 

            </label>

            <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" 
                placeholder="" 
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
            
            >
               <option value="">Select target currency</option>
               {Object.keys(currencyNames).map((currency)=>(
                <option className='p-1' key={currency} value={currency}>
                    {currencyNames[currency]}
                </option>
               ))}
            </select>
        </div>

        <div className='mb-4'>
            <label
             htmlFor={amountInSourceCurrency}
             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
               Amount in source currency

            </label>

            <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" 
                placeholder="Amount in source currency" 
                name={amountInSourceCurrency}
                id={amountInSourceCurrency}
                value={amountInSourceCurrency}

            required />
        </div>

            <button className='bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md'>
                Get the target currency
            </button>
                    
                </form>
            </section>
        </div>
        {! loading?(
        <section className=' lg:mx-60 text-xl  mt-5'>
        
               {amountInSourceCurrency}  {currencyNames[sourceCurrency]}is equals to {""} 
               <span className='text-purple-500 font-bold'>
                {""}
                {amountInTargetCurrency} 
                </span>{""}
                in  {currencyNames[targetCurrency]}
        </section>
        //) : null}//
        
        ) : (
            <div className="text-center mt-5">
            <p className="text-gray-500">Loading...</p>
        </div>
        )}
    
    
    </div>

    

  );
}
