import React from "react";
import { fetchBlogsData } from "../../../app/index.js"; // Import function

const Home = ({ news, categories }) => {
  if (!news || !categories) {
    return <p>Loading...</p>; // Show a loading state
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>

      {/* Categories Section */}
      {categories.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="border p-2 rounded mb-2">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No categories available.</p>
      )}

      {/* News Section */}
      {news.latest.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Latest Articles</h2>
          {news.latest.map((article) => (
            <div key={article.id} className="border p-4 rounded mb-4">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
};

// ✅ Fetch Data from API Server-Side
export async function getServerSideProps() {
  const data = await fetchBlogsData(); // Use the function from utils
  return { props: data };
}

export default Home;
