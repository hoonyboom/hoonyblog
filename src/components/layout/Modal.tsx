import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full max-w-full place-items-center bg-black/70">
          <div className="relative mx-auto flex h-72 w-72 flex-col place-items-center justify-center bg-blob bg-center text-smokeWhite">
            <div
              className="absolute top-4 right-4 h-2 w-2 bg-close bg-center text-base2 hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
