import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../../services/UserService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
  const { showModalConfirm, handleClose, dataDeleteUser, handleUpdateDeleteUser } = props;

  const confirmDelete = async (id) => {
    const resp = await deleteUser(id);
    if (resp && +resp.statusCode === 204) {
      toast.success('Delete user successfully');
      handleUpdateDeleteUser(dataDeleteUser);
      handleClose();
    } else {
      toast.error('Delete user failed');
    }
  };

  return (
    <Modal show={showModalConfirm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete an user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <h3>This action can't be undo</h3>
          Are you sure you want to delete user
          <br />
          <b>"{dataDeleteUser.email}"</b> ????
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary" onClick={() => confirmDelete(dataDeleteUser.id)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
