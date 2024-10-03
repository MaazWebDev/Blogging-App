import React, { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebaseConfig";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { createUser } from "../firebase/firebaseFunc.js";
import Swal from "sweetalert2";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
      setLoading(false);
    });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  async function loggedIn(data) {
    const { email, password, profile, first_name, last_name, repeat_password } =
      data;
    if (
      !email ||
      !password ||
      !profile ||
      !first_name ||
      !last_name ||
      !repeat_password
    ) {
      return;
    }
    try {
      await createUser(email, password, profile, first_name, last_name);
      navigate("/");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Welcome",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Auth Error",
        text: error.message,
      });
    }
  };
  return (
    <>
      {loading ? (
        <div className="absolute top-0 flex justify-center items-center w-full h-full bg-black">
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#fff"
            ariaLabel="triangle-loading"
          />
        </div>
      ) : (
        <div
          className="h-full flex items-center"
          style={{
            background:
              "#e5e7eb",
          }}
        >
          <div className="shadow-lg w-[90%] sm:w-[600px] p-[50px] rounded-md m-auto bg-[#f9f9f9] my-12">
            <h2 className="text-center text-[30px] font-semibold mb-10">
              Welcome to Signup Page
            </h2>
            <form
              className="max-w-md mx-auto"
              onSubmit={handleSubmit(loggedIn)}
            >
              {/* Profile Picture Upload */}
              <div className="relative z-0 w-full mb-5 group">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file_input"
                >
                  Upload Profile Picture
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  id="file_input"
                  type="file"
                  {...register("profile", {
                    required: "Profile Picture is Required",
                  })}
                  accept=".jpeg, .png, .jpg"
                />
                <p
                  className="errClass"
                  style={{
                    opacity: errors.profile ? 1 : 0,
                  }}
                >
                  {errors.profile?.message}
                </p>
              </div>
              {/* Email Input */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("email", { required: "Email is required" })}
                />

                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email Address
                </label>
                <p
                  className="errClass"
                  style={{
                    opacity: errors.email ? 1 : 0,
                  }}
                >
                  {errors.email?.message}
                </p>
              </div>

              {/* Password Input */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Password should be at least 7 characters long",
                    },
                  })}
                />
                <p
                  className="errClass"
                  style={{
                    opacity: errors.password ? 1 : 0,
                  }}
                >
                  {errors.password?.message}
                </p>
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>

              {/* Confirm Password Input */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  {...register("repeat_password", {
                    required: "Repeat password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                <p
                  className="errClass"
                  style={{
                    opacity: errors.repeat_password ? 1 : 0,
                  }}
                >
                  {errors.repeat_password?.message}
                </p>
                <label
                  htmlFor="repeat_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
              </div>

              {/* First Name Input */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("first_name", {
                      required: "First Name is required",
                    })}
                  />
                  <p
                    className="errClass"
                    style={{
                      opacity: errors.first_name ? 1 : 0,
                    }}
                  >
                    {errors.first_name?.message}
                  </p>
                  <label
                    htmlFor="first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First Name
                  </label>
                </div>

                {/* Last Name Input */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    {...register("last_name", {
                      required: "Last Name is required",
                    })}
                  />
                  <p
                    className="errClass"
                    style={{
                      opacity: errors.last_name ? 1 : 0,
                    }}
                  >
                    {errors.last_name?.message}
                  </p>
                  <label
                    htmlFor="last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last Name
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Sign up
              </button>
            </form>

            {/* Link to Sign In */}
            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link className="font-semibold text-red-950" to={"/login"}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;