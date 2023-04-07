require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY)
const app = express();
app.use(cors());
app.post("/paymentWebhook", express.raw({type: "application/json"}),(req,res) => {
    const sig = req.headers["stripe-signature"];
    console.log(req.body);
    let event;
    const endpointSecret = process.env.STRIPE_WEBHOOK;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (error) {
      console.log(`Webhook Error: ${error.message}`);
    }
    console.log(event);
    console.log(sig)
    if(event.type == "payment_intent.succeeded") {
        console.log();
        //call api or update DB--- call shipping API , Add user to subscribed users
    }

    res.json({ received: true });
})

app.listen(8000, ()=>console.log("app listening at 8000"));
