import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getUserBlogs } from "../firebase/firebaseFunc";
import UserCard from "./UserCard";
import { Triangle } from "react-loader-spinner";
import "./SingleBlog";

function SelectedUserBlog() {
  const { uid } = useParams();
  const [userBlog, setUserBlog] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    async function getThisUserBlog() {
      try {
        const { singleUserData } = await getUserBlogs(uid, "blogs");
        setUserBlog([...singleUserData]);
        setUserDetail(singleUserData[0]);
        console.log(singleUserData);
      } catch (error) {
        console.log(error);
      }
    }
    getThisUserBlog();
  }, []);
  return (
    <div>
      {userBlog.length > 0 ? (
        <>
          <div className="flex gap-4 items-center justify-center py-10">
            <img
              className="w-20 h-20 rounded-full"
              src={userDetail.userPic}
              alt="profile"
            />
            <h2>{userDetail.userName}</h2>
          </div>
          {userBlog.map((item, index) => (
            <div key={item.id}>
              <UserCard
                id={item.id}
                blogUrl={item.blogUrl}
                blogTitle={item.blogTitle}
                index={index}
                blogMessage={item.blogMessage}
                display="hidden"
                date={item.date}
              />
            </div>
          ))}
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
      <Outlet />
    </div>
  );
}

export default SelectedUserBlog;