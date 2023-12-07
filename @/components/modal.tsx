import React, { type ReactNode } from "react";

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalProps {
  /** The title of the modal */
  title: string;

  /** An optional subtitle for the modal */
  subTitle?: string;

  /**
   * Custom header content for the modal
   * Header is static (doesn't scroll) thus always visible
   * */
  header?: ReactNode;

  /**
   * The main content of the modal
   * Content is wrapped in a scrollable component.
   */
  content: string | ReactNode;

  /**
   * Custom footer content for the modal
   * Footer is static (doesn't scroll) thus always visible
   */
  footer?: ReactNode;

  /** Size of the modal: small, medium, or large */
  size?: "auto" | "sm" | "md" | "lg" | "xl";

  /** Whether to show the close button. Default is true */
  showCloseCross?: boolean;

  /** If true, clicking on the backdrop will not close the modal. */
  disableCancelOnBackdrop?: boolean;

  /** Whether the modal is currently visible */
  isVisible: boolean;

  /**
   * Custom value for z-index of the modal.
   * Should be set between 70-99.
   * @default 70
   */
  zIndex?: number;

  /** New close function for the modal */
  onClose: () => void;

  contentWrapper?: (children: React.ReactNode) => JSX.Element;
}

/**
 * Properties for the Modal component.
 *
 * An implementation example can be found in the playground.
 */
const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    subTitle,
    header,
    content,
    footer,
    contentWrapper,
    size = "auto",
    disableCancelOnBackdrop = false,
    showCloseCross = true,
    isVisible,
    zIndex,
    onClose,
  } = props;

  const handleOutsideClick = () => {
    onClose();
  };

  let width: string | undefined = undefined;
  switch (size) {
    case "auto":
      width = "auto";
      break;
    case "sm":
      width = "25rem";
      break;
    case "md":
      width = "37.5rem";
      break;
    case "lg":
      width = "60rem";
      break;
    case "xl":
      width = "90rem";
      break;
  }

  const contentJSX = (
    <>
      {header && <div className="pb-6">{header}</div>}
      {!contentWrapper ? (
        <div className="-mx-[5px] min-h-[50px] overflow-x-hidden overflow-y-scroll px-[5px]">
          {content}
        </div>
      ) : (
        <div className="-mx-[5px] -mr-3 min-h-[50px] space-y-6 overflow-x-hidden overflow-y-scroll px-[5px]">
          {content}
        </div>
      )}
      {footer && <div>{footer}</div>}
    </>
  );

  return isVisible ? (
    <div
      className="bg-background-backdrop-default text-text-neutral-secondary fixed inset-0 z-[70] flex items-center justify-center p-5"
      style={{ zIndex: zIndex }}
    >
      <div
        className="fixed inset-0 z-0"
        onClick={() => {
          !disableCancelOnBackdrop && handleOutsideClick();
        }}
      ></div>
      <div
        className="modal bg-elevation-overlay shadow-general-lg dark:border-border-input-backdown relative z-10 flex max-h-[95vh] w-full max-w-full flex-col rounded-xl p-6 dark:border md:p-8"
        style={{ width }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="mb-4">
            <div>
              <h3 className="text-text-neutral-primary text-xl font-medium">
                {title}
              </h3>
            </div>
            {subTitle && (
              <div>
                <h5>{subTitle}</h5>
              </div>
            )}
          </div>
          {showCloseCross && (
            <button
              onClick={onClose}
              type="button"
              className="ml-auto p-0"
              data-modal-hide="defaultModal"
            >
              X
            </button>
          )}
        </div>
        {contentWrapper ? contentWrapper(contentJSX) : contentJSX}
      </div>
    </div>
  ) : null;
};
export default Modal;
