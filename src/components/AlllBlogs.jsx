import React, { useEffect, useState } from "react";
import { collection, db, getDocs } from "../firebase/firebaseConfig";
import { Triangle } from "react-loader-spinner";
import { Outlet } from "react-router-dom";
import Card from "./Card";
import { getUserBlogs } from "../firebase/firebaseFunc";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // loading ko truee rkhna hy
  const [greet, setGreet] = useState(null);

  const getAllBlogs = async () => {
    setLoading(true); 
    try {
      const { allUserData } = await getUserBlogs("", "blogs");
      console.log("Fetched Blogs:", allUserData); // fetch kiye hoye blog ko dekhna
      setBlogs([...allUserData]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false); // ruk jaye ga fetch ky bd
    }
  };

  const greetingFunc = () => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    let timePeriod = hour % 12 || 12;
    const time = `${timePeriod.toString().padStart(2, "0")} : ${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const meridian = hour >= 0 && hour < 12 ? "AM" : "PM";

    if (hour >= 5 && hour <= 11) {
      setGreet(`Good Morning! It's ${time} ${meridian}`);
    } else if (hour >= 12 && hour <= 17) {
      setGreet(`Good Afternoon! It's ${time} PM`);
    } else if (hour >= 18 && hour <= 21) {
      setGreet(`Good Evening! It's ${time} PM`);
    } else {
      setGreet(`Good Night! Sweet Dreams It's ${time} ${meridian}`);
    }
  };

  useEffect(() => {
    getAllBlogs();
    greetingFunc();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="absolute top-0 flex justify-center items-center w-full h-full bg-black">
          <Triangle visible={true} height="100" width="100" color="#fff" />
        </div>
      ) : (
        <>
          <h1 className="mt-6 pl-4 text-[27px]">{greet && greet}</h1>
          <div className="flex justify-center gap-5 flex-wrap mt-10">
            {blogs.length > 0 ? (
              blogs.map((item) => (
                <div key={item.id}>
                  <Card
                    title={item.blogTitle}
                    img={item.blogUrl}
                    id={item.id}
                    uid={item.uid}
                    blogMessage={item.blogMessage}
                  />
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default AllBlogs;
