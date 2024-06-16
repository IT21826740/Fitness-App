import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserId(userData.userId);
      console.log("userId:", userData.userId);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080/mealplans");
      const formattedMealPlans = response.data.map((mealPlan) => ({
        ...mealPlan,
        imagePath: mealPlan.imagePath ?
          mealPlan.imagePath
          .replace(/\\/g, "/")
            .replace("server/src/main/resources/static/", ""):
        "",
        id: mealPlan.mealId,
      }));
      setMealPlans(formattedMealPlans);
      console.log(response);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/mealplans/delete/${id}`);
      fetchData();
      toast.success("Post deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Error deleting meal plan:", error);
      toast.error("Error deleting post", {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  return (
    <div>
      {mealPlans.map((mealPlan, index) => {
        console.log("userId:", userId);
        console.log("authorId:", mealPlan.authorId);
        const mealPlanAuthorId = parseInt(mealPlan.authorId);
        const currentUser = parseInt(userId);
        if (mealPlanAuthorId === currentUser) {
          console.log("Rendering meal plan");
          return (
            <Card key={index}>
              <div className="flex gap-3">
                <div>
                </div>
                <div className="grow">
                  <p>
                    <Link to={"/profile"}>
                      <span className="mr-1 font-semibold cursor-pointer hover:underline">
                        You
                      </span>
                    </Link>
                    shared a<a className="text-socialBlue"> post</a>
                  </p>
                  <p className="text-gray-500 text-sm">
                    {getTimeAgo(mealPlan.createdAt)}
                  </p>
                </div>
                <div className="relative">
                  <button className="text-gray-400" onClick={toggleDropdown}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute top-0 right-0 mt-10 bg-white p-2 shadow-lg">
                      <Link to={`/update-meal/${mealPlan.id}`}>
                        <button className="block w-full text-left py-2 px-4 text-md whitespace-nowrap">
                          Edit post
                        </button>
                      </Link>
                      <button
                        className="block w-full text-left py-2 px-4 text-md whitespace-nowrap"
                        onClick={() => {
                          toast.warn(
                            <div>
                              Are you sure you want to delete this post?
                              <div className="flex justify-end mt-2">
                                <button
                                  className="text-white  bg-green-500 py-1 px-4 mr-2 rounded hover:bg-green-600"
                                  onClick={() => {
                                    handleDelete(mealPlan.id);
                                    toast.dismiss();
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  className="text-white bg-gray-400 py-1 px-4 rounded hover:bg-gray-500"
                                  onClick={() => toast.dismiss()}
                                >
                                  No
                                </button>
                              </div>
                            </div>,
                            {
                              position: "top-center",
                              autoClose: 5000,
                              closeButton: false,
                              hideProgressBar: true,
                              theme: "dark",
                            }
                          );
                        }}
                      >
                        Delete post
                      </button>
                      <button className="block w-full text-left py-2 px-4 text-md whitespace-nowrap">
                        Save post
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="my-3 text-lg">{mealPlan.title}</h2>
                <p className="my-3 text-sm">{mealPlan.description}</p>
                <div className="rounded-md ">
                  <img
                    className="w-full max-h-96 object-cover"
                    src={`http://localhost:8080/${mealPlan.imagePath}`}
                    alt="Meal"
                  />
                </div>
              </div>
              <div className="mt-5 flex gap-8">
                <p>Diet Category: {mealPlan.dietCategory}</p>
                <p>Scheduled date: {mealPlan.scheduledDate}</p>
              </div>
            </Card>
          );
        } else {
          console.log("Not rendering meal plan");
          console.log("Mismatched meal plan:", mealPlan);
          return null;
        }
      })}
      <ToastContainer />
    </div>
  );
};

export default MealCard;
