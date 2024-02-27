import _, { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaSortDown, FaSortUp, FaPlusCircle, FaFileImport } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { fetchAllUser } from '../../services/UserService';
import ModalAddNewUser from '../ModalAddNewUser/ModalAddNewUser';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import ModalEditUser from '../ModalEditUser/ModalEditUser';
import { CSVLink, CSVDownload } from 'react-csv';
import { MdOutlineFileDownload } from 'react-icons/md';
import Papa from 'papaparse';
import styles from './style.module.scss';
import { toast } from 'react-toastify';

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});
  const [dataExport, setDataExport] = useState([]);

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleUpdateEdit = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleUpdateDeleteUser = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  const handleAddUser = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setShowModalConfirm(false);
    setShowEditModal(false);
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

  const handleEdit = (user) => {
    setDataEditUser(user);
    setShowEditModal(true);
  };

  const handleConfirmModal = (user) => {
    setShowModalConfirm(true);
    setDataDeleteUser(user);
  };

  const handleSort = (sortBy, sortField) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, sortField, sortBy);
    setListUsers(cloneListUsers);
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term));
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 1000);

  const handleExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(['Id', 'Email', 'First Name', 'Last Name']);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
    }
    setDataExport(result);
    done();
  };

  const handleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      if (file.type !== 'text/csv') {
        toast.warning('File must be csv');
        return;
      }
      Papa.parse(file, {
        header: true,
        complete: function (responses) {
          const filteredData = responses.data.filter((row) =>
            Object.values(row).some((value) => value !== '')
          );
          setListUsers(filteredData);
        },
      });
    }
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
        <div className="d-flex gap-2">
          <label htmlFor="import" className="btn btn-warning">
            <FaFileImport className="pe-1" />
            Import
          </label>
          <input id="import" type="file" hidden onChange={(event) => handleImport(event)} />

          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            onClick={handleExport}
            filename={'users.csv'}
            className="btn btn-success"
          >
            <MdOutlineFileDownload className="pe-1" />
            Export
          </CSVLink>

          <button className="btn btn-primary" onClick={handleAddUser}>
            <FaPlusCircle className="pe-1" />
            Add user
          </button>
        </div>
      </div>
      <div className="col-5">
        <input
          className={styles['search-by-email-input']}
          placeholder="Search user by email..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <div className={styles['sort-header']}>
                <span className={styles['sort-header__title']}>ID</span>
                <span className={styles['sort-header__icon']}>
                  <FaSortUp
                    className={styles['icon__sort']}
                    onClick={() => {
                      handleSort('desc', 'id');
                    }}
                  />
                  <FaSortDown
                    className={styles['icon__sort']}
                    onClick={() => {
                      handleSort('asc', 'id');
                    }}
                  />
                </span>
              </div>
            </th>
            <th>
              <span>
                <div className={styles['sort-header']}>
                  <span className={styles['sort-header__title']}>Email</span>
                  <span className={styles['sort-header__icon']}>
                    <FaSortUp
                      className={styles['icon__sort']}
                      onClick={() => {
                        handleSort('desc', 'email');
                      }}
                    />
                    <FaSortDown
                      className={styles['icon__sort']}
                      onClick={() => {
                        handleSort('asc', 'email');
                      }}
                    />
                  </span>
                </div>
              </span>
            </th>
            <th>
              <div className={styles['sort-header']}>
                <span className={styles['sort-header__title']}>First Name</span>
                <span className={styles['sort-header__icon']}>
                  <FaSortUp
                    className={styles['icon__sort']}
                    onClick={() => {
                      handleSort('desc', 'first_name');
                    }}
                  />
                  <FaSortDown
                    className={styles['icon__sort']}
                    onClick={() => {
                      handleSort('asc', 'first_name');
                    }}
                  />
                </span>
              </div>
            </th>
            <th>
              <div className={styles['sort-header']}>
                <span className={styles['sort-header__title']}>Last Name</span>
                <span className={styles['sort-header__icon']}>
                  <FaSortUp
                    className={styles['icon__sort']}
                    onClick={() => {
                      handleSort('desc', 'last_name');
                    }}
                  />
                  <FaSortDown
                    className={styles['icon__sort']}
                    onClick={() => {
                      handleSort('asc', 'last_name');
                    }}
                  />
                </span>
              </div>
            </th>
            <th>Action</th>
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
                  <td>
                    <button className="btn btn-warning mx-3" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleConfirmModal(item)}>
                      Delete
                    </button>
                  </td>
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
      <ModalEditUser
        showEditModal={showEditModal}
        handleClose={handleClose}
        dataEditUser={dataEditUser}
        handleUpdateEdit={handleUpdateEdit}
      />
      <ModalConfirm
        showModalConfirm={showModalConfirm}
        handleClose={handleClose}
        dataDeleteUser={dataDeleteUser}
        handleUpdateDeleteUser={handleUpdateDeleteUser}
      />
    </>
  );
};

export default TableUsers;
