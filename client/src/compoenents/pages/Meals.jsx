import  { useState } from "react";
import Layout from "../Layout";
import SortCard from "../SortCard";
import MealCard from "../MealCard";

const Meals = () => {
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <Layout>
      <SortCard onSortChange={handleSortChange} />
      <MealCard sortBy={sortBy} />
    </Layout>
  );
};

export default Meals;
