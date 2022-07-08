import "../../styles/admin.scss";
import SearchInput from "../SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEllipsis,
  faGear,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";

const AdminTable = ({
  title,
  users,
  filter,
  onAdd,
  onEdit,
  onRemove,
  onSee,
}) => {
  return (
    <div className="table-wrapper">
      <div className="wrapper-header">
        <h2 className="table-title"> {title} </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="btn-add">
            <FontAwesomeIcon icon={faPlus} size={"lg"} />
          </button>
          <SearchInput placeholder={`Search for ${title.toLowerCase()}...`} />
          <p className="text-filter">Filter by:</p>
          <select className="table-filter" name="users" id="users">
            <option value="name">Name</option>
            <option value="name">Surname</option>
            <option value="name">Album</option>
          </select>
        </div>
      </div>
      <div className="table-slider">
        {users.length === 0 ? (
          <Loading />
        ) : (
          <table className="table-normal">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Album</th>
                <th>Action</th>
              </tr>
              {users &&
                users.map((user, i) => (
                  <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.album}</td>
                    <td>
                      <div className="action-btn">
                        <FontAwesomeIcon icon={faEllipsis} size="xl" />
                        <div className="action-tooltip">
                          <button className="action-row">
                            <span>See more</span>
                            <FontAwesomeIcon icon={faEye} size="lg" />
                          </button>
                          <button className="action-row">
                            <span>Edit User</span>
                            <FontAwesomeIcon icon={faGear} size="lg" />
                          </button>
                          <button className="action-row">
                            <span>Remove User</span>
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTable;
