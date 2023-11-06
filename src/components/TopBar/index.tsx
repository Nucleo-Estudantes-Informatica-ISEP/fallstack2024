import ThemeChanger from "../Theme/ThemeChanger";

const Topbar: React.FC = () => {
  return (
    <nav className="w-full">
      <div className="flex space-x-5 p-5 justify-end">
        <ThemeChanger />
      </div>
    </nav>
  );
};

export default Topbar;