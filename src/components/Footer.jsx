import React from 'react';
import { Container } from 'react-bootstrap'; // Import Container

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <Container>
        <p className="mb-0">&copy; 2023 Running AI Coach. All rights reserved.</p>
        <p className="mb-0">
          <a href="/privacy-policy" className="text-white me-3">Privacy Policy</a>
          <a href="/terms-of-service" className="text-white">Terms of Service</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;