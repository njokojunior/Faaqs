import { Clock, AlertTriangle, Award, Smartphone } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Gagner du temps :",
    description: "révise avec des contenus clairs et directement alignés sur le programme.",
  },
  {
    icon: AlertTriangle,
    title: "Éviter les pièges :",
    description: "apprends à repérer les erreurs les plus fréquentes.",
  },
  {
    icon: Award,
    title: "Réussir avec confiance :",
    description: "entraîne-toi avec des sujets réels, corrigés et expliqués.",
  },
  {
    icon: Smartphone,
    title: "Accéder partout, tout le temps :",
    description: "sur ton smartphone ou ton ordinateur, même avec peu de connexion.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-secondary-foreground rounded-full"></div>
            </div>
            <div className="w-4 h-4 bg-secondary/70 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-secondary-foreground rounded-full"></div>
            </div>
            <div className="w-3 h-3 bg-secondary/50 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-secondary-foreground rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">Les bénéfices pour toi</h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center space-y-4">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
