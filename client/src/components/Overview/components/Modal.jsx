import React from 'react';
import styles from '../overview.module.css';

function Modal ({ show, setShow, toggleModal, children }) {
	return (
		<div
			id="modal"
			className={`${styles.modal} ${styles['modal-hidden']}`}
			onClick={() => toggleModal(show, setShow)}
		>
			{children}
			<button>X</button>
		</div>
	)
};

export default Modal;