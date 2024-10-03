import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "../firebase/firebaseConfig";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";
import { Triangle } from "react-loader-spinner";

function Login() {
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

  const signIn = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("/");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Welcome",
        text: user.displayName,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Auth Error",
        text: error.message,
      });
    }
  };

  const socialMediaAuth = (providerName) => {
    const provider = new providerName();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a  Access Token. You can use it to access the Google API.
        const credential = providerName.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = providerName.credentialFromError(error);
        Swal.fire({
          icon: "error",
          title: "Auth Error",
          text: errorMessage,
        });
        // ...
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          className="h-full sm:h-[100%] flex items-center"
          style={{
            background:
              "#e5e7eb",
          }}
        >
          <div className="shadow-lg w-[90%] sm:w-[500px] bg-[#f9f9f9]  md:w-[500px] py-[70px] px-[50px] rounded-md m-auto my-10">
            <h2 className="text-center text-[30px] font-semibold mb-10">
              Welcome to the login page
            </h2>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(signIn)}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                <p
                  className="errClass"
                  style={{
                    opacity: errors.email ? 1 : 0,
                  }}
                >
                  {errors.email?.message}
                </p>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("password", {
                    required: "Password is required",
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
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
            </form>
            <div className="text-center mt-5">Or sign in using</div>
            <div className="flex justify-center items-center gap-4 mt-4 text-[25px]">
              <FcGoogle
                onClick={() => socialMediaAuth(GoogleAuthProvider)}
                className="cursor-pointer"
              />
              <FaFacebook
                onClick={() => socialMediaAuth(FacebookAuthProvider)}
                className="cursor-pointer text-blue-600"
              />
              <FaGithub
                onClick={() => socialMediaAuth(GithubAuthProvider)}
                className="cursor-pointer"
              />
            </div>
            <div className="text-center mt-4">
              Don't have an account?{" "}
              <Link className="font-semibold text-red-950" to={"/signup"}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;