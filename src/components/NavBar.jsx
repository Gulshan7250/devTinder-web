import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(
        BASE_URL+"/logout",{},{
          withCredentials: true
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    }catch(err){

    }
  }

  return (
   <div className="navbar bg-base-300 shadow-sm px-4 md:px-8">
  {/* left: brand / title (always left) */}
  <div className="flex items-center gap-3">
    <Link to="/" className="btn btn-ghost normal-case text-lg md:text-xl flex items-center gap-2">
      <span className="text-2xl">🧑‍💻</span>
      <span className="font-semibold">DevTinder</span>
    </Link>
  </div>

  {/* spacer */}
  <div className="flex-1"></div>

  {/* right: user area */}
  {user && (
    <div className="flex items-center gap-3">
      {/* welcome text - hidden on very small screens */}
      <p className="hidden sm:block text-sm px-2">Welcome, {user.firstName}</p>

      {/* mobile hamburger (visible on small only) */}
      <div className="md:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-square" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-48">
            <li>
              <Link to="/profile" className="justify-between">
                Profile <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><button onClick={handleLogout} className="w-full text-left">Logout</button></li>
          </ul>
        </div>
      </div>

      {/* avatar + dropdown (desktop) */}
      <div className="dropdown dropdown-end hidden md:block">
        <label
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar focus:outline-none"
          aria-haspopup="true"
          aria-expanded="false"
          title={`Open menu for ${user.firstName}`}
        >
          <div className="w-10 rounded-full overflow-hidden ring-1 ring-primary/25">
            <img alt={`${user.firstName} avatar`} src={user.photoUrl} className="object-cover w-full h-full" />
          </div>
        </label>

        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li>
            <Link to="/premium">Premium</Link>
          </li>
          <li><button onClick={handleLogout} className="w-full text-left">Logout</button></li>
        </ul>
      </div>
    </div>
  )}
</div>

  );
};

export default NavBar;
