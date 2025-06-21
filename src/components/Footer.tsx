const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
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
