import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../Card";
import Layout from "../Layout";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMeal = () => {
  const { id } = useParams();
   
  const [mealPlanData, setMealPlanData] = useState({
    title: "",
    description: "",
    dietCategory: "",
    scheduledDate: "",
    image: null,
    fetchedImage: null,
  });

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/mealplans/${id}`
        );
        const mealPlan = response.data;
        const formattedImagePath = mealPlan.imagePath
          .replace(/\\/g, "/")
          .replace("server/src/main/resources/static/", "");
        setMealPlanData({
          title: mealPlan.title,
          description: mealPlan.description,
          dietCategory: mealPlan.dietCategory,
            scheduledDate: mealPlan.scheduledDate,
          image:null,
          fetchedImage: formattedImagePath,
        });
      } catch (error) {
        console.error("error fetching", error);
      }
    };
    fetchMealPlan();
  }, [id]);

  const handleRemoveImage = () => {
    setMealPlanData({
        ...mealPlanData,
        image:null,
      fetchedImage: null,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMealPlanData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageName = file.name;
      setMealPlanData((prevState) => ({
        ...prevState,
        image: file,
        
      }));
    };

    reader.readAsDataURL(file);
  };
  
    console.log(mealPlanData);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("file", mealPlanData.image); // Append the image file
        formData.append(
          "mealPlan",
          JSON.stringify({
            title: mealPlanData.title,
            description: mealPlanData.description,
            dietCategory: mealPlanData.dietCategory,
            scheduledDate: mealPlanData.scheduledDate,
          })
        );
        await axios.put(
          `http://localhost:8080/mealplans/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
           toast.success("meal plan updated Successfully!", {
             position: "top-center",
             theme: "dark",
               transition: Bounce,
             autoClose:3000,
           });
           setTimeout(() => {
             window.location.href = "/meals"; 
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
            Update Your meal plan
          </h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-md font-medium text-gray-700"
            >
              Meal Plan Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter meal plan title"
              className="mt-1 0 block w-full text-md border rounded-md "
              required
              value={mealPlanData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-md font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              className="mt-1 0 block w-full text-md border rounded"
              required
              value={mealPlanData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="dietCategory"
              className="block text-md font-medium text-gray-700"
            >
              Diet Category:
            </label>
            <input
              type="text"
              id="dietCategory"
              name="dietCategory"
              placeholder="Enter diet category"
              className="mt-1 0 block w-full shadow-sm text-md border  rounded"
              required
              value={mealPlanData.dietCategory}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="scheduledDate"
              className="block text-md font-medium text-gray-700"
            >
              Scheduled Date:
            </label>
            <input
              type="date"
              id="scheduledDate"
              name="scheduledDate"
              className="mt-1 0 block w-full text-md border rounded"
              required
              value={mealPlanData.scheduledDate}
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
            {mealPlanData.fetchedImage && (
              <div className="p-3">
                <img
                  src={`http://localhost:8080/${mealPlanData.fetchedImage}`}
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
            </div>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default UpdateMeal;
