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
        <div className="fixed left-0 top-0 z-10 flex size-full max-w-full place-items-center bg-black/70">
          <div className="relative mx-auto flex size-72 flex-col place-items-center justify-center bg-blob bg-center text-smokeWhite">
            <div
              className="absolute right-4 top-4 size-2 bg-close bg-center text-base2 hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
}
