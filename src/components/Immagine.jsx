import React from 'react';
import Image from 'react-bootstrap/Image';

function Immagine() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Image src="/Logo MegSuiteApp.png" fluid />
      <h1>Benvenuti in Meg Suite</h1>
    </div>
  );
}

export default Immagine;
