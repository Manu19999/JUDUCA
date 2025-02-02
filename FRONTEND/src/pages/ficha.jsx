import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function ficha() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-4">GESTIÓN DE FICHAS</h1>
  
        <div className="d-flex flex-column gap-3">
          <Button variant="outline-success" size="lg">
            CREAR FICHA
          </Button>
  
          <Button variant="outline-success" size="lg">
            LLENAR FICHA
          </Button>
  
          <Button variant="outline-success" size="lg">
            ELIMINAR FICHA
          </Button>
        </div>
      </div>
    );
  }
  
  export default ficha;