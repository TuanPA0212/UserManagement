import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { editUser } from '../../services/UserService';

const ModalEditUser = (props) => {
  const { showEditModal, handleClose, dataEditUser, handleUpdateEdit } = props;

  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const resp = await editUser(name, job, dataEditUser.id);
    setLoading(true);
    if (resp && resp.updatedAt) {
      handleUpdateEdit({ first_name: name, id: dataEditUser.id });
      toast.success('Updated successfully');
      handleClose();
    } else {
      toast.error('Update failed');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (showEditModal) {
      setName(dataEditUser.first_name);
    }
  }, [dataEditUser]);

  return (
    <Modal show={showEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Input name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Job</label>
          <input
            className="form-control"
            placeholder="Input job"
            value={job}
            onChange={(event) => setJob(event.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>

        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
