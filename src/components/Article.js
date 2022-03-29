import "../styles/article.scss";

const Article = () => {
  return (
    <div className="article-item">
      <img src="http://placehold.jp/100x100.png" alt="Placeholder" />
      <div className="article-short">
        <span className="article-date">29.03.2022</span>
        <h3 className="article-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta autem
          obcaecati, nisi fugit voluptatum nulla! Eum illum illo iure eligendi,
          saepe voluptatibus soluta odit quidem velit quae libero, alias natus?
        </h3>
        <span className="article-tags">
          <a href="#">#IT </a>
          <a href="#">#AI </a>
          <a href="#">#Technology </a>
        </span>
      </div>
    </div>
  );
};

export default Article;
