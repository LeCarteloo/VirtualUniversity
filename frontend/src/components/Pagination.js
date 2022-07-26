const Pagination = ({ perPage, total, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <a href="#!" onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
