import { onAuthStateChanged, auth, signOut } from "../firebase/firebaseConfig";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function UserLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState();
  const drawerCheckboxRef = useRef(null); // Add ref for the drawer checkbox

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        setCurrUser(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addBlog = () => {
    if (location.pathname !== "/addblog") {
      navigate("/addblog");
    }
    drawerCheckboxRef.current.checked = false; // Close drawer on link click
  };

  const profilePage = () => {
    if (location.pathname !== "/profilepage") {
      navigate("/profilepage");
    }
    drawerCheckboxRef.current.checked = false; // Close drawer on link click
  };

  return (
    <>
      {currUser ? (
        <div className="drawer">
          <input
            id="my-drawer-3"
            type="checkbox"
            className="drawer-toggle"
            ref={drawerCheckboxRef} // Attach the ref to the checkbox
          />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-[#494949] text-white w-full">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="mx-2 flex-1 px-2 cursor-pointer"><Link to={"/"}>BLOG APP</Link></div>
              <div className="hidden flex-none lg:block">
                <ul className="menu menu-horizontal items-center">
                  {/* Navbar menu content here */}
                  <li>
                    <Link
                      style={{ color: "#fff" }}
                      to={"/"}
                      onClick={() =>
                        (drawerCheckboxRef.current.checked = false)
                      } // Close drawer on link click
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex gap-2" onClick={profilePage}>
                      <img
                        className="rounded-[50%] size-[60px] bg-cover"
                        src={currUser.photoURL || "srcimageimages.png"}
                        alt="profilepic"
                      />
                      <a>{currUser.displayName}</a>
                    </div>
                  </li>
                  <li>
                    <a onClick={addBlog}>Add Blogs</a>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
              <li>
                <Link
                  to={"/"}
                  onClick={() => (drawerCheckboxRef.current.checked = false)} // Close drawer on link click
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex gap-2" onClick={profilePage}>
                  <img
                    className="rounded-full w-[40px] h-[40px] bg-cover"
                    src={currUser.photoURL || "srcimageimages.png"}
                    alt="profile pic"
                  />
                  <a>{currUser.displayName}</a>
                </div>
              </li>
              <li>
                <a onClick={addBlog}>Add Blogs</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="drawer">
            <input
              id="my-drawer-3"
              type="checkbox"
              className="drawer-toggle"
              ref={drawerCheckboxRef} // Attach the ref to the checkbox
            />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="navbar bg-[#494949] text-white w-full">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="mx-2 flex-1 px-2 cursor-pointer text-3xl"><Link to={"/"}>BLOG APP</Link></div>
                <div className="hidden flex-none lg:block">
                  <ul className="menu menu-horizontal items-center">
                    {/* Navbar menu content here */}
                    <li>
                      <Link
                        style={{ color: "#fff" }}
                        to={"/"}
                        onClick={() =>
                          (drawerCheckboxRef.current.checked = false)
                        } // Close drawer on link click
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/login"}
                        onClick={() =>
                          (drawerCheckboxRef.current.checked = false)
                        } // Close drawer on link click
                      >
                        Sign in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/signup"}
                        onClick={() =>
                          (drawerCheckboxRef.current.checked = false)
                        } // Close drawer on link click
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-3"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4">
                <li>
                  <Link
                    to={"/"}
                    onClick={() => (drawerCheckboxRef.current.checked = false)} // Close drawer on link click
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/login"}
                    onClick={() => (drawerCheckboxRef.current.checked = false)} // Close drawer on link click
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/signup"}
                    onClick={() => (drawerCheckboxRef.current.checked = false)} // Close drawer on link click
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserLogin;