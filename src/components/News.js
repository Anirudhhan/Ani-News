import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ category = "general", apiKey = "8bba7e74f9d042beb383f79c5641a0f5", setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `${capitalize(category)} - Ani News`;
    fetchNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); // Fetch news when category changes

  const fetchNews = async (pageNum) => {
    setError(null);

    try {
      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=10&page=${pageNum}&apiKey=${apiKey}`;
      const response = await fetch(url);
      setProgress(30);
      const data = await response.json();
      setProgress(60);

      if (!response.ok || !data.articles) {
        throw new Error("Failed to fetch news");
      }

      setArticles((prev) => (pageNum === 1 ? data.articles : [...prev, ...data.articles]));
      setPage(pageNum);
      setHasMore(data.articles.length > 0 && (pageNum * 10) < data.totalResults);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to load news. Please try again later.");
      setHasMore(false);
    } finally {
    }
  };

  const fetchMoreData = () => {
    if (hasMore) {
      fetchNews(page + 1);
    }
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <>
      <div className="container my-3 text-center">
        <h1
          className="fw-bold py-2"
          style={{
            background: "linear-gradient(45deg, rgb(96, 119, 145), rgb(56, 52, 61))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Today's Top {capitalize(category)} News
        </h1>
      </div>

      {error && <p className="text-center text-danger">{error}</p>}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className="text-center my-3"><Loading /></div>}
        endMessage={
          <p className="text-center text-muted my-3">
            {articles.length > 0 ? "You've seen all the news!" : "No news articles available"}
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-3 mb-4" key={`${article.url}-${index}`}>
                <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
                  <img
                    src={article.urlToImage || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                    className="card-img-top"
                    alt="News Thumbnail"
                    style={{ borderRadius: "15px 15px 0 0", height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title || "No Title Available"}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        {article.publishedAt ? new Date(article.publishedAt).toGMTString() : "Unknown Date"}
                      </small>
                    </p>
                    <hr className="divider" />
                    <p className="card-text">
                      {article.description ? article.description.slice(0, 145) + "..." : "No Description Available"}
                    </p>
                    <a href={article.url} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  category: "general",
  apiKey: "8bba7e74f9d042beb383f79c5641a0f5", 
};

export default News;
