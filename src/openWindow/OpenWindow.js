import React from 'react';

import './openWindow.css';

const OpenWindow = ({ isVisible = false, title, content, footer, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return !isVisible ? null : (
    
    // <div className="modal-open" tabIndex="-1" onClick={onClose}>
    //   <div className="modal-dialog" onClick={e => e.stopPropagation()}>
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title">{title}</h5>
    //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
    //       </div>
    //       <div className="modal-body">{content}</div>
    //       <div className="modal-footer">{footer}</div>
    //     </div>
    //   </div>
    // </div>
    // && console.log('Modal is open')





    <div className="modal-open" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>

    </div>
  );
};

export default OpenWindow;