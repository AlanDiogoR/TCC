import QRCode from 'qrcode.react';
import React from 'react';

interface PixPaymentProps {
  value: number;
}

const PixPayment: React.FC<PixPaymentProps> = ({ value }) => {
  // Format the data for the QR code
  const pixPayload = `00020126580014BR.GOV.BCB.PIX01361ec47a03-f5c7-4076-888e-bd6a90fb99ca5204000053039865406${value}.995802BR5925Alan Diogo Ribeio de Carv6009SAO PAULO621405101xa324Icz3630407D1`;

  return (
    <div>
      <h2>Escaneie o QR Code para pagar com PIX</h2>
      {/* Use the QRCode component */}
      <QRCode value={pixPayload} />
    </div>
  );
};

export default PixPayment;
