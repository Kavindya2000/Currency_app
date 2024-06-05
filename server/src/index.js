const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express ();

app.use (express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async(req,res)=>{
const nameURL =
 "https://openexchangerates.org/api/currencies.json?app_id=6b44cd0b8b034728af67d7430d1ff1ec";
try{

const namesResponce= await axios.get(nameURL);
const nameData = namesResponce.data;

return res.json(nameData);
} catch (err){
    console.error(err);
}

});

app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

    try {
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=6b44cd0b8b034728af67d7430d1ff1ec`; 
        const dataResponse = await axios.get(dataUrl);
        const rates = dataResponse.data.rates;

        // Rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        // Final target value
        let targetAmount;
        try {
            targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
            // Round to 2 decimal places
            targetAmount = targetAmount.toFixed(2);
        } catch (calculationError) {
            console.error("Error during calculation:", calculationError);
            return res.status(400).json({ error: "Error during calculation" });
        }

        return res.json(targetAmount);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.listen(5000 , ()=>{
    console.log("SERVER STARTED");

});



