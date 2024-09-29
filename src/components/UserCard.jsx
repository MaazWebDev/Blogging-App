import React from "react";

function UserCard({
  id,
  blogTitle,
  blogUrl,
  deleteBlog,
  index,
  blogMessage,
  display,
  editBlog,
}) {
  // const deletAlert = (id, index) => {
  //   deleteBlog(id, index);
  // };
  return (
    <div className="card card-side bg-base-100 shadow-xl p-5 flex-col mx-auto mt-5 w-[90%] sm:w-[600px] md:w-[750px] items-start justify-center">
      <div className="sm:px-8">
        <figure className="w-[80%] sm:w-[400px] h-[250px] m-auto">
          <img
            className="w-full h-full object-fill"
            src={blogUrl}
            alt={blogTitle}
          />
        </figure>
      </div>
      <div className="card-body">
        <h2 className="card-title">{blogTitle}</h2>
        <p>{blogMessage}</p>
        {/* <div className="card-actions justify-start mt-3">
          <button
            onClick={() => editBlog(id)}
            className={`btn btn-primary ${display}`}
          >
            Edit
          </button>
          <button
            onClick={() => deletAlert(id, index)}
            className={`btn btn-error ${display}`}
          >
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default UserCard;
