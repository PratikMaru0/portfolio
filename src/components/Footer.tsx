const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-themeText p-4 bg-primary/20 mt-auto">
      <aside>
        <p>
          Made with 💖 using MERN stack -{new Date().getFullYear()}. Feel free
          to clone. ✌️
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
