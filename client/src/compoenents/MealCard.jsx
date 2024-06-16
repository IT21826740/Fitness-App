import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MealCard = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [userId, setUserId] = useState("");
  const [usernames, setUsernames] = useState({});
  const [likedMealPlans, setLikedMealPlans] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commentCounts, setCommentCounts] = useState({});
  const [showComments, setShowComments] = useState(null); 
  const [comments, setComments] = useState({});

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserId(userData.userId);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchUsernames();
  }, [mealPlans]);

  useEffect(() => {
    const likedMealPlansString = localStorage.getItem("likedMealPlans");
    if (likedMealPlansString) {
      setLikedMealPlans(JSON.parse(likedMealPlansString));
    }
    fetchLikeCounts();
    fetchCommentCounts();
  }, [mealPlans]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/mealplans");
      const formattedMealPlans = response.data.map((mealPlan) => ({
        ...mealPlan,
        imagePath: mealPlan.imagePath
          .replace(/\\/g, "/")
          .replace("server/src/main/resources/static/", ""),
        id: mealPlan.mealId,
      }));
      setMealPlans(formattedMealPlans);
      const commentPromises = formattedMealPlans.map((mealPlan) =>
        axios.get(`http://localhost:8080/comments/${mealPlan.id}`)
      );
      const commentsResponses = await Promise.all(commentPromises);
      const commentsData = {};
      commentsResponses.forEach((response, index) => {
        commentsData[formattedMealPlans[index].id] = response.data;
      });
      setComments(commentsData);
      console.log(comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUsernames = async () => {
    const ids = mealPlans.map((mealPlan) => mealPlan.authorId);
    const uniqueIds = [...new Set(ids)];
    const userNames = {};
    for (const id of uniqueIds) {
      try {
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        userNames[id] = response.data.username;
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    }
    setUsernames(userNames);
  };

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

  const handleLike = async (mealPlanId) => {
    try {
      const response = await axios.post("http://localhost:8080/add", null, {
        params: {
          user_id: userId,
          meal_id: mealPlanId,
        },
      });
      toast.success(response.data, {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
        theme: "dark",
      });
      setLikedMealPlans([...likedMealPlans, mealPlanId]);
      localStorage.setItem("likedMealPlans", JSON.stringify(likedMealPlans));
      fetchLikeCounts();
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
        theme: "dark",
      });
    }
  };

  const fetchLikeCounts = async () => {
    const likeCountsData = {};
    for (const mealPlan of mealPlans) {
      try {
        const response = await axios.get(
          `http://localhost:8080/likes/${mealPlan.id}/count`
        );
        likeCountsData[mealPlan.id] = response.data;
      } catch (error) {
        console.log("error fetching like count", error);
      }
    }
    setLikeCounts(likeCountsData);
  };

  const toggleDropdown = (mealPlanId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [mealPlanId]: !prevState[mealPlanId],
    }));
  };

  const handleAddComment = async (mealPlanId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/comments/add",
        null,
        {
          params: {
            user_id: userId,
            meal_id: mealPlanId,
            content: commentContent,
          },
        }
      );
      toast.success(response.data, {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
        theme: "dark",
      });
      setCommentContent("");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 3000,
        closeButton: true,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };

  const fetchCommentCounts = async () => {
    const commentCountsData = {};
    for (const mealPlan of mealPlans) {
      try {
        const response = await axios.get(
          `http://localhost:8080/comments/count/${mealPlan.id}`
        );
        commentCountsData[mealPlan.id] = response.data;
      } catch (error) {
        console.log("error fetching comment count", error);
      }
    }
    setCommentCounts(commentCountsData);
  };

  const handleToggleComments = (mealPlanId) => {
    setShowComments(showComments === mealPlanId ? null : mealPlanId); 
  };

  return (
    <div>
      {mealPlans.map((mealPlan, index) => {
        const username = usernames[mealPlan.authorId] || "Unknown";
        const isLiked = likedMealPlans.includes(mealPlan.id);
        const likeCount = likeCounts[mealPlan.id] || 0;
        const commentCount = commentCounts[mealPlan.id] || 0;
        return (
          <Card key={index}>
            <div className="flex gap-3">
              <div className="grow">
                <p>
                  <Link to={"/profile"}>
                    <span className="mr-2 text-xl font-semibold cursor-pointer hover:underline">
                      {username}
                    </span>
                  </Link>
                  shared a<a className="text-socialBlue"> post</a>
                </p>
                <p className="text-gray-500 text-sm">
                  {getTimeAgo(mealPlan.createdAt)}
                </p>
              </div>
              <div className="relative">
                <button
                  className="text-gray-400"
                  onClick={() => toggleDropdown(mealPlan.id)}
                >
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
                {dropdownOpen[mealPlan.id] && (
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
            <div className="mt-5 flex gap-8">
              <button
                onClick={() => handleLike(mealPlan.id)}
                className="flex gap-2 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={likedMealPlans.includes(mealPlan.id) ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                {likeCount}
              </button>
              <button
                onClick={() => handleToggleComments(mealPlan.id)}
                className="flex gap-2 items-center"
              >
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
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                {commentCount}
              </button>
              {showComments === mealPlan.id && (
                <div
                  className="comment-section "
                  
                >
                  {comments[mealPlan.id] &&
                    comments[mealPlan.id].map((comment, index) => (
                      <div key={index} className="comment-container">
                        <div className="comment">
                          <div className="flex items-center">
                            <span className="text-gray-700 font-semibold mr-2">
                              {comment.user.username}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {getTimeAgo(comment.timestamp)}
                            </span>
                          </div>
                          <p className="mt-1 text-lg">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="flex mt-4 gap-3">
              <div className="border grow rounded-full">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className=" block w-full p-3 overflow-hidden px-4 h-12 rounded-full"
                  placeholder="Leave a comment"
                />
              </div>
              <button
                onClick={() => handleAddComment(mealPlan.id)}
                className="font-semibold border py-2 px-4 rounded-lg  bg-green-400"
              >
                Add Comment
              </button>
            </div>
          </Card>
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default MealCard;
