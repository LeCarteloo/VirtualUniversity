import "../../styles/article.scss";

import { useParams } from "react-router-dom";

const Article = () => {
  // Getting the id of article
  const params = useParams();

  // Future api call
  const article = {};

  return (
    <article>
      <div className="article-image">
        <img
          src="https://images7.alphacoders.com/103/thumb-1920-1037699.jpg"
          alt=""
        />
      </div>
      <div className="article-content">
        <h1>Artificial Inteligence in Computer Games</h1>
        <span className="date">09.04.2022</span>
        <span className="hashtags">{params.id} - id of article</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          atque libero, officiis ipsum in corporis iste reiciendis eveniet
          dolores fugiat eligendi tenetur veritatis quibusdam quo eius beatae
          quae veniam perspiciatis sed. Nemo voluptatem corrupti doloremque odit
          iure quas dicta delectus. Aut excepturi fugiat magnam architecto
          numquam error, veniam laudantium corrupti.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
          repudiandae quasi doloribus aspernatur totam? Nobis odio fugiat aut
          voluptas enim fugit quia dolores, minus est explicabo, eos doloremque?
          Accusantium, ipsa dicta non officiis odio maxime nulla fugit magnam
          possimus iure, atque quod nam accusamus ullam minima doloribus cumque
          tempore quae? Porro natus enim eum repellat reiciendis recusandae
          nobis id at sequi alias maiores corrupti aliquam quibusdam, iusto
          quisquam cupiditate officiis! Numquam, ullam quae. Earum reiciendis
          rerum inventore quam. Cupiditate molestiae aliquam laboriosam iusto
          neque in quam vero, blanditiis culpa iure voluptates veritatis quod
          earum ipsum, ullam magnam ipsa eveniet maiores!
        </p>
      </div>
    </article>
  );
};

export default Article;
