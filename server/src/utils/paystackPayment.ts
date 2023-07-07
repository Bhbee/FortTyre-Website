import { Request, Response } from "express";

const paystack = (request: Request): any => {
  const PaystackSecretKey = process.env.PUBLIC_KEY;

  const initializePayment = (form: any, mycallback: Function): void => {
    const options = {
      url: 'api.paystack.co/transaction/initialize',
      headers: {
        Authorization: PaystackSecretKey,
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (error: any, response: Response, body: any) => {
      return mycallback(error, body);
    };
    request.post(options, callback);
  };

  const verifyPayment = (ref: string, mycallback: Function): void => {
    const options = {
      url: `api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
      headers: {
        Authorization: PaystackSecretKey,
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const callback = (error: any, response: Response, body: any) => {
      return mycallback(error, body);
    };
    request.post(options, callback);
  };

  return { initializePayment, verifyPayment };
};

export = paystack;


















// import { error } from "console"

// const paystack = (request)=>{
//     const PaystackSecretKey = process.env.TZ

//     const initializePayment = (form, mycallback)=>{
//         const options = {
//             url: 'api.paystack.co/transaction/initialize',
//             headers: {
//               Authorization: process.env.PUBLIC_KEY, 
//               'Content-Type': 'application/json',
//               'cache-control': 'no-cache'
//             },
//             form
//         }
//         const callback = (error, response, body) =>{
//             return mycallback(error, body)
//         }
//         request.post(options, callback)
//     }

//     const verifyPayment = (ref, mycallback) =>{
//         const options = {
//             url: 'api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
//             headers: {
//               Authorization: process.env.PUBLIC_KEY, 
//               'Content-Type': 'application/json',
//               'cache-control': 'no-cache'
//             }
//         }
//         const callback = (error, response, body) =>{
//             return mycallback(error, body)
//         }
//         request.post(options, callback)
//     }
//     return {initializePayment, verifyPayment}
// }

// module.exports = paystack