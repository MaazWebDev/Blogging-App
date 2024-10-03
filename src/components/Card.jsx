import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ img, title, id, uid, date, userName }) {
  const navigate = useNavigate();

  const singleBlog = () => {
    navigate(`/singleblog/${id}`);
  };
  const seeAllBlog = () => {
    navigate(`/selecteduserblog/${uid}`);
  };
  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); // Convert Firestore Timestamp to Date object
    return date.toLocaleDateString("en-US", {
      // Format the date
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="w-[380px] h-[420px] max-w-sm bg-[#FFffff] border border-[#D1D5DB] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col cursor-auto">
      <img className="w-full h-[220px] rounded-t-lg" src={img} alt={title} />

      <div className="flex flex-col p-5 flex-grow">
        <h6 className="text-[14px]">
          {userName} | {formatDate(date)}
        </h6>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#111827] dark:text-white">
          {title}
        </h5>
        <div className="mt-auto flex">
          <a
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            onClick={singleBlog}
          >
            Read more
          </a>
          <a
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4 cursor-pointer"
            onClick={seeAllBlog}
          >
            See All ...
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;