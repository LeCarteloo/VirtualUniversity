import "../../styles/files.scss";
import File from "./File";

import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Files = () => {
  return (
    <section className="files-section">
      <File
        icon={faFilePdf}
        title={"Att. 1 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        icon={faFilePdf}
        title={"Att. 2 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        icon={faFilePdf}
        title={"Att. 3 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
      <File
        icon={faFilePdf}
        title={"Att. 4 Lorem ipsum dolor sit amet consectetur adipisicing."}
      />
    </section>
  );
};

export default Files;
