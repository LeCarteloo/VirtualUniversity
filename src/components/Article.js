import "../styles/article.scss";

const Article = ({ image, date, title, hashtags }) => {
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
            <a href="#" key={hashtag}>
              {hashtag + " "}
            </a>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Article;
