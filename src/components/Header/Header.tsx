import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-background">
        <div className="header-rect-green"></div>
        <div className="header-rect-separator"></div>
        <div className="header-rect-cyan"></div>
      </div>
      <div className="header-title text-bold text-400">LOREM IPSUM</div>
    </header>
  );
};

export default Header;
