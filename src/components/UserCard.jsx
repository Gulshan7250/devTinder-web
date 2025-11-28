import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try{
      const res = await axios.post(
        BASE_URL+"/request/send/"+status+"/"+userId,
        {},
        {withCredentials: true}
      );
      dispatch(removeUserFromFeed(userId));
    }catch(err){}
  }

  return (
    <div className="card bg-base-200 w-full max-w-sm mx-auto shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
      
      <figure className="w-full h-48 bg-base-300 overflow-hidden rounded-t-xl">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
          src={photoUrl}
          alt="Photo"
        />
      </figure>

      <div className="card-body p-5 text-center">
        <h2 className="card-title justify-center text-xl font-semibold">
          {firstName + " " + lastName}
        </h2>

        {age && gender && (
          <p className="text-sm opacity-70">{age + " • " + gender}</p>
        )}

        <p className="text-sm mt-2 opacity-80 line-clamp-3">{about}</p>

        <div className="card-actions flex justify-center mt-4 gap-3">
          <button className="btn btn-outline btn-sm px-5 rounded-full"
          onClick={()=> handleSendRequest("ignored", _id)}>
            Ignore
          </button>
          <button className="btn btn-primary btn-sm px-5 rounded-full"
          onClick={()=> handleSendRequest("interested", _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
