import React from 'react';
import PropTypes from 'prop-types';
import {ModalContainer, ModalOverlay, ModalTitle} from "./styles/index.jsx";

export const Modal = ({isModalOpen, onClose, modalTitle, children}) => {
	if (!isModalOpen) return null;

	const handleOverlayClick = () => {
		onClose();
	};

	const handleModalContainerClick = (e) => {
		e.stopPropagation();
	};

	return (
		<ModalOverlay onClick={handleOverlayClick}>
			<ModalContainer onClick={handleModalContainerClick}>
				<ModalTitle>{modalTitle}</ModalTitle>
				<div>{children}</div>
			</ModalContainer>
		</ModalOverlay>
	);
};

Modal.propTypes = {
	isModalOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	modalTitle: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

