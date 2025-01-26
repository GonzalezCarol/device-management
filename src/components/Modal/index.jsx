import React from 'react';
import PropTypes from 'prop-types';
import {CloseButton, ModalContainer, ModalOverlay, ModalTitle, TitleContainer} from "./styles/index.jsx";
import closeIcon from '../../assets/close-icon.svg'

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
				<TitleContainer>
					<ModalTitle>{modalTitle}</ModalTitle>
					<CloseButton onClick={onClose} src={closeIcon} alt={'close'}/>
				</TitleContainer>
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

