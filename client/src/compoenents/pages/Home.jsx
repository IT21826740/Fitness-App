import Layout from "../Layout";
import PostCard from "../PostCard";
import PostFormCard from "../PostFormCard";

const Home = () => {
  return (
    <Layout>
      <PostFormCard />
      <PostCard />
    </Layout>
  );
};

export default Home;
