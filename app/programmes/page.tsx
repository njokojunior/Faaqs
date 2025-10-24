"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import {
  Search,
  ChevronDown,
  Calculator,
  HardHat,
  Code,
  Heart,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgrammesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const btsCategories = [
    {
      id: "medico-sanitaires",
      title: "ÉTUDES MÉDICO-SANITAIRES",
      programs: [
        "Analyses de biologie médicale",
        "Diététique",
        "Opticien lunetier",
        "Prothésiste dentaire",
      ],
      link: "programmes/sciences-infirmieres",
    },
    {
      id: "genie-informatique",
      title: "GÉNIE INFORMATIQUE",
      programs: [
        "Services informatiques aux organisations",
        "Systèmes numériques",
        "Génie logiciel",
      ],
      link: "/programmes/genie-informatique",
    },
    {
      id: "sciences-biomedicales",
      title: "SCIENCES ET TECHNIQUES BIOMÉDICALES",
      programs: [
        "Biotechnologies",
        "Bioanalyses et contrôles",
        "Sciences et technologies des aliments",
      ],
      link: "/programmes/sciences-biomedicales",
    },
  ];

  const popularPrograms = [
    {
      id: "cge",
      title: "CGE – Comptabilité et Gestion des Entreprises",
      icon: Calculator,
      link: "/programmes/comptabilité",
    },
    {
      id: "bt",
      title: "BT – Bâtiment",
      icon: HardHat,
      link: "/programmes/batiment",
    },
    {
      id: "gl",
      title: "GL – Génie logiciel",
      icon: Code,
      link: "/programmes/génie-logiciel",
    },
    {
      id: "si",
      title: "SI – Sciences infirmières",
      icon: Heart,
      link: "/programmes/sciences-infirmieres",
    },
  ];

  const pricingPlans = [
    {
      id: "cycle-complet",
      name: "Cycle complet",
      duration: "2 ans",
      price: "599 F CFA",
      originalPrice: "999 F CFA",
      savings: "40%",
      description: "Abonnement durant 2 ans, 40% d'économies",
      features: [
        "Accès illimité",
        "Toutes les fiches, quiz, annales et méthodologies incluses",
        "Téléchargement PDF",
        "Espace communautaire",
        "Assistance prioritaire par WhatsApp",
        "Diplômé(e) ou Remboursé(e)",
      ],
      highlighted: true,
      buttonText: "Je choisis cette formule",
    },
    {
      id: "12-mois",
      name: "12 mois",
      duration: "1 an",
      price: "1299 F CFA",
      savings: "25%",
      description: "Abonnement durant 12 mois, 25% par rapport au plan mensuel",
      features: [
        "Accès complet pendant la période d'abonnement",
        "Toutes les fiches, quiz, annales et méthodologies incluses",
        "Téléchargement PDF",
      ],
      highlighted: false,
      buttonText: "Je choisis cette formule",
    },
    {
      id: "6-mois",
      name: "6 mois",
      duration: "6 mois",
      price: "1699 F CFA",
      savings: "15%",
      description: "Abonnement durant 06 mois, 15% par rapport au plan mensuel",
      features: [
        "Accès complet pendant la période d'abonnement",
        "Téléchargement PDF",
      ],
      highlighted: false,
      buttonText: "Je choisis cette formule",
    },
    {
      id: "1-mois",
      name: "1 mois",
      duration: "30 jours",
      price: "2500 F CFA",
      savings: null,
      description: "le mois",
      features: [
        "Accès complet pendant la période d'abonnement",
        "Téléchargement PDF",
      ],
      highlighted: false,
      buttonText: "Je choisis cette formule",
    },
  ];

  const comparisonData = [
    {
      formula: "Cycle complet",
      icon: "⭐",
      duration: "2 ans",
      price: "20 000",
      savings: "~40%",
      target: "Étudiant engagé jusqu'au diplôme",
      highlighted: true,
    },
    {
      formula: "12 mois",
      icon: "◆",
      duration: "1 an",
      price: "15 000",
      savings: "25%",
      target: "Suivi annuel",
      highlighted: false,
    },
    {
      formula: "6 mois",
      icon: "◆",
      duration: "6 mois",
      price: "10 000",
      savings: "15%",
      target: "Préparation intensive",
      highlighted: false,
    },
    {
      formula: "1 mois",
      icon: "◆",
      duration: "30 jours",
      price: "2 500",
      savings: "—",
      target: "Essai rapide",
      highlighted: false,
    },
  ];

  const faqData = [
    {
      question: "Comment pourrais-je accéder aux fiches ?",
      answer:
        "Après paiement de la commande, tu seras redirigé sur une page où tu pourras directement te connecter à notre plateforme et commencer à réviser. Nous t'enverrons également un mail récapitulatif de ta commande qui contiendra également un lien d'accès.",
    },
    {
      question: "Est-ce que FAAQS couvre toutes les UE du programme officiel ?",
      answer:
        "Oui, toutes les matières essentielles sont incluses (sciences fondamentales, soins infirmiers, santé publique, etc.).",
    },
    {
      question: "Y a-t-il des exercices pratiques ?",
      answer:
        "Tu trouveras des cas cliniques corrigés et des sujets pratiques tirés d'anciens examens.",
    },
    {
      question: "Faut-il être connecté au site pour accéder aux fiches ?",
      answer:
        "Tu dois être connecté à internet pour accéder à la plateforme de révision. Sinon tu peux télécharger le programme et le stocker où bon te semble : sur ton ordinateur, sur ta tablette, sur ton smartphone. Tu pourras donc y accéder en mode hors ligne (sans être connecté à internet).",
    },
    {
      question: "Est-ce que je peux poser mes propres questions ou exercices ?",
      answer:
        "Oui, dans l'espace communautaire, tu peux poster un sujet ou une question, et recevoir des réponses des professeurs et étudiants.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Choisis ton BTS
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90">
            et commence ta préparation !
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Instructions */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">👉</span>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Sélectionne ta spécialité dans la liste ci-dessous
              </h2>
            </div>
            <p className="text-lg text-muted-foreground mb-2">
              ou utilise la
              <span className="font-semibold text-foreground">
                barre de recherche
              </span>
              pour la trouver rapidement.
            </p>
            <p className="text-base text-muted-foreground">
              Les BTS sont classés par Filières et spécialités.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tape le nom ou l'acronyme de ton BTS (ex : CGE, SI, BAT, GL)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-6 pr-14 text-lg border-2 border-muted-foreground/20 rounded-full focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Button
                size="icon"
                className="absolute right-2 top-2 h-10 w-10 rounded-full bg-muted hover:bg-muted-foreground/10"
                variant="ghost"
              >
                <Search className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Liste des programmes BTS
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez tous nos programmes organisés par filières
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {btsCategories.map((category) => (
              <div
                key={category.id}
                className="border border-muted-foreground/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-6 bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <ChevronDown
                    className={`h-6 w-6 text-muted-foreground transition-transform ${
                      expandedCategories.includes(category.id)
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
                {expandedCategories.includes(category.id) && (
                  <div className="p-6 bg-background">
                    <div className="grid gap-3">
                      {category.programs.map((program, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground">{program}</span>
                        </div>
                      ))}
                    </div>

                    <form action={category.link}>
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6">
                        voir plus...
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Prêt à commencer ta révision ?
            </h3>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg"
            >
              Choisir mon BTS maintenant !
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Programmes populaires en ce moment
            </h2>
            <p className="text-lg text-muted-foreground">
              Les formations les plus demandées par nos étudiants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPrograms.map((program) => {
              const IconComponent = program.icon;
              return (
                <a href={program.link}>
                  <Card
                    key={program.id}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className="bg-muted/30 p-8 flex items-center justify-center">
                        <IconComponent className="h-16 w-16 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="bg-primary p-4 text-center">
                        <h3 className="text-primary-foreground font-semibold text-sm leading-tight">
                          {program.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos formules d'abonnement
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              Nous te proposons plusieurs formules pour accéder aux contenus
              pédagogiques de ce programme.
            </p>
            <p className="text-base text-muted-foreground">
              <span className="font-semibold text-foreground">
                Nos formules sont adaptées à différents besoins.
              </span>{" "}
              Trouve celle qui te correspond !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.highlighted ? "ring-2 ring-accent shadow-xl" : ""
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-accent-foreground rounded-full p-2">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                )}
                <CardContent
                  className={`p-6 ${plan.highlighted ? "bg-accent/10" : ""}`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {plan.price}
                    </h3>
                    <p className="text-muted-foreground">Par mois</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                    {plan.savings && (
                      <div className="mt-2">
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-semibold">
                          -{plan.savings} par rapport au plan mensuel
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-accent hover:bg-accent/90"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Résumé visuel (comparatif)
            </h2>
            <p className="text-lg text-muted-foreground">
              Comparez nos différentes formules en un coup d'œil
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-muted-foreground/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted-foreground/20 p-4 text-left font-semibold text-foreground">
                    Formule
                  </th>
                  <th className="border border-muted-foreground/20 p-4 text-left font-semibold text-foreground">
                    Durée
                  </th>
                  <th className="border border-muted-foreground/20 p-4 text-left font-semibold text-foreground">
                    Prix (FCFA)
                  </th>
                  <th className="border border-muted-foreground/20 p-4 text-left font-semibold text-foreground">
                    Économie réalisée
                  </th>
                  <th className="border border-muted-foreground/20 p-4 text-left font-semibold text-foreground">
                    Pour qui ?
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      row.highlighted ? "bg-accent/20" : "bg-background"
                    } hover:bg-muted/30 transition-colors`}
                  >
                    <td className="border border-muted-foreground/20 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{row.icon}</span>
                        <span className="font-medium text-foreground">
                          {row.formula}
                        </span>
                      </div>
                    </td>
                    <td className="border border-muted-foreground/20 p-4 text-muted-foreground">
                      {row.duration}
                    </td>
                    <td className="border border-muted-foreground/20 p-4 font-semibold text-foreground">
                      {row.price}
                    </td>
                    <td className="border border-muted-foreground/20 p-4 text-accent font-medium">
                      {row.savings}
                    </td>
                    <td className="border border-muted-foreground/20 p-4 text-muted-foreground">
                      {row.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Trouvez les réponses aux questions les plus courantes
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Q : {faq.question}
                </h3>
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">👉</span>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Inscris-toi gratuitement
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Si tu souhaites d'abord tester notre plateforme avant de t'abonner,
            aucun problème ! Tu peux t'inscrire gratuitement et tester notre
            plateforme grâce à notre offre de découverte ! Clique sur le bouton
            ci-dessous pour découvrir.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg"
          >
            Découvrir gratuitement
          </Button>
        </div>
      </section>
    </div>
  );
}
