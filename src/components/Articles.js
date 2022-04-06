import "../styles/articles.scss";

import NavBlock from "./NavBlock";
import Article from "./Article";

const Articles = () => {
  //TODO: All keys should be later changed to ids from database

  // Array with future announcements
  const anns = [
    {
      image:
        "https://browsecat.net/sites/default/files/brain-artificial-intelligence-human-hd-wallpapers-51017-747977-830989.png",
      date: "05.04.2022",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit" +
        "temporibus quod voluptatem dolores accusamus at.",
      hashtags: ["#IT", "#AI", "#Technology"],
    },
  ];

  return (
    <section className="articles-section">
      <div className="announcements">
        <h1 className="title">Announcements</h1>
        <hr />
        {anns.length > 0
          ? anns.map((ann) => <Article key={ann.title} {...ann} />)
          : "No announcements to display"}
      </div>
      {/* <div className="blocks-wrapper">
        <div className="nav-blocks">
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
        </div>
      </div> */}
    </section>
  );
};

export default Articles;
