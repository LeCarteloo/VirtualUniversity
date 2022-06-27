import "../../styles/table.scss";
import SearchInput from "../SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEllipsis,
  faGear,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <div className="table-wrapper">
        <div className="wrapper-header">
          <h2>Users</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SearchInput placeholder={"Search for users..."} />
            <p>Filter by:</p>
            <select className="table-filter" name="users" id="users">
              <option value="name">Name</option>
              <option value="name">Surname</option>
              <option value="name">Album</option>
            </select>
          </div>
        </div>
        <div className="table-slider">
          <table className="table-normal">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Album</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Namename</td>
                <td>Surnamesurname</td>
                <td>emailemail@test.com</td>
                <td>106299</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Users;
