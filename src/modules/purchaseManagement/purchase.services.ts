import { TPurchase } from "./purchase.interface";
import PurchaseModel from "./purchase.model";
import express from 'express';

import { v4 as uuidv4 } from 'uuid'; // For generating unique transaction IDs
import SSLCommerz from 'sslcommerz-lts';
import InventoryModel from "../inventory/inventory.model";

const router = express.Router();
let purchaseInfo : any;

const CreatePurchaseDB = async (payload :TPurchase) => {
  purchaseInfo = payload;
  const random_id = uuidv4();
  const data = {
    store_id: 'test647cd0a6914b9',
    store_passwd: 'test647cd0a6914b9@ssl',
    total_amount: payload?.price,
    currency: 'BDT',
    tran_id: random_id,
    success_url: 'https://assignment-five-seven.vercel.app/payment/success',
    fail_url: 'https://assignment-five-seven.vercel.app/payment/fail',
    cancel_url: 'https://assignment-five-seven.vercel.app/payment/cancel',
    ipn_url: 'http://localhost:5000/ipn',
    shipping_method: 'Courier',
    product_name: payload?.name,
    product_category: payload?.category,
    product_profile: 'general',
    cus_name: payload?.buyerName,
    cus_email: payload?.buyerEmail,
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: '1000',
    ship_country: 'Bangladesh',
  };

  try {
    const sslcz = new SSLCommerz('test647cd0a6914b9', 'test647cd0a6914b9@ssl', false);
    const apiResponse = await sslcz.init(data);

    if (apiResponse.GatewayPageURL) {
      return { url: apiResponse.GatewayPageURL };
    } else {
      throw new Error('GatewayPageURL not found in the response');
    }
  } catch (error) {
    console.error('Error during SSLCommerz API call:', error);
    throw new Error('Internal Server Error');
  }
};

router.post('/success', async (req, res) => {
  try {
    const result = await PurchaseModel.create(purchaseInfo);
    if (result) {

      const updateresult = await InventoryModel.updateOne(
        { _id: purchaseInfo?.productId },
        { $inc: { quantity: -purchaseInfo?.quantity } }
      );

      if(updateresult){
        res.redirect('https://computer-management-dashboard.firebaseapp.com/dashboard/payment/success');
      }
      else{
        res.redirect('https://computer-management-dashboard.firebaseapp.com/dashboard/payment/fail');
      }
      
    } else {
      res.redirect('https://computer-management-dashboard.firebaseapp.com/dashboard/payment/fail');
    }
  } catch (error) {
    console.error('Error during purchase creation:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/fail', (req, res) => {
  console.log('Fail route hit');
  console.log('Request body:', req.body);
  res.redirect('https://computer-management-dashboard.firebaseapp.com/dashboard/payment/fail');
});

router.post('/cancel', (req, res) => {
  console.log('Cancel route hit');
  console.log('Request body:', req.body);
  res.redirect('https://computer-management-dashboard.firebaseapp.com/dashboard/payment/cancel');
});

const GetPurchaseDB = async () => {
  const result = await PurchaseModel.find();
  return result;
};
const GetSinglePurchaseDB = async (buyerEmail: string) => {
  const result = await PurchaseModel.find({ buyerEmail });

  return result;
};

export const PurchaseServices = {
  CreatePurchaseDB,
  GetPurchaseDB,
  GetSinglePurchaseDB,
};

export { router };
