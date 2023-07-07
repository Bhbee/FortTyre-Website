import {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import https from 'https'
import { OrderModel } from '../models/order.model'
import { User, UserModel } from '../models/user.model'
import nodemailer from 'nodemailer'

//Payment initialization with a callback to verify payment(using paystack)
export const PayWithPaystack = asyncHandler(async (req: Request, res: Response) =>{
  const order = await OrderModel.findById(req.params.id).populate('user')
  const user = order?.user as User
  const email = user.email
  const paymentVerificationUrl = 'http://localhost:3000/orders/:id/:reference/verify'; //edit later to hosted base url
  const params = JSON.stringify({
    "email": email,
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
      const reference = req.params.reference  //get from client
  
      // Set up options for the HTTPS request to the Paystack API
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/:${reference}`,
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
  
        apiRes.on('end', () => {
          const responseData = JSON.parse(data);
          if(responseData.data.gateway_response === "Successful"){

            //1. update payment Result
            const order = OrderModel.findById(req.params.id).populate('user')
            if(order) {
              order.isPaid = true
              order.paidAt == new Date (Date.now())
              order.paymentResult = {
                status: responseData.data.gateway_response,
                payment_time: responseData.data.paid_at,
                email_address: responseData.customer.email
              };
              const updatedOrder =  order.save()
              res.send({order: updatedOrder, message: "Payment status updated"})
            } else {
                res.status(404).send({message: "Order does not exist"})
            }
            //2. Show fort tyre home page ----TODO-----
            //3. Send receipt as an email to payer
            const sendMail = asyncHandler(async (req: Request, res: Response) =>{
              const user = order?.user as User
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth:{
                    user: "samuelchristiana38@gmail.com",
                    pass: "lfdeltnqsdtoqbrc"
                }
              })
              var mailOptions = {
                from: "samuelchristiana38@gmail.com",
                to: user.email,
                subject: "Succesful Payment Notification",
                html: ` 
                <p>Your transaction of ${responseData.data.amount} to  Fort Tyre was successful!</p> 
                `
              }
              transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  res.send({ message: 'Unsuccessful.' });
                }else{
                  res.send({ message: 'We sent reset password link to your email.' });
                }
              })
            }) 
          

          }
          //return res.status(200).json(responseData)
        })
      });
  
      clientReq.on('error', (error) => {
        return res.status(500).json({ error: 'An error occurred' });
      });
  
      clientReq.end();
  });