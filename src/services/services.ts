import { client } from "./axiosClient";


export function sendOTP(payLoad:any){
    return client.post('/auth/send-otp', payLoad);
}

export function verifyOTP(payLoad:any){
    return client.post('/auth/verify-otp', payLoad);
}

export function Signup(payLoad:any){
    return client.post('/auth/create', payLoad);
}
export function getPortfolioDetails(phoneNumber: any) {
    return client.get(`/User/search-one-record`, { params: { phoneNumber } });
};

export function verifyPayment (payload:any) {
    return client.post(`/razorpay/verify`, payload);
};
export function createOrder (payload:any) {
    return client.post(`/razorpay/orders`, payload);
  };
  