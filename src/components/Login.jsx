import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!emailId.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId: emailId.trim(), password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try{
      const res =await axios.post(
        BASE_URL+"/signup",
        { firstName, lastName, emailId, password},
        {withCredentials: true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");

    }catch(err){
    setError(err?.response?.data?.message || err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  

  const onKey = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="card bg-base-200 w-full max-w-md shadow-lg rounded-xl">
        <div className="card-body p-6">
          <h2 className="card-title justify-center text-2xl font-semibold">
            {isLoginForm ? "Login":"SignUp"}
          </h2>

          {error && (
            <div className="alert alert-error shadow-sm my-3">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current h-5 w-5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {!isLoginForm && (
          <>
          <label className="label">
          <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDown={onKey}
            aria-label="First Name"
          />

            <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={onKey}
            aria-label="Last Name"
          />
          </>
          )}

          <label className="label">
            <span className="label-text">Email ID</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="you@example.com"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            onKeyDown={onKey}
            aria-label="Email ID"
          />

          <label className="label mt-4">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-20"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={onKey}
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="card-actions justify-center mt-6">
            <button
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              onClick={isLoginForm? handleLogin: handleSignUp}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>

          <p className="text-xs text-center opacity-70 mt-3 cursor-pointer" onClick={()=>setIsLoginForm((value) => !value)}>
            {isLoginForm
            ? "New User? Signup Here"
            : "Existing User? Login Here"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
