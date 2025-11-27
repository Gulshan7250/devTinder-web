import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;

  if (connections.length === 0) return <h1>No Connection Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 m-4 p-6 rounded-2xl bg-base-200 shadow-md hover:shadow-xl w-full sm:w-3/4 md:w-1/2 mx-auto transition-all duration-200"
          >
            {/* Photo */}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
