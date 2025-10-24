import { Button } from "@/components/ui/button"
import { CheckCircle, Lightbulb } from "lucide-react"

export function SolutionSection() {
  const solutionFeatures = [
    {
      title: "Fiches de révision",
      description: "synthétiques et faciles à retenir",
    },
    {
      title: "Quiz d'entraînement",
      description: "pour tester ton niveau à chaque étape",
    },
    {
      title: "Annales corrigées et commentées",
      description: "par des enseignants expérimentés",
    },
    {
      title: "Astuces et méthodologies",
      description: "pour aborder chaque épreuve ou pour mieux apprendre",
    },
    {
      title: "Une communauté d'entraide",
      description: "pour poser tes questions ou aider tes camarades",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Lightbulb className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">NOTRE SOLUTION</h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-foreground text-balance leading-relaxed mb-12">
            Avec FAAQS, tu accèdes à <strong>tout ce dont tu as besoin pour réussir ton examen avec mention</strong> :
          </p>

          {/* Solution Features */}
          <div className="space-y-6 mb-12">
            {solutionFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 text-left max-w-3xl mx-auto">
                <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div className="text-lg lg:text-xl text-foreground">
                  <strong>{feature.title}</strong> {feature.description}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
    </section>
  )
}
