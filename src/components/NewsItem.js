import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, author, imgUrl, url } = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={imgUrl || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="News thumbnail" />
          <div className="card-body">
            <h5 className="card-title">{title || "No Title Available"}</h5>
            <p className="card-text">{description || "No Description Available"}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{author || "Unknown Author"}</li>
          </ul>
          <div className="card-body">
            <a href={url || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
