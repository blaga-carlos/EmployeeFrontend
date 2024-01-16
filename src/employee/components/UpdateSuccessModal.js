import React from 'react';
import './UpdateSuccessModal.css';

const UpdateSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="update-success-modal-overlay" onClick={onClose}>
      <div className="update-success-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Update Successful</h3>
        <p>Your employee information has been updated successfully!</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateSuccessModal;
