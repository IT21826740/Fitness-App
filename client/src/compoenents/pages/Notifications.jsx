import Layout from "../Layout";
import Card from "../Card";
import Avatar from "../avatar";
import { Link } from "react-router-dom";

const Notifications = () => {
  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-400">Notifications</h1>
      <Card noPadding={true}>
        <div className="">
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link to={"/profile/followers"}>
                <Link
                  to={"/profile"}
                  className={"font-semibold hover:underline"}
                >
                  Rayan Weragala
                </Link>{" "}
                Followed you
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link to={"/profile/followers"}>
                {" "}
                <Link to={"/profile"} className={"font-semibold hover:underline"}>
                  Rayan Weragala
                </Link>{" "}
                Followed you
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link to={"/profile"}>
              <Avatar />
            </Link>
            <div>
              <Link to={"/profile"} className={"font-semibold hover:underline"}>
                {" "}
                Rayan Weragala{" "}
              </Link>{" "}
              Liked{" "}
              <Link
                to={"/profile/activities"}
                className={"text-green-700 hover:underline"}
              >
                {" "}
                your activity
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link to={"/profile/followers"}>
                <Link to={"/profile"} className={"font-semibold hover:underline"}>
                  Rayan Weragala
                </Link>
                {" "}
                Followed you
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}

export default Notifications
