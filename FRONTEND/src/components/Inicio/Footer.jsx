import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import "../../styles/Inicio/Footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer-custom">
      <Container className="py-5">
        <Row className="footer-row text-center text-md-center">

          {/* Enlaces rápidos */}
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h5 className="footer-title">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-3"><a href="https://www.unah.edu.hn/" className="footer-link"> <FaGlobe className="ml-3" /> Sitio Oficial UNAH </a></li>
            </ul>
          </Col>

          {/* Sección de contacto */}
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h5 className="footer-title">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-4">
                <FaMapMarkerAlt className="me-2" />
                Bulevar Suyapa, Tegucigalpa, M.D.C, Honduras, Centroamérica
              </li>
              <li className="mb-4">
                <FaPhone className="me-2" />
                +504 2216-6100, 2216-5100
              </li>
              <li className="mb-4">
                <FaEnvelope className="me-2" />
                info@unah.edu.hn
              </li>
            </ul>
          </Col>
          {/* Redes Sociales */}
          <Col md={4} className="footer-section">
            <h5 className="footer-title">Síguenos</h5>
            <div className="social-icons">
              <a href="https://www.facebook.com/UNAHoficial" title="Facebook UNAH" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaFacebook className="me-2" />
              </a>
              <a href="https://twitter.com/UNAHoficial" title="Twitter UNAH" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaTwitter className="me-2" />
              </a>
              <a href="https://www.instagram.com/unahoficial/" title="Instagram UNAH" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaInstagram className="me-2" />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="text-center mt-4 mb-0">
          © {new Date().getFullYear()} Universidad Nacional Autónoma de Honduras. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
