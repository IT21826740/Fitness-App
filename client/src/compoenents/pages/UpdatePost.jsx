import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../Card";
import Layout from "../Layout";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePost = () => {
  const { id } = useParams();
   
  //mealPlan = post
  const [postData, setpostData] = useState({
    caption:"",
    image: null,
    fetchedImage: null,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/post/${id}`
        );
        const post = response.data;
        const formattedImagePath = post.imagePath
          .replace(/\\/g, "/")
          .replace("server/src/main/resources/static/", "");
        setpostData({
         
          caption: post.caption,
          image:null,
          fetchedImage: formattedImagePath,
        });
      } catch (error) {
        console.error("error fetching", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleRemoveImage = () => {
    setpostData({
        ...postData,
        image:null,
      fetchedImage: null,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageName = file.name;
      setpostData((prevState) => ({
        ...prevState,
        image: file,
        
      }));
    };

    reader.readAsDataURL(file);
  };
  
    console.log(postData);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("file", postData.image); // Append the image file
        formData.append(
          "post",
          JSON.stringify({
           caption: postData.caption,
           imagePath: postData.fetchedImage,
          })
        );
        await axios.put(
          `http://localhost:8080/post/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
           toast.success("Post updated Successfully!", {
             position: "top-center",
             theme: "dark",
               transition: Bounce,
             autoClose:3000,
           });
           setTimeout(() => {
             window.location.href = "/ "; 
           }, 3010);
      } catch (error) {
        console.error("error", error);
      }
    };

  return (
    <Layout>
      <Card>
              <div>
                  <ToastContainer />
          <h1 className="text-center text-2xl font-bold">
            Update Your post
          </h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
     
          <div>
            <label
              htmlFor="caption"
              className="block text-md font-medium text-gray-700"
            >
              caption:
            </label>
            <textarea
              id="caption"
              name="caption"
              placeholder="Enter your caption"
              className="mt-1 0 block w-full text-md border rounded"
              value={postData.caption}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="images"
              className="block text-md font-medium text-gray-700"
            >
              Upload Images:
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              className="mt-1 0 block w-full text-md border  rounded"
              onChange={handleImageChange}
            />
            {postData.fetchedImage && (
              <div className="p-3">
                <img
                  src={`http://localhost:8080/${postData.fetchedImage}`}
                  className="h-20 w-20 mt-2"
                />
                <button
                  onClick={handleRemoveImage}
                  className="p-3 text-black rounded-lg font-semibold hover:font-bold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-5 items-center mt-2">
            <div className="flex-grow text-right">
              <button
                className="bg-green-400 text-white px-6 py-1 rounded-md"
                type="submit"
              >
                Update
              </button>
              <a href="/">
              <button
                className="bg-green-400 text-white px-6 py-1 rounded-md m-2"
                type="button" 
              >
                back
              </button>
              </a>
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default UpdatePost;
