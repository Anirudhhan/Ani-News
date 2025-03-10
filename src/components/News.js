import React, { Component } from "react";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    category: "general",
    apiKey: "8bba7e74f9d042beb383f79c5641a0f5", 
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true, // Add a new state property to track if more data is available
    };
    document.title = `${this.props.category} - Ani News`;
  }

  fetchNews = async (page = 1) => {
    this.setState({ loading: true });

    try {
      const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&sortBy=popularity&apiKey=${this.props.apiKey}&page=${page}`;
      let response = await fetch(url);
      let data = await response.json();

      // Check if we received any new articles
      const newArticles = data.articles || [];
      
      this.setState((prevState) => {
        const updatedArticles = page === 1 ? newArticles : [...prevState.articles, ...newArticles];
        
        // Determine if there are more articles to fetch
        const hasMore = 
          updatedArticles.length < data.totalResults && 
          newArticles.length > 0; // Stop if we get an empty array
        
        return {
          loading: false,
          articles: updatedArticles,
          totalResults: data.totalResults,
          page,
          hasMore, // Update the hasMore flag
        };
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, hasMore: false });
    }
  };

  componentDidMount() {
    this.fetchNews();
  }

  fetchMoreData = async () => {
    if (!this.state.hasMore) return; // Prevent unnecessary API calls
    const nextPage = this.state.page + 1;
    this.fetchNews(nextPage);
  };

  render() {
    return (
      <>
        <div className="container my-3 text-center">
          <h1
            className="fw-bold"
            style={{
              background: "linear-gradient(45deg, rgb(96, 119, 145), rgb(56, 52, 61))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Today's Top News
          </h1>
        </div>

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore} // Use the hasMore state instead of comparing lengths
            loader={
              <div className="text-center my-3">
                <Loading />
              </div>
            }
            endMessage={
              <p className="text-center text-muted my-3">
                {this.state.articles.length > 0 
                  ? "You've seen all the news!" 
                  : "No news articles available"}
              </p>
            }
          >
            <div className="container">
              <div className="row">
                {this.state.articles.length > 0 ? (
                  this.state.articles.map((article, index) => (
                    <div className="col-md-3 mb-4" key={`${article.url}-${index}`}>
                      <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
                        <img
                          src={
                            article.urlToImage ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          className="card-img-top"
                          alt="News Thumbnail"
                          style={{ borderRadius: "15px 15px 0 0", height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {article.title || "No Title Available"}
                          </h5>
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
                  ))
                ) : (
                  <h4 className="text-center text-muted">No news articles available</h4>
                )}
              </div>
            </div>
          </InfiniteScroll>
      </>
    );
  }
}