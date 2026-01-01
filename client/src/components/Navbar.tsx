import { useState } from "react";
import { Menu, X, ArrowLeft, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Don't show back button on home/landing pages
  const hideBackButton = ["/", "/home", "/signin", "/signup"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 py-3 px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side - Back button and Logo */}
        <div className="flex items-center gap-2">
          {/* Back Button */}
          {!hideBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          {/* Logo */}
          <button
            onClick={() => navigate("/home")}
            aria-label="Homepage"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={logo} className="h-10 w-10" alt="Logo" />
            <span className="text-xl font-bold text-foreground hidden sm:block">
              PUNARNAVAH
            </span>
          </button>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/home")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border mt-3 pt-4 pb-2">
          <div className="flex flex-col gap-2 px-2">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" onClick={() => { toggleMenu(); navigate("/profile"); }} className="justify-start">
                  My Profile
                </Button>
                <Button variant="ghost" onClick={() => { toggleMenu(); navigate("/home"); }} className="justify-start">
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={() => { toggleMenu(); handleLogout(); }} className="justify-start text-destructive">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => { toggleMenu(); navigate("/signin"); }} className="justify-start">
                  Sign In
                </Button>
                <Button onClick={() => { toggleMenu(); navigate("/signup"); }}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
