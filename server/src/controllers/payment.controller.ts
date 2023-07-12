import {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import https from 'https'
import { OrderModel } from '../models/order.model'
import { PaymentModel, Payment } from '../models/payment.model'
import { User, UserModel } from '../models/user.model'
import MailHandler from '../utils/mailHandler'

//Payment initialization with a callback to verify payment(using paystack)
export const PayWithPaystack = asyncHandler(async (req: Request, res: Response) =>{
  const order = await OrderModel.findById(req.params.id).populate('user')
  const user = order?.user as User
  const email = user.email
  const first_name = user.first_name
  const last_name = user.last_name
  const id = req.params.id
  const paymentVerificationUrl = `http://localhost:3000/orders/pay/verify/${id}`; //edit later to hosted base url
  const params = JSON.stringify({
    "email": email,
    "first_name": first_name,
    "last_name": last_name,
    "amount": (order?.totalPrice as number) * 100,
    "callback_url": paymentVerificationUrl
  })
  
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: process.env.PUBLIC_KEY, 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  }
  // client request to paystack API
  const clientReq = https.request(options, apiRes => {
    let data = ''
    apiRes.on('data', (chunk) => {
      data += chunk
    });
    apiRes.on('end', () => {
      
      const responseData = JSON.parse(data);
      return res.status(200).json(responseData); 
      //const authorizationUrl = responseData.data.authorization_url;
      //res.redirect(authorizationUrl); // Redirect to Paystack authorization URL
    })

  }).on('error', error => {
    return res.status(500).json({ error: 'An error occurred' });
  })
  clientReq.write(params)
  clientReq.end()
})



//verify payment and update order payment details
export const VerifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const reference = req.query.reference  //get from client

  // Set up options for the HTTPS request to the Paystack API
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: 'GET',
    headers: {
      Authorization: process.env.PUBLIC_KEY, // Replace with your secret key
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
  };

  // Send the request to the Paystack API
  const clientReq = https.request(options, apiRes => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', async () => {
      const responseData = JSON.parse(data);
      if(responseData.data.gateway_response === "Successful"){
        // Add new payment to database
        const payment = await PaymentModel.create({
          order: req.params.id,
          email: responseData.data.customer.email,
          amount: responseData.data.amount / 100,
          reference: responseData.data.reference,
          status:responseData.data.status
        });

        //2. update order's payment Result
        const order = await OrderModel.findById(req.params.id);

        if (order) {
          order.paymentInfo = payment._id
          order.isPaid = true;
          order.paidAt = new Date(Date.now());
        
          const updatedOrder = await order.save();
          res.send({ message: "Order payment Updated", order: updatedOrder });
          //Show fort tyre updated order page 
        } else {
          res.status(404).send({ message: "Order does not exist" });
        }
        //3. Send receipt as an email to payer
        const mailHandler = new MailHandler();
        mailHandler.sendEmail(responseData.data.customer.email, 
          'Payment Successful Notification',
            `<p>Your transaction of ${responseData.data.amount / 100}naira to  Fort Tyre was successful!</p> `,
            (error:any, info:any)=>{
              if (error) {
                res.status(500).json({ error: 'An error occurred while sending the email.' });
              } else {
                res.status(200).json({ message: 'Email sent successfully!', response: info?.response });
              }
            });
      
      }
      else{
        res.send({ message: "Payment not succesful" })
      }
    })
      
  })
  clientReq.on('error', (error) => {
    console.log(error)
    return res.status(500).json({ error: 'An error occurred' });
  });

  clientReq.end();

});
