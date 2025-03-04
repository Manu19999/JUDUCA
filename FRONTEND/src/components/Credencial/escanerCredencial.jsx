import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleReset = () => {
    setScanResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Escanear Código QR</h2>
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
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
            className="w-full h-auto"
          />
        </div>
        {scanResult && <p className="text-green-600 font-semibold">Resultado: {scanResult}</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {(scanResult || errorMessage) && (
          <button
            onClick={handleReset}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Escanear de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
