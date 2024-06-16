import { useState, useEffect } from "react";
import Card from "./Card";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const PostFormCard = () => {
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setAuthorId(userData.userId);
    }
  }, []);

  const [createpost, setCreatePost] = useState({
    caption: "",
    image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", createpost.image);
      formData.append("caption", createpost.caption);

      const response = await axios.post(
        "http://localhost:8080/post/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      console.log("post created");
      toast.success("Post created Successfully!", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });

      setCreatePost({
        caption: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating post :", error);
      toast.error("Failed to create post. Please try again later.", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCreatePost((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  return (
    <Card>
      <ToastContainer />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="">
        <p className="font-bold text-center">Share Your Fitness Journey</p>
          <div>
            <textarea
              type="text"
              id="caption"
              name="caption"
              className="grow p-3 h-14 mt-1 0 block w-full text-md  rounded"
              placeholder={"What's on your mind?"}
              required
              value={createpost.caption}
              onChange={(e) =>
                setCreatePost({ ...createpost, caption: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="images"
              className="block text-md font-medium text-gray-700">
                Upload Images:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="mt-1 0 block w-full text-md border rounded"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex gap-5 items-center mt-2 ">
          <div className="flex-grow text-right">
            <button
              className="bg-green-400 text-white px-6 py-1 rounded-md"
              type="submit"
            >
              Share
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default PostFormCard;
