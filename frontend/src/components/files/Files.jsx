import "../../styles/files.scss";
import File from "./File";

const Files = () => {
  return (
    <section className="files-section">
      <File
        file={"test.pdf"}
        title={"Att. 1 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        file={"test"}
        title={"Att. 2 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        file={"test.doc"}
        title={"Att. 3 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        file={"test.docx"}
        title={"Att. 4 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        file={"test.xls"}
        title={"Att. 5 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
    </section>
  );
};

export default Files;
