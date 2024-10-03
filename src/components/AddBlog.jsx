import React, { useEffect, useState } from "react";
import {
  db,
  onAuthStateChanged,
  auth,
  doc,
  deleteDoc,
} from "./../firebase/firebaseConfig";
import { getUserBlogs, addingBlogToFirestore } from "../firebase/firebaseFunc";
import BlogForm from "./BlogForm";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import UserCard from "./UserCard";
import "./EditBlog"

function AddBlog() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null); // Changed initial state to null
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); // Reset user when logged out
      }
    });
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { singleUserData } = await getUserBlogs(user.uid, "blogs");
      setUserBlogs(singleUserData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]); // Add user as a dependency

  const addingBlog = async (data) => {
    const { blogImg, blogTitle, blogMessage } = data;

    if (!blogImg || !blogTitle || !blogMessage) {
      return;
    }
    setIsSubmitting(true);

    try {
      const { blogUrl, docId } = await addingBlogToFirestore(
        // calling addBlog Function to save blog in firestore and recieving blogImage url and id
        "blogImage", // folder Ref
        blogImg, // image file
        "blogs", // collection name
        blogTitle, // title
        blogMessage, // description
        user // current login user
      );

      getData();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Blog Has Been Added",
        showConfirmButton: false,
        timer: 1500,
      });
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Error adding blog:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setIsSubmitting(false);
  };

  const editBlog = (id) => {
    navigate(`/Editblog/${id}`);
  };

  const deleteBlog = async (id, index) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      userBlogs.splice(index, 1);
      setUserBlogs([...userBlogs]);
    } catch (error) {
      console.error("Error deleting blog:", error);
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <BlogForm
            addingBlog={addingBlog}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isRequired={true}
            isSubmitting={isSubmitting}
          />
          {/* Blog rendering */}
          <h2 className="text-center font-semibold text-[30px] my-10">
            User Blogs
          </h2>
          {userBlogs.length > 0 ? (
            userBlogs.map((item, index) => (
              <div key={item.id}>
                <UserCard 
                id={item.id}
                blogUrl={item.blogUrl}
                blogTitle={item.blogTitle}
                index={index}
                blogMessage={item.blogMessage}
                EditBlog={ editBlog}
                deleteBlog={deleteBlog}
                display={"block"}
                date={item.date}
                />
              </div>
            ))
          ) : (
            <p className="text-center mt-5">NO BLOGS FOUND!</p>
          )}
        </>
      )}
    </>
  );
}

export default AddBlog;