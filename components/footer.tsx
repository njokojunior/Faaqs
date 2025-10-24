import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">
              FAAQS
              <div className="h-0.5 w-full bg-secondary rounded-full mt-1"></div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plateforme de préparation au BTS avec fiches de révision, quiz
              interactifs et annales corrigées pour réussir ton examen avec
              mention.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programmes"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Programmes
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/ressources"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Ressources
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Communauté
                </Link>
              </li>
              <li>
                <Link
                  href="/quizzes"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/aide"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Yaoundé, Cameroun</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href="tel:+237123456789"
                  className="hover:text-primary transition-colors"
                >
                  +237 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:contact@faaqs.com"
                  className="hover:text-primary transition-colors"
                >
                  contact@faaqs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} FAAQS. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link
                href="/mentions-legales"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
