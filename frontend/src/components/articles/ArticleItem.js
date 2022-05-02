import "../../styles/articleItem.scss";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Article = ({ id, image, date, title, hashtags }) => {
  const [t] = useTranslation("translation");

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
            {t("articles.readmore")}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Article;
