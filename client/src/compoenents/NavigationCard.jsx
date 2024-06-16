import { useLocation,useNavigate } from "react-router-dom";
import Card from "./Card";
import { Link } from "react-router-dom";
import axios from "axios";


const NavigationCard = () => {

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
    const logout = () => {
      localStorage.removeItem("userData");
      localStorage.removeItem("coverImage")
      localStorage.removeItem("profileImage");
      axios
        .post(
          "http://localhost:8081/user/logout",
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("logout success");
            navigate("/login")
          } else {
            console.error("Logout failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

  const activeElementClasses =
    "flex gap-3 py-3 my-1 bg-green-400 text-white -mx-10 px-10 rounded-md shadow-md shadow-gray-300";
  const nonActiveElmentClasses =
    "flex gap-3 py-2 my-2 hover:bg-green-400 hover:bg-opacity-20 -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300";
  return (
    <Card>
      <div className="px-4 py-2">
        <h2 className="text-gray-400 mb-3">Navigation</h2>
        <Link
          to={"/home"}
          className={
            pathname === "/home" ? activeElementClasses : nonActiveElmentClasses
          }
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M280.4 148.3L96 300.1V464a16 16 0 0 0 16 16l112.1-.3a16 16 0 0 0 15.9-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.6a16 16 0 0 0 16 16.1L464 480a16 16 0 0 0 16-16V300L295.7 148.3a12.2 12.2 0 0 0 -15.3 0zM571.6 251.5L488 182.6V44.1a12 12 0 0 0 -12-12h-56a12 12 0 0 0 -12 12v72.6L318.5 43a48 48 0 0 0 -61 0L4.3 251.5a12 12 0 0 0 -1.6 16.9l25.5 31A12 12 0 0 0 45.2 301l235.2-193.7a12.2 12.2 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0 -1.7-16.9z" />
          </svg>
          Home
        </Link>
        <Link
          to={"/profile"}
          className={
            pathname === "/profile"
              ? activeElementClasses
              : nonActiveElmentClasses
          }
        >
          <svg
            className=" w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
          </svg>
          Profile
        </Link>
        <Link to={""} className={nonActiveElmentClasses}>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M0 512V48C0 21.5 21.5 0 48 0h288c26.5 0 48 21.5 48 48v464L192 400 0 512z" />
          </svg>
          Saved posts
        </Link>
        <Link
          to={"/notifications"}
          className={
            pathname === "/notifications"
              ? activeElementClasses
              : nonActiveElmentClasses
          }
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 512c35.3 0 64-28.7 64-64H160c0 35.4 28.7 64 64 64zm215.4-149.7c-19.3-20.8-55.5-52-55.5-154.3 0-77.7-54.5-139.9-127.9-155.2V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v20.8C118.6 68.1 64.1 130.3 64.1 208c0 102.3-36.2 133.5-55.5 154.3-6 6.5-8.7 14.2-8.6 21.7 .1 16.4 13 32 32.1 32h383.8c19.1 0 32-15.6 32.1-32 .1-7.6-2.6-15.3-8.6-21.7z" />
          </svg>
          Notifications
        </Link>
        <Link
          to={"/workoutlist"}
          className={
            pathname === "/workoutlist"
              ? activeElementClasses
              : nonActiveElmentClasses
          }
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M104 96H56c-13.3 0-24 10.7-24 24v104H8c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h24v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24zm528 128h-24V120c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h24c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM456 32h-48c-13.3 0-24 10.7-24 24v168H256V56c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24v400c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V288h128v168c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24z" />
          </svg>
          Workout Plans
        </Link>
        <Link
          to={"/meals"}
          className={
            pathname === "/meals"
              ? activeElementClasses
              : nonActiveElmentClasses
          }
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 416 512"
          >
            <path d="M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8 .9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z" />
          </svg>
          Meal Plans
        </Link>
        <Link to="/login" onClick={logout} className={nonActiveElmentClasses}>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
          </svg>
          Logout
        </Link>
      </div>
    </Card>
  );
};

export default NavigationCard;
