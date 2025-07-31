const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-themeBackground text-themeText p-4 bottom-0">
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
