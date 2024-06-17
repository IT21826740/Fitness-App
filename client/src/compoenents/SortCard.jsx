import Card from "./Card";

const SortCard = (onSortChange) => {
    const handleSortChange = (event) => {
        onSortChange(event.target.value);
    }
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <label htmlFor="sortBy" className="mb-1">
            Sort Posts By:
          </label>
          <select
            id="sortBy"
            onChange={handleSortChange}
            className="p-2 border rounded-md"
          >
            <option value="">Select Sorting Option</option>
            <option value="createdAt_desc">Created At (Latest)</option>
            <option value="createdAt_asc">Created At (Oldest)</option>
            <option value="mealCategory">Meal Category</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="search" className="mb-1">
            Search:
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="p-2 border rounded-md"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400 absolute top-2 right-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l5-5m0 0l-5-5m5 5H4"
              />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SortCard;
