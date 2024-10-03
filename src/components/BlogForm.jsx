import React from "react";

function BlogForm({
  addingBlog,
  register,
  handleSubmit,
  errors,
  isRequired,
  isSubmitting,
}) {
  return (
    <div>
      <div className="mt-[50px] bg-[#ffffff] shadow-lg w-[90%] sm:w-[500px] md:w-[500px] p-[50px] rounded-md m-auto border border-[#D1D5DB]">
        <h2 className="text-center text-[26px] text-[#111827] font-semibold">
          ADD BLOG
        </h2>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(addingBlog)}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Upload blog image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              id="user_avatar"
              type="file"
              accept=".jpeg, .png, .jpg"
              {...register("blogImg", {
                required: isRequired ? "Image is Required" : false,
              })}
            />
            <p
              className="errClass"
              style={{
                opacity: errors.blogImg ? 1 : 0,
              }}
            >
              {errors.blogImg?.message}
            </p>
          </div>
          <div className="mb-5">
            <label
              htmlFor="blogTitle"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="blogTitle"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="blog title"
              {...register("blogTitle", {
                required: "Blog title is required.",
                minLength: {
                  value: 10,
                  message: "Blog title must be at least 10 characters long.",
                },
                maxLength: {
                  value: 40,
                  message: "Blog title must be at most 40 characters long.",
                },
              })}
            />
            <p
              className="errClass"
              style={{ opacity: errors.blogTitle ? 1 : 0 }}
            >
              {errors.blogTitle?.message}
            </p>
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Description
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add Description"
              {...register("blogMessage", {
                required: "Blog Description is required.",
                minLength: {
                  value: 100,
                  message:
                    "Blog description must be at least 100 characters long.",
                },
                maxLength: {
                  value: 500,
                  message:
                    "Blog description must be at most 500 characters long.",
                },
              })}
            />
            <p
              className="errClass"
              style={{
                opacity: errors.blogMessage ? 1 : 0,
              }}
            >
              {errors.blogMessage?.message}
            </p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // Disable when submitting
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isSubmitting ? "Adding..." : "Add Blog"} {/* Change button text */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;