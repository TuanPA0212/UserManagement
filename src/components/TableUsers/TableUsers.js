import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllUser } from '../../services/UserService';
import ModalAddNewUser from '../ModalAddNewUser/ModalAddNewUser';

const TableUsers = (props) => {
  // const { show, handleClose } = props;

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleAddUser = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const getUsers = async (page) => {
    let resp = await fetchAllUser(page);
    if (resp && resp.data) {
      setTotalUsers(resp.total);
      setTotalPages(resp.total_pages);
      setListUsers(resp.data);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  return (
    <>
      <div className="my-3 d-flex align-items-center justify-content-between">
        <span>
          <b>List Users:</b>
        </span>
        <button className="btn btn-primary" onClick={handleAddUser}>
          Add user
        </button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user - ${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
      />
      <ModalAddNewUser
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};

export default TableUsers;
