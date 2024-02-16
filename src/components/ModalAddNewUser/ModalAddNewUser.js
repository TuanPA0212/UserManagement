import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addNewUser } from '../../services/UserService';

const ModalAddNewUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;

  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const resp = await addNewUser(name, job);
    setLoading(true);
    if (resp && resp.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success('User added successfully!');
      handleUpdateTable({ first_name: name, id: resp.id });
    } else {
      toast.error('User not added successfully!');
    }
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Add New User</Modal.Title>
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
        <Button variant="primary" onClick={handleSave} onLoad={loading}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewUser;
