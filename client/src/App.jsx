import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./compoenents/pages/Home";
import Profile from "./compoenents/pages/Profile";
import Notifications from "./compoenents/pages/Notifications";
import Login from "./compoenents/pages/Login";
import Meals from "./compoenents/pages/Meals";
import Signup from "./compoenents/pages/Signup";
import UpdateMeal from "./compoenents/pages/UpdateMeal";
import Workout from "./compoenents/pages/Workout";
import AddWorkout from "./compoenents/pages/AddWorkout";
import PostWorkout from "./compoenents/pages/PostWorkout";
import WorkoutList from "./compoenents/pages/WorkoutList";
import UpdatePost from "./compoenents/pages/UpdatePost";

function App() {
  const isAuthenticated = false; 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        ></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:tab" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-meal/:id" element={<UpdateMeal />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/Addworkout" element={<AddWorkout />} />
        <Route path="/postworkout" element={<PostWorkout />} />
        <Route path="/workoutlist" element={<WorkoutList />} />
           <Route path="/update-post/:id"element={<UpdatePost />}></Route
      </Routes>
    </BrowserRouter>
  );
}

export default App;
