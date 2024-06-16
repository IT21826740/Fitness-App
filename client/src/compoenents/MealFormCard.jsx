import  { useState } from "react";
import Card from "./Card";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";

const MealFormCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authorId, setAuthorId] = useState("");

   useEffect(() => {
     const userDataString = localStorage.getItem("userData");
     if (userDataString) {
       const userData = JSON.parse(userDataString);
       setAuthorId(userData.userId);
     }
   }, []);

  const [mealPlan, setMealPlan] = useState({
    title: "",
    description: "",
    dietCategory: "",
    scheduledDate: "",
    image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", mealPlan.image);
      formData.append(
        "mealPlan",
        JSON.stringify({
          title: mealPlan.title,
          description: mealPlan.description,
          dietCategory: mealPlan.dietCategory,
          scheduledDate: mealPlan.scheduledDate,
          authorId: authorId,
        })
      );

      const response = await axios.post(
        "http://localhost:8080/mealplans/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      console.log("meal plan created");
      toast.success("meal plan created Successfully!", {
        position: "top-center",
        theme: "dark",
        transition: Bounce,
      });

      setMealPlan({
        title: "",
        description: "",
        dietCategory: "",
        scheduledDate: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating meal plan:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setMealPlan((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  return (
    <Card>
      <ToastContainer />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center justify-between"
      >
        <h2 className="text-xl font-medium text-gray-800 text-center w-full">Add your meal plan from here</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
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
              value={mealPlan.title}
              onChange={(e) =>
                setMealPlan({ ...mealPlan, title: e.target.value })
              }
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
              value={mealPlan.description}
              onChange={(e) =>
                setMealPlan({ ...mealPlan, description: e.target.value })
              }
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
              value={mealPlan.dietCategory}
              onChange={(e) =>
                setMealPlan({ ...mealPlan, dietCategory: e.target.value })
              }
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
              value={mealPlan.scheduledDate}
              onChange={(e) =>
                setMealPlan({ ...mealPlan, scheduledDate: e.target.value })
              }
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
      )}
    </Card>
  );
};

export default MealFormCard;
