import React, { useState } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Briefcase,
  Map,
  MessageSquare,
  BarChart3,
  User,
  Menu,
  Sun,
  Moon,
  LogOut,
  Globe,
} from "lucide-react";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated,
    user,
    logout,
    theme,
    toggleTheme,
    language,
    changeLanguage,
  } = useApp();
  const t = useTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("projects"), href: "/projects", icon: Briefcase },
    { name: t("map"), href: "/map", icon: Map },
    { name: t("feedback"), href: "/feedback", icon: MessageSquare },
    { name: t("reports"), href: "/reports", icon: BarChart3 },
    { name: t("profile"), href: "/profile", icon: User },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const NavLinks = ({ mobile = false }) => (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href);
        return (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.href);
              if (mobile) setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );

  const languages = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 border-r border-border bg-card">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-border">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-primary-foreground"
                >
                  <path
                    d="M12 2L2 7v10c0 5.523 4.477 10 10 10s10-4.477 10-10V7L12 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">Elevatos</h1>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <NavLinks />
          </div>

          {/* User Info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-2 py-2 text-sm">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 lg:px-8">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center h-16 px-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6 text-primary-foreground"
                      >
                        <path
                          d="M12 2L2 7v10c0 5.523 4.477 10 10 10s10-4.477 10-10V7L12 2z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className="font-bold text-lg leading-none">
                        Elevatos
                      </h1>
                      <p className="text-xs text-muted-foreground">Manager</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 overflow-y-auto">
                  <NavLinks mobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1" />

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={language === lang.code ? "bg-muted" : ""}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>{t("profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
