import "../../styles/articles.scss";

import ArticleItem from "./ArticleItem";

const Articles = () => {
  //TODO: All keys should be later changed to ids from database

  // Array with future announcements
  const anns = [
    {
      id: 3,
      image: "https://images7.alphacoders.com/103/thumb-1920-1037699.jpg",
      date: "09.04.2022",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit" +
        "temporibus quod voluptatem dolores accusamus at.",
      hashtags: ["#IT", "#Windows", "#Technology"],
    },
    {
      id: 2,
      image:
        "https://www.synopsys.com/content/dam/synopsys/designware-ip/images/IP-AI-image-1.jpg.imgo.jpg",
      date: "05.04.2022",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit" +
        "temporibus quod voluptatem dolores accusamus at.",
      hashtags: ["#IT", "#AI", "#Technology"],
    },
    {
      id: 1,
      image: "https://wallpaperaccess.com/full/1912279.jpg",
      date: "04.04.2022",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit" +
        "temporibus quod voluptatem dolores accusamus at.",
      hashtags: ["#Technology"],
    },
  ];

  return (
    <section className="articles-section">
      <div className="articles">
        <h1 className="title">Articles</h1>
        <hr />
        {anns.length > 0
          ? anns.map((ann) => <ArticleItem key={ann.id} {...ann} />)
          : "No articles to display"}
      </div>
    </section>
  );
};

export default Articles;
