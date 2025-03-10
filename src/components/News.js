import React, { Component } from 'react';
import Loading from './Loading';

export default class News extends Component {
  static defaultProps = {
    category: 'general',
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [], 
      loading: false,
      page: 1, 
    };
    document.title = `${this.props.category} - Ani News`;
  }

  async fetchNews(){
    this.setState({ loading: true }); 
    const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&sortBy=popularity&apiKey=8bba7e74f9d042beb383f79c5641a0f5&page=${this.state.page}&pageSize=8`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      loading: false, 
      articles: parseData.articles || [], 
    });
  }

  async componentDidMount() {
    this.fetchNews();
  }

  goPrev = async () => {
    if (this.state.page > 1) { 
      this.setState(prevState => ({ page: prevState.page - 1 }), this.fetchNews);
    }
  };
  
  goNext = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchNews);
  };

  render() {
    return (
      <>
        {/* Beautiful Header with Gradient Text */}
        <div className="container my-3 text-center">
          <h1 className="fw-bold" style={{ 
            background: 'linear-gradient(45deg,rgb(96, 119, 145),rgb(56, 52, 61))', 
            WebkitBackgroundClip: 'text', 
            color: 'transparent' 
          }}>
            Today's Top News
          </h1>
        </div>

        {/* Loading Spinner */}
        {this.state.loading && (
          <div className="text-center my-3">
            <Loading />
          </div>
        )}

        {/* News Cards Grid */}
        <div className="container">
          <div className="row">
            {this.state.articles.length > 0 ? (
              !this.state.loading && this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 mb-4" key={element.url}>
                    <div className="card shadow-lg" style={{ borderRadius: '15px' }}>
                      <img 
                        src={element.urlToImage || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} 
                        className="card-img-top" 
                        alt="News Thumbnail" 
                        style={{ borderRadius: '15px 15px 0 0', height: '200px', objectFit: 'cover' }} 
                      />
                      <div className="card-body">
                        <h5 className="card-title">{element.title ? element.title : "No Title"}</h5>
                        <p className="card-text"><small className="text-muted">{new Date(element.publishedAt).toGMTString()}</small></p>
                        <hr className="divider" />
                        <p className="card-text">{element.description ? element.description.slice(0, 145)+ "..." : "No Description"}</p>
                        <a href={element.url} className="btn btn-primary btn-sm">Read More</a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4 className="text-center text-muted">No news articles available</h4>
            )}
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="container d-flex justify-content-between my-4">
          <button className="btn btn-dark btn-m px-4 shadow" onClick={this.goPrev} disabled={this.state.page === 1} style={{ transition: '0.3s', borderRadius: '10px' }}>
            &larr; Previous
          </button>
          <button className="btn btn-dark btn-m px-4 shadow" onClick={this.goNext} style={{ transition: '0.3s', borderRadius: '10px' }}>
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}
