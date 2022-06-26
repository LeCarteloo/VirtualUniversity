import "../../styles/table.scss"
import SearchInput from "../SearchInput"

const Users = () => {
    return (
        <section className="users-section" style={{width:"100%", height:"100%"}}>
            <div className="table-wrapper">
                <div className="wrapper-header">
                    <h2>Users</h2>
                    <div style={{ display: "flex", alignItems: "center"}}>
                        <SearchInput placeholder={"Search for users..."}/>
                        <p>Filter by:</p>
                        <select className="table-filter" name="users" id="users">
                            <option value="name">Name</option>
                            <option value="name">Surname</option>
                            <option value="name">Album</option>
                        </select>
                    </div>
                </div>
                <table className="table-normal">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Album</th>
                        <th>More</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Namename</td>
                        <td>Surnamesurname</td>
                        <td>emailemail@test.com</td>
                        <td>106299</td>
                        <td>BTN</td>
                        <td>BTN</td>
                    </tr>
                    <tr>
                        <td>Namename</td>
                        <td>Surnamesurname</td>
                        <td>emailemail@test.com</td>
                        <td>106299</td>
                        <td>BTN</td>
                        <td>BTN</td>
                    </tr>
                    <tr>
                        <td>Namename</td>
                        <td>Surnamesurname</td>
                        <td>emailemail@test.com</td>
                        <td>106299</td>
                        <td>BTN</td>
                        <td>BTN</td>
                    </tr>
                    <tr>
                        <td>Namename</td>
                        <td>Surnamesurname</td>
                        <td>emailemail@test.com</td>
                        <td>106299</td>
                        <td>BTN</td>
                        <td>BTN</td>
                    </tr>
                    <tr>
                        <td>Namename</td>
                        <td>Surnamesurname</td>
                        <td>emailemail@test.com</td>
                        <td>106299</td>
                        <td>BTN</td>
                        <td>BTN</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Users;