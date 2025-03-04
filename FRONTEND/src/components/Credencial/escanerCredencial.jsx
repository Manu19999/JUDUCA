//import { useState } from "react";
//import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleReset = () => {
    setScanResult(null);
    setErrorMessage(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 className="credenciallisttitle">Escanear Código QR</h2>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (result) {
            setScanResult(result.text);
            setErrorMessage(null);
          }
          if (error) {
            setErrorMessage("No se pudo leer el código QR, intenta nuevamente.");
          }
        }}
        style={{ }}
      />
      {scanResult && <p>Resultado: {scanResult}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {(scanResult || errorMessage) && (
        <button onClick={handleReset} style={{ marginTop: "10px" }}>
          Escanear de nuevo
        </button>
      )}
    </div>
  );
};

export default QRScanner;
