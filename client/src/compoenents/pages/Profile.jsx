import { useState, useEffect, useRef } from "react";
import Card from "../Card";
import Layout from "../Layout";
import Avatar from "../avatar";
import PostCard from "../PostCard";
import Followers from "../Followers";
import { useParams } from "react-router-dom";
import Workout from "./Workout";
import { CiDumbbell } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import MealFormCard from "../MealFormCard";
import MyMealsCard from "../MymealsCard";
import axios from "axios";

const Profile = () => {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || "posts");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUsername(userData.username);
      setAddress(userData.address);
      setUserId(userData.userId);
      const savedCoverImage = localStorage.getItem("coverImage");
      const savedAvatarImage = localStorage.getItem("profileImage");
      if (savedCoverImage) {
        const imageURL = `http://localhost:8080/cover/${savedCoverImage.replace(
          /^.*[\\\/]/,
          ""
        )}`;
        setCoverImage(imageURL);
      }

      if (savedAvatarImage) {
        const avatarURL = `http://localhost:8080/profile/${savedAvatarImage.replace(
          /^.*[\\\/]/,
          ""
        )}`;
        setAvatarImage(avatarURL);
      }
    }
    setActiveTab(tab || "posts");
  }, [tab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    const url = `/profile/${tabName}`;
    window.history.pushState({ path: url }, "", url);
  };

  const handleCoverClick = () => {
    coverInputRef.current.click();
  };

  const handleCoverChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${userId}/cover-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Cover photo uploaded successfully");
      console.log("Image Path:", response.data);
      const imageURL = `http://localhost:8080/cover/${response.data.replace(
        /^.*[\\\/]/,
        ""
      )}`;
      console.log(imageURL);
      setCoverImage(imageURL);
      localStorage.setItem("coverImage", imageURL);
    } catch (error) {
      console.error("Error uploading cover photo:", error);
    }
  };
  const coverInputRef = useRef(null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `http://localhost:8080/user/${userId}/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Cover photo uploaded successfully");
      console.log("Image Path:", response.data);
      const avatarURL = `http://localhost:8080/profile/${response.data.replace(
        /^.*[\\\/]/,
        ""
      )}`;
      console.log(avatarURL);
      setAvatarImage(avatarURL);
      localStorage.setItem("profileImage", avatarURL);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      console.log("Avatar upload error:", error.response);
    }
  };

  const tabClasses =
    "flex gap-1 px-4 py-1 items-center cursor-pointer  border-b-4 border-b-white";
  const activeTabClasses =
    "flex gap-1 px-4 py-1 cursor-pointer items-center border-green-500 border-b-4 text-green-500 font-bold cursor-pointer";

  return (
    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <div
            className="h-36 overflow-hidden flex justify-center items-center cursor-pointer"
            onClick={handleCoverClick}
          >
            {coverImage ? (
              <img src={coverImage} alt="User's cover" />
            ) : (
              <p>Upload a cover photo</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={coverInputRef}
            onChange={(event) => handleCoverChange(event, userId)}
          />
          <div className="absolute top-24 left-4">
            <Avatar
              size={"lg"}
              avatarURL={avatarImage}
              handleAvatarChange={handleAvatarChange}
            />
          </div>

          <div className="p-4">
            <div className="ml-40">
              <h1 className="text-3xl font-bold">{username}</h1>
              <div className="text-gray-500 leading-4">{address}</div>
            </div>
            <div className="mt-10 flex gap-1">
              <div
                className={
                  activeTab === "posts" ? activeTabClasses : tabClasses
                }
                onClick={() => handleTabClick("posts")}
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>{" "}
                Posts
              </div>

              <div
                className={
                  activeTab === "mealplans" ? activeTabClasses : tabClasses
                }
                onClick={() => handleTabClick("mealplans")}
              >
                <IoFastFoodOutline className="w-6 h-6" />
                My Meal Plans
              </div>

              <div
                className={
                  activeTab === "followers" ? activeTabClasses : tabClasses
                }
                onClick={() => handleTabClick("followers")}
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
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>{" "}
                Followers
              </div>
              <div
                className={
                  activeTab === "workouts" ? activeTabClasses : tabClasses
                }
                onClick={() => handleTabClick("activities")}
              >
                <CiDumbbell className="w-6 h-6" />
                Workouts
              </div>
            </div>
          </div>
        </div>
      </Card>

      {activeTab === "posts" && <PostCard />}
      {activeTab === "mealplans" && (
        <div>
          <MealFormCard />
          <MyMealsCard />
        </div>
      )}
      <div></div>
      {activeTab === "followers" && (
        <Card>
          <h2 className="text-3xl mb-2">Followers</h2>
          <div className="">
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b  border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b  border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b  border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b  border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b  border-b-gray-100 p-4">
              <Followers />
            </div>
            <div className="border-b border-b-gray-100 p-4">
              <Followers />
            </div>
          </div>
        </Card>
      )}
      {activeTab === "activities" && <Workout />}
    </Layout>
  );
};

export default Profile;
