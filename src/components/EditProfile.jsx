import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("First & last name required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || err?.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    user && (
      <div className="px-4 my-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Form */}
            <div className="flex-1">
              <div className="card bg-base-200 shadow-md rounded-2xl overflow-hidden">
                <div className="card-body p-5">
                  <h2 className="card-title justify-center text-lg md:text-xl">
                    Edit Profile
                  </h2>

                  <label className="label mt-2">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <label className="label mt-3">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="label">
                        <span className="label-text">Age</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="input input-bordered w-full"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="label mt-3">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Image link"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />

                  <label className="label mt-3">
                    <span className="label-text">About</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    placeholder="Short bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />

                  <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center">
                    <button
                      className={`btn btn-primary ${loading ? "loading" : ""}`}
                      onClick={saveProfile}
                      disabled={loading}
                    >
                      Save Profile
                    </button>

                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="w-full lg:w-80">
              <div className="sticky top-6">
                <UserCard
                  user={{ firstName, lastName, photoUrl, age, gender, about }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed left-1/2 top-6 transform -translate-x-1/2 pointer-events-none">
            <div className="toast pointer-events-auto">
              <div className="alert alert-success shadow-lg">
                <div>
                  <span>Profile saved successfully.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
