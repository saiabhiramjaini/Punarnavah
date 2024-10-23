import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [{ name: "Home", path: "/" }];

  const NavButton = ({ children, onClick }: any) => (
    <button
      onClick={onClick}
      className="font-medium p-2 hover:text-gray-400"
    >
      {children}
    </button>
  );

  return (
    <nav className="py-4 px-6 border-b border-gray-300 shadow-md ">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => {navigate("/home")}} aria-label="Homepage">
            <div className="text-2xl font-limeLight font-semibold flex justify-center items-center gap-3">
              <img src={logo} className="h-12 w-12"/>PUNARNAVAH
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavButton key={item.name} onClick={() => {navigate(item.path)}}>
              {item.name}
            </NavButton>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              <div className="flex flex-col items-center">
                <IoPersonSharp className="text-2xl" /> <span>PROFILE</span>{" "}
              </div>
            </button>
          ) : (
            <Button
              text={"Signup"}
              onClick={() => {
                navigate("/signup");
              }}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded transition duration-300 hover:bg-gray-200"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black p-4 rounded-md shadow-lg mt-2">
          <div className="flex flex-col space-y-2 justify-center items-center">
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
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <div className="flex flex-col items-center">
                    <IoPersonSharp className="text-2xl" /> <span>PROFILE</span>{" "}
                  </div>
                </button>
              ) : (
                <Button
                  text={"Signup"}
                  onClick={() => {
                    navigate("/signup");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
