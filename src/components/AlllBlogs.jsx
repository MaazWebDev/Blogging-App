import React, { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { Outlet } from "react-router-dom";
import Card from "./Card";
import { getUserBlogs } from "../firebase/firebaseFunc";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [greet, setGreet] = useState(null);

  const getAllBlogs = async () => {
    try {
      const { allUserData } = await getUserBlogs("", "blogs");
      setBlogs([...allUserData]);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching blogs:", error); // Error handling
      setLoading(false); // Set loading to false in case of error
    }
  };
  const greetingFunc = () => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    let timePeriod;
    if (hour > 12) {
      timePeriod = hour % 12;
    } else if (hour === 0) {
      timePeriod = 12;
    } else {
      timePeriod = hour;
    }
    const time = `${timePeriod.toString().padStart(2, "0")} : ${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    if (hour >= 5 && hour <= 11) {
      setGreet(
        `Good Morning! it's  ${time} ${hour >= 0 && hour < 12 ? "AM" : "PM"}`
      );
    } else if (hour >= 12 && hour <= 17) {
      setGreet(`Good After Noon! it's ${time} PM`);
    } else if (hour >= 18 && hour <= 21) {
      setGreet(`Good Evening! it's ${time} PM`);
    } else {
      setGreet(
        `Good Night! Sweet Dreams it's ${time} ${
          hour >= 0 && hour < 12 ? "AM" : "PM"
        } `
      );
    }
  };

  useEffect(() => {
    greetingFunc();
    getAllBlogs();
  }, []);

  return (
    <div>
      {loading ? (
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
      ) : (
        <>
          <h1 className="mt-6 pl-4 text-[27px]">{greet && greet}</h1>
          <div className="flex justify-center gap-5 flex-wrap mt-10">
            {blogs.map((item) => (
              <div key={item.id}>
                <Card
                  title={item.blogTitle}
                  img={item.blogUrl}
                  id={item.id}
                  uid={item.uid}
                  date={item.date}
                  userName={item.userName}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default AllBlogs;