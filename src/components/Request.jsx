import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl mb-6">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row gap-4 m-4 p-6 rounded-2xl bg-base-200 shadow-md hover:shadow-xl w-full sm:w-3/4 md:w-1/2 mx-auto transition-all duration-200"
          >
            {/* Image */}
            <div className="flex justify-center sm:block">
              <img
                className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
                src={photoUrl}
                alt="photo"
              />
            </div>

            {/* Details */}
            <div className="text-left flex-1">
              <h2 className="text-xl font-semibold">
                {firstName + " " + lastName}
              </h2>

              {age && gender && (
                <p className="text-sm opacity-70 mt-1">
                  {age + " • " + gender}
                </p>
              )}

              <p className="mt-2 text-sm leading-relaxed opacity-80">{about}</p>
            </div>

            {/* Buttons */}
            <div className="flex sm:flex-col gap-2 justify-center">
              <button className="btn btn-outline btn-sm sm:btn-md rounded-full">
                Reject
              </button>
              <button className="btn btn-primary btn-sm sm:btn-md rounded-full">
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
