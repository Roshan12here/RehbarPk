import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modalsearch: React.FC<ModalProps> = ({ visible, setVisible, children }) => {
  return (
    <Transition show={visible} as={Fragment}>
      <Dialog onClose={() => setVisible(false)} static={true} open={visible}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-50 transition-opacity bg-black bg-opacity-75 backdrop-filter backdrop-blur"></div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 z-50 flex items-start justify-center">
            <Dialog.Panel
              className="relative w-full max-w-lg sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto my-8 sm:my-16 lg:my-24 p-4 sm:p-6 bg-cover bg-center bg-no-repeat rounded-md shadow-md"
              style={{ backgroundImage: 'url(mon.jpg)' }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>

              <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
                <button
                  onClick={() => setVisible(false)}
                  className="hover:opacity-70 focus:outline-none"
                >
                  <X className="w-5 h-5 text-[#ffffff]" aria-hidden="true" />
                </button>
              </div>

              <div className="relative z-10 flex flex-col flex-1 px-4 py-6 sm:px-8 sm:py-10">
                {children}
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modalsearch;
