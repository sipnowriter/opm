import React from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import "./Modal.css"

type ModalProps = {
  children: React.ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <Button className="modal-close-button" onClick={onClose}>Close</Button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal