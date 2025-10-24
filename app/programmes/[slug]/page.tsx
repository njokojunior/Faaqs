import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Image from "next/image";

// Program data - in a real app, this would come from a database or API
const programsData = {
  "sciences-infirmieres": {
    id: "si",
    title: "BTS en Sciences infirmières (SI)",
    description:
      "Le BTS Sciences Infirmières (SI) forme les futurs professionnels de la santé capables d'assurer des soins de qualité, de la prévention à l'accompagnement thérapeutique.",
    icon: "🩺",
    heroImage: "/images/nurse-hero.jpg",
    examSubjects: [
      "UE fondamentales (Anatomie, Physiologie, Biochimie, Microbiologie)",
      "UE cliniques (Soins infirmiers, Pédiatrie, Gynécologie-Obstétrique, Urgences)",
      "UE transversales (Santé publique, Éthique, Communication professionnelle, Informatique)",
    ],
    examOrganization: [
      "Épreuves écrites → matières scientifiques et cliniques",
      "Épreuves pratiques → mise en situation de soins",
      "Mémoire ou rapport de stage",
    ],
    resources: {
      sheets: 200,
      quizzes: 250,
      pastPapers: 100,
    },
    features: [
      {
        title: "Fiches de révision synthétiques",
        description:
          'résumés clairs par UE (ex. : "Les bases de la physiologie cardiaque").',
      },
      {
        title: "Quiz interactifs",
        description:
          "auto-évaluation avec correction immédiate (ex. : 15 QCM sur Microbiologie).",
      },
      {
        title: "Annales corrigées et commentées",
        description:
          "sujets des sessions passées avec explications (ex. : sujet 2021 de EPS).",
      },
      {
        title: "Astuces méthodologiques",
        description:
          "conseils pour réussir chaque type d'épreuve (ex. : \"Comment gérer le temps lors d'un cas clinique\").",
      },
      {
        title: "Espace communautaire",
        description:
          "poser tes questions, partager des sujets, obtenir des réponses.",
      },
    ],
  },
  "comptabilite-gestion": {
    id: "cge",
    title: "BTS en Comptabilité et Gestion des Entreprises (CGE)",
    description:
      "Le BTS Comptabilité et Gestion des Entreprises (CGE) forme les futurs professionnels capables de gérer la comptabilité, les finances et l'administration des entreprises.",
    icon: "🧮",
    heroImage: "/images/accounting-hero.jpg",
    examSubjects: [
      "UE fondamentales (Comptabilité générale, Comptabilité analytique, Mathématiques financières)",
      "UE spécialisées (Fiscalité, Droit des affaires, Gestion financière)",
      "UE transversales (Informatique de gestion, Communication, Anglais des affaires)",
    ],
    examOrganization: [
      "Épreuves écrites → matières comptables et financières",
      "Épreuves pratiques → études de cas d'entreprise",
      "Projet professionnel ou stage en entreprise",
    ],
    resources: {
      sheets: 180,
      quizzes: 220,
      pastPapers: 90,
    },
    features: [
      {
        title: "Fiches de révision synthétiques",
        description:
          'résumés clairs par matière (ex. : "Les principes de la comptabilité analytique").',
      },
      {
        title: "Quiz interactifs",
        description:
          "auto-évaluation avec correction immédiate (ex. : 20 QCM sur la fiscalité).",
      },
      {
        title: "Annales corrigées et commentées",
        description:
          "sujets des sessions passées avec explications détaillées.",
      },
      {
        title: "Astuces méthodologiques",
        description: "conseils pour réussir chaque type d'épreuve comptable.",
      },
      {
        title: "Espace communautaire",
        description: "échanger avec d'autres étudiants en CGE.",
      },
    ],
  },
};

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = programsData[params.slug as keyof typeof programsData];

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image and CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <Image
                  src={program.heroImage || "/placeholder.svg"}
                  alt={`${program.title} - Étudiant en formation`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Rating and compliance badge */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-foreground/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🇨🇲</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Conforme au programme officiel
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                  {program.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {program.title}
                </h2>
              </div>

              <Button size="lg" className="mb-8 w-full md:w-auto">
                Commencer ma préparation
              </Button>

              <div className="space-y-4">
                <p className="text-lg font-medium text-foreground mb-4">
                  Toutes les ressources essentielles pour réussir ton BTS en{" "}
                  {program.id.toUpperCase()} :
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      + {program.resources.sheets} fiches de révision
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      + {program.resources.quizzes} quiz interactifs
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      + {program.resources.pastPapers} annales corrigées
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-foreground">
                      Conseils et astuces méthodologie
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Header Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
              {program.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {program.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {program.description}
              </p>
            </div>
          </div>

          {/* Exam Subjects */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Les épreuves à l'examen couvrent :
            </h2>
            <div className="space-y-3">
              {program.examSubjects.map((subject, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Organization */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full border-2 border-foreground flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Organisation de l'examen :
              </h2>
            </div>
            <div className="space-y-2 ml-8">
              {program.examOrganization.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Content Details */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              {program.icon}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Dans notre programme de révision pour le {program.title}, vous
                retrouverez des cours et notions synthétisées pour réviser les
                examens officiels et obtenir votre Mention
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {program.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    {feature.title}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    – {feature.description}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg">Commencer ma préparation</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static params for known programs
export async function generateStaticParams() {
  return [
    { slug: "sciences-infirmieres" },
    { slug: "comptabilite-gestion" },
    // Add more program slugs as needed
  ];
}
