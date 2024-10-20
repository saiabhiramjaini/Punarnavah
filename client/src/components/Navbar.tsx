import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", path: "/" },
  ];

  const NavButton = ({ children, onClick }: any) => (
    <button
      onClick={onClick}
      className="font-medium p-2 rounded transition duration-300 hover:bg-gray-200 focus:outline-none"
    >
      {children}
    </button>
  );

  return (
    <nav className="py-4 px-6 border-b border-gray-300 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => { }} aria-label="Homepage">
            <div className="text-2xl font-limeLight font-semibold">PUNARNAVAH</div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavButton key={item.name} onClick={() => { }}>
              {item.name}
            </NavButton>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-4">
          <Button text={"Signup"} onClick={() => { }} />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2 rounded transition duration-300 hover:bg-gray-200">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black p-4 rounded-md shadow-lg mt-2">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavButton
                key={item.name}
                onClick={() => {
                  toggleMenu();
                }}
              >
                {item.name}
              </NavButton>
            ))}

            <div className="flex gap-3 mt-2">
              <Button text={"Sign Up"} onClick={() => { }} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


