
import { fetchBlogsData } from "../utils/fetchBlogs";

export default async function Home() {
  const { news, categories } = await fetchBlogsData(); // Fetch data on the server

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
              <p className="text-gray-600">{article.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
}
