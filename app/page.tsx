import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Star, CheckCircle } from "lucide-react"
import Image from "next/image"
import { ProblemSection } from "@/components/problem-section"
import { BenefitsSection } from "@/components/benefits-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"
import { SolutionSection } from "@/components/solution-section"
import { FinalCtaSection } from "@/components/final-cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">Ne fais pas les plans</h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">
                Garantie ta <span className="text-primary">mention</span> au BTS avec FAAQS !
              </h2>
            </div>

            <p className="text-lg text-muted-foreground text-pretty leading-relaxed max-w-xl">
              La plateforme <strong>simple et efficace</strong> pour préparer ton BTS avec des fiches claires, des quiz
              interactifs et les corrigés d'anciens sujets. Diplômé(e) ou remboursé(e)
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-3 text-lg"
              >
                Découvrir gratuitement
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium px-8 py-3 text-lg"
              >
                Commencer Maintenant
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Conforme au programme officiel</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/students-studying.png"
                alt="Étudiants préparant leur BTS ensemble avec des ordinateurs portables"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <ProblemSection />

      <SolutionSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final Call-to-Action Section */}
      <FinalCtaSection />
    </div>
  )
}
