/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { QrReader } from 'react-qr-reader';

function QRCode({
  setEVCCode,
  modalOpen,
  setModalOpen,
}) {
  const [delayScan, setDelayScan] = useState(500);
  const closeCam = async () => {
    setDelayScan(false);
  };
  useEffect(() => {
    if (!modalOpen) {
      closeCam();
    }
  }, [modalOpen]);
  return (
    <Modal
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer
    >
      <div>
        <QrReader
          scanDelay={delayScan}
          style={{ width: '100%' }}
          constraints={{
            facingMode: 'environment',
          }}
          onResult={(result, error) => {
            if (result) {
              setEVCCode(result?.text);
              setModalOpen(false);
            }
            if (error) {
              // Do nothing
            }
          }}
        />
      </div>
      {' '}

    </Modal>
  );
}

export default QRCode;
