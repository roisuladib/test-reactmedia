import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import propTypes from 'prop-types';


export const Modal = props => {
   const [ready, setReady] = useState(false);
   const [display, setDisplay] = useState(false);
   const [allow, setAllow] = useState(true);
   const modalRef = useRef(null);

   const idModal = 'modal';

   const toggle = () => props.taoggleModal ? props.toggleModal() : setDisplay(!display);
   const toggleAllow = () => setAllow(!allow);
   const handleOutside = e => {
      if (modalRef?.current && !modalRef?.current?.contains?.(e.target) && allow) toggle();
   }

   useEffect(() => {
      const rootContainer = document.createElement('div');
      rootContainer.setAttribute('id', idModal);
      setReady(!ready);
      if (!document.getElementById(idModal)) document.body.appendChild(rootContainer);
   }, []);

   useEffect(() => document.addEventListener('mousedown', handleOutside,
      () => document.removeEventListener('mousedown', handleOutside)));

   useEffect(() => {
      if (display || props.in) document.querySelector('body').classList.add('modal-open');
      return () => document.querySelector('body').classList.remove('modal-open');
   }, [display, props.in]);

   if (!ready) return null;

   return (
      <>
         {props.children(toggle)}
         {document && document.getElementById(idModal) && <div>
            {
               createPortal(
                  <CSSTransition in={props.in ?? display} timeout={500} onExit={toggleAllow} onExited={toggleAllow} classNames="overlay" unmountOnExit>
                     <div className="overlay fixed bg-[#00000095] inset-0 h-screen z-50 p-10">
                        <div className="absolute inset-0 bg-black opacity-25 z-10" />
                        <div className="absolute flex items-center justify-center inset-0 z-20">
                           <div ref={modalRef} style={props.modalStyle} className="bg-white shadow-2xl w-full md:w-auto md:max-w-3xl rounded-xl">
                              <div className="relative">
                                 <span onClick={toggle} title="close" className="modal-close" />
                              </div>
                              {props.content(toggle)}
                           </div>
                        </div>
                     </div>
                  </CSSTransition>,
                  document.getElementById(idModal)
               )
            }
         </div>}
      </>
   );
}

Modal.defaultProps = {}
Modal.propTypes = {
   in: propTypes.bool,
   toggleModal: propTypes.func,
   content: propTypes.func.isRequired
}