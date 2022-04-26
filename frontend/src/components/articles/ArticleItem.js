import "../../styles/articleItem.scss";

import { Link } from "react-router-dom";

const Article = ({ id, image, date, title, hashtags }) => {
  return (
    <div className="article-item">
      <div className="article-img">
        <img src={image} alt="Placeholder" />
      </div>
      <div className="article-short">
        <span className="article-date"> {date} </span>
        <h3 className="article-title"> {title} </h3>
        <span className="article-tags">
          {hashtags.map((hashtag) => (
            <a href="#" key={hashtag} className="hashtag">
              {hashtag + " "}
            </a>
          ))}
          <Link to={`${id}`} className="read-more">
            Read more...
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Article;
