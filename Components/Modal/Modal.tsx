"use client"
import { ReactNode, useEffect, useState } from "react";
import "./Modal.css"
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
export default function ({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null; 

    const modalContent = (
    <div className="container__modal" onClick={onClose}>
    
      <div className="conteudo__modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
   return createPortal(modalContent, document.body);
}