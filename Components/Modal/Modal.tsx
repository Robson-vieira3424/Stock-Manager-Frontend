import { ReactNode } from "react";
import "./Modal.css"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
export default function ({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;


    return (
        <>
            <div className="container__modal">
                <div className="conteudo__modal">
                    <button className="modal__close" onClick={onClose}>&times;</button>
                    {children}
                </div>
            </div>
        </>
    )
}