"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, logout, isAdmin } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">
                FAAQS
                <div className="h-0.5 w-full bg-secondary rounded-full mt-1"></div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/programmes"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              aria-label="Voir nos programmes de formation"
            >
              Programmes
            </a>
            <a
              href="/tarifs"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              aria-label="Consulter nos tarifs"
            >
              Tarifs
            </a>
            <a
              href="/ressources"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              aria-label="Accéder aux ressources"
            >
              Ressources
            </a>
            <a
              href="/reussites"
              className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              aria-label="Voir les témoignages de réussite"
            >
              Réussites
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {userProfile?.displayName || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin() && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Mon tableau de bord</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Mon profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    className="text-foreground hover:text-accent hover:bg-accent/10"
                    aria-label="Se connecter à son compte"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6"
                    aria-label="Commencer la préparation BTS gratuitement"
                  >
                    Commencer Gratuitement
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-4 py-4 space-y-4">
              <a
                href="/programmes"
                className="block text-foreground hover:text-accent transition-colors duration-200 font-medium py-2"
                onClick={toggleMenu}
              >
                Programmes
              </a>
              <a
                href="/tarifs"
                className="block text-foreground hover:text-accent transition-colors duration-200 font-medium py-2"
                onClick={toggleMenu}
              >
                Tarifs
              </a>
              <a
                href="/ressources"
                className="block text-foreground hover:text-accent transition-colors duration-200 font-medium py-2"
                onClick={toggleMenu}
              >
                Ressources
              </a>
              <a
                href="/reussites"
                className="block text-foreground hover:text-accent transition-colors duration-200 font-medium py-2"
                onClick={toggleMenu}
              >
                Réussites
              </a>
              <div className="pt-4 space-y-3 border-t border-border">
                {user ? (
                  <>
                    {isAdmin() && (
                      <Link href="/admin" onClick={toggleMenu}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Link href="/dashboard" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full justify-start">
                        Mon tableau de bord
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive"
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth" onClick={toggleMenu}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-foreground hover:text-accent hover:bg-accent/10"
                      >
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/auth" onClick={toggleMenu}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                        Commencer Gratuitement
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
