import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { useForm } from "react-hook-form";
import { getSingleDoc, imageToUrl, updateSingleDoc } from "../firebase/firebaseFunc";
import { useNavigate, useParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import Swal from "sweetalert2";

function EditBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  async function getSingleBlog() {
    try {
      const singleBlog = await getSingleDoc(id, "blogs");
      console.log(singleBlog); // Debugging fetched blog

      if (singleBlog) {
        reset({
          blogTitle: singleBlog.blogTitle,
          blogMessage: singleBlog.blogMessage,
        });
        setLoading(false);
      } else {
        console.error("No blog found with this ID");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  }

  useEffect(() => {
    getSingleBlog();
  }, [id]); // Removed reset from dependencies

  const addingBlog = async (data) => {
    const { blogImg, blogTitle, blogMessage } = data;
    setIsSubmitting(true);
    try {
      let url = "";

      // Handle new image or keep existing URL
      const singleBlog = await getSingleDoc(id, "blogs");
      url = singleBlog?.blogUrl || ""; // Keep existing URL if no new image

      // Check if a new image is uploaded
      if (blogImg && blogImg.length > 0) {
        url = await imageToUrl(blogImg, "BlogImage");
      }

      // Update the blog
      await updateSingleDoc(id, "blogs", blogTitle, blogMessage, url);

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Blog Has Been Edited",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/addblog");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          />
        </div>
      ) : (
        <BlogForm
          register={register}
          handleSubmit={handleSubmit}
          addingBlog={addingBlog}
          errors={errors}
          isRequired={false}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default EditBlog;
