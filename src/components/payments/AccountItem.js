const AccountItem = () => {
  return (
    <div className="account-item">
      <table>
        <tbody>
          <tr>
            <th>Bank name</th>
            <th>Account number</th>
            <th>Currency</th>
            <th>Confirmed</th>
          </tr>
          <tr>
            <td>Test I O. Warsaw</td>
            <td>55 55555555554444</td>
            <td>USD</td>
            <td>
              <input type="checkbox" style={{ width: "15px" }} disabled />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountItem;
