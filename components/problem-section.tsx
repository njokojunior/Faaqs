import { X } from "lucide-react"

export function ProblemSection() {
  const problems = [
    "ne savent pas quoi réviser en priorité,",
    "manquent de méthode pour aborder les épreuves,",
    "n'ont pas toujours accès aux anciens sujets corrigés et commentés.",
  ]

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              <span className="text-4xl mr-3">😟</span>
              LE PROBLÈME
            </h2>

            <p className="text-lg lg:text-xl text-muted-foreground text-balance leading-relaxed">
              Beaucoup d'étudiants <strong>échouent</strong> ou obtiennent des <strong>résultats moyens</strong> au
              BTS... <strong>non pas parce qu'ils ne travaillent pas</strong>, mais parce qu'ils :
            </p>
          </div>

          {/* Problem Points */}
          <div className="space-y-6 mb-16">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-4 text-left max-w-2xl mx-auto">
                <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <p className="text-lg text-foreground">{problem}</p>
              </div>
            ))}
          </div>

          {/* Result Section */}
          <div className="bg-background rounded-2xl p-8 shadow-lg border">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl">⚡</div>
                <h3 className="text-xl font-semibold">Résultat ?</h3>
              </div>
              <p className="text-lg text-muted-foreground text-balance">
                Stress, perte de confiance et mauvaises surprises le jour de l'examen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
