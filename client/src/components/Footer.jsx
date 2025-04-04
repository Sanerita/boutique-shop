const Footer = () => {
    return (
      <footer className="py-3 bg-dark text-white">
        <Container>
          <div className="text-center">
            &copy; {new Date().getFullYear()} Boutique Shop
          </div>
        </Container>
      </footer>
    );
  };
  
  export default Footer;