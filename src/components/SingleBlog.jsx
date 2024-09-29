import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { getSingleDoc } from "../firebase/firebaseFunc";

function SingleBlog() {
  const [singleBlog, setSingleBlog] = useState(null);
  const { id } = useParams();

  const getSingleBlog = async () => {
    try {
      const docSnap = await getSingleDoc(id, "blogs");
      setSingleBlog(docSnap);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleBlog();
  }, []);

  return (
    <div>
      {singleBlog ? (
        <>
          <div className="w-full my-20 flex justify-center items-center">
            <div className="card lg:card-side bg-[#ffffff] drop-shadow-2xl w-[80%] sm:w-[500px] md:w-[500px] lg:w-[800px] m-auto p-[20px] lg:p-[40px] border border-[#D1D5DB]">
              <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[400px]">
                <div className="h-full">
                  <img
                    className="h-[100%] w-[100%]"
                    src={singleBlog.blogUrl}
                    alt={singleBlog.blogTitle}
                  />
                </div>
              </div>
              <div className="card-body text-[#111827] w-[100%] sm:w-[100%] md:w-[100%] lg:w-[400px]">
                <h2 className="card-title">
                  Title <br />
                  {singleBlog.blogTitle}
                </h2>
                <p>
                  Description <br /> {singleBlog.blogMessage}
                </p>
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mb-5">
            <h3 className="text-2xl font-bold">Created BY</h3>
            <div className="flex items-center mt-4">
              <img
                className="w-20 h-20 rounded-full mr-4"
                src={singleBlog.userPic}
                alt="profile"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {singleBlog.userName}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute top-0 flex justify-center items-center w-full h-full bg-black">
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#fff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
}

export default SingleBlog;
