import { useEffect, useRef } from "react";
import type { PhotoModalType } from "../../types/Provider/ProviderType";

export default function PhotoModal({ imageSrc, onClose }: PhotoModalType) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;

    if (modal) {
      modal.showModal();
      document.body.style.overflow = "hidden";

      const handleCancel = (e: Event) => {
        e.preventDefault();
        document.body.style.overflow = "";
        onClose();
      };

      modal.addEventListener("cancel", handleCancel);
      return () => modal.removeEventListener("cancel", handleCancel);
    }
  }, [onClose]);

  return (
    <dialog
      ref={modalRef}
      className="modalContent"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          document.body.style.overflow = "";
          onClose();
        }
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target === modalRef.current) {
          document.body.style.overflow = "";
          onClose();
        }
      }}
    >
      <button
        className="closeButton"
        type="button"
        aria-label="Fermer"
        onClick={() => {
          if (modalRef.current) {
            modalRef.current.close();
          }
          document.body.style.overflow = "";
          onClose();
        }}
      >
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${imageSrc}`}
          alt="Agrandissement"
        />
      </button>
    </dialog>
  );
}
