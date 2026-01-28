import axios from "axios";
import {BASE_URL} from "../utils/constant";
import { useEffect, useState } from "react";

const Premium = () => {

  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if(res.data.isPremium){
      setIsUserPremium(true);
    }
  };


  const handleBuyClick = async (type) => {
      const order = await axios.post(BASE_URL + "/payment/create", {
         membershipType: type,
      },
    {
      withCredentials: true,
    }
    );

    // It should open the Razorpay dialog box
      const {amount, keyId, currency, notes, orderId} = order.data;

        const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits.
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developers',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler: verifyPremiumUser,
      };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return isUserPremium ? (
  "You're already a premium user"
  ): (
    <div className="container mx-auto px-4 py-6">
      {/* grid: 1 column on mobile, 2 on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
        {/* Card 1 */}
        <div className="card w-full max-w-md bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Popular</span>

            <div className="flex justify-between items-center mt-2">
              <h2 className="text-2xl md:text-3xl font-bold">Silver Membership</h2>
              <span className="text-lg md:text-xl font-semibold">₹299</span>
            </div>

            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Chat with other people</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>100 connection Requests per day</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Blue Tick</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>3 Month</span>
              </li>

              <li className="flex items-center opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="line-through">Infinite Connection Requests per day</span>
              </li>

              <li className="flex items-center opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="line-through">6 Month</span>
              </li>
            </ul>

            <div className="mt-6">
              <button onClick={()=> handleBuyClick("silver")} className="btn btn-primary w-full">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card w-full max-w-md bg-base-100 shadow-sm">
          <div className="card-body">
            <span className="badge badge-xs badge-warning">Most Popular</span>

            <div className="flex justify-between items-center mt-2">
              <h2 className="text-2xl md:text-3xl font-bold">Gold Membership</h2>
              <span className="text-lg md:text-xl font-semibold">₹499</span>
            </div>

            <ul className="mt-6 flex flex-col gap-2 text-xs">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Chat with other people</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>100 connection Requests per day</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Blue Tick</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>6 Month</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Infinite Connection Requests per day</span>
              </li>
            </ul>

            <div className="mt-6">
              <button 
              onClick={() => handleBuyClick("gold")} 
              className="btn btn-primary w-full">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Premium;
