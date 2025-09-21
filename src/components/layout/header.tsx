import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Heart, Globe, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

function HeaderImpl() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Resources", to: "/resources" },
    { name: "Community", to: "/community" },
    { name: "Tracking", to: "/tracking" },
    { name: "Insights", to: "/insights" },
  ];

  const linkBase =
    "text-sm font-medium hover:text-foreground smooth-transition";
  const linkActive = "text-foreground";
  const linkInactive = "text-muted-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pointer-events-auto">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Umeed home"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart
              className="w-5 h-5 text-primary-foreground"
              fill="currentColor"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">Umeed</span>
            <Badge variant="secondary" className="text-xs">
              उम्मीद
            </Badge>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">EN</span>
          </Button>

          <Link to="/auth/signup" aria-label="Sign up">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign Up
            </Button>
          </Link>

          <Link to="/auth/login" aria-label="Login">
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-6 border-b">
                  <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                      <Heart
                        className="w-4 h-4 text-primary-foreground"
                        fill="currentColor"
                      />
                    </div>
                    <span className="text-lg font-bold">Umeed</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-4 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className="text-lg font-medium text-foreground hover:text-primary smooth-transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-auto space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Switch to Hindi
                  </Button>

                  <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>

                  <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="default" className="w-full justify-start">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// export default AND named — works with both import styles
export default HeaderImpl;
export const Header = HeaderImpl;
