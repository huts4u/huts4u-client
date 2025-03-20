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
  

export function hotelRegister(payLoad:any){
    return client.post('/auth/register', payLoad);
}

export function SignIn(payLoad:any){
    return client.post('/auth/login', payLoad);
}

export function hotelPost(payLoad:any){
    return client.post('/Hotel/create', payLoad);
}
export function roomPost(payLoad:any){
    return client.post('/Room/insertMany', payLoad);
}

export function docsUpload(payLoad:any) {
    return client.post("/auth/upload-doc", payLoad);
}

export function getMyAllHotels(payLoad:any){
    return client.post('/Hotel/search-record', payLoad);
}
export function getMyAllHotelswithBelongsTo(payLoad:any){
    return client.post('/Hotel/get-all-record-with-belongs-to', payLoad);
}

export function getProfile(){
    return client.get('/auth/profile');
}

export function getAllHotels(payLoad:any){
    return client.post('/Hotel/search-record', payLoad);
}