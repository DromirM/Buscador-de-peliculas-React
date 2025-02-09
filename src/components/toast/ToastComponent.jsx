import Toast from 'react-bootstrap/Toast';
import './toastStyles.css';
import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';

export const ToastComponent = ({message = 'Default Message'}) => {
  const {showToast, setShowToast} = useContext(ToastContext);
  
  return (
    <>
      <div className='notificationContainer'>
        <Toast onClose={() => setShowToast(false)} bg='dark' show={showToast} delay={4000} autohide>
          <Toast.Header>
            <img src="/assets/images/icons/favicon.ico" className="rounded me-2" alt="Image Not Found" />
            <strong className="me-auto">Notificación</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
    </>
  );
}
