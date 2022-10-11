import React from "react";
import Modal from "react-modal";
Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.78)";

export const ModalCustom = ({ children, visible }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "600px",
      border: "0px",
      borderRadius: "10px",
      padding: "1em",
    },
  };

  return (
    <Modal
      isOpen={visible}
      style={customStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
};
