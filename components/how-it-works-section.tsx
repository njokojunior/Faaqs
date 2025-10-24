import { Button } from "@/components/ui/button"
import { Settings, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-foreground" />
            <Settings className="w-6 h-6 text-foreground" />
            <h2 className="text-3xl lg:text-4xl font-bold">Comment ça fonctionne?</h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">1</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Choisis ton BTS</h3>
                  <p className="text-muted-foreground">
                    Sélectionne ta spécialité
                    <br />
                    (CGE, SI, BAT, GL, ...)
                  </p>
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Je choisis mon BTS
                </Button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">2</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Souscris à ton pass</h3>
                  <p className="text-muted-foreground">
                    1 mois, 3 mois, 6 mois,
                    <br />1 an ou tout le cycle.
                  </p>
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Voir les tarifs
                </Button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">3</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Révise à ton rythme</h3>
                  <p className="text-muted-foreground">
                    Accède à tes fiches,
                    <br />
                    quiz et annales partout
                  </p>
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Commencer Maintenant
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Platform Preview */}
          <div className="relative">
            <div className="relative">
              {/* Navigation Arrows */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>

              {/* Platform Mockup */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                <Image
                  src="/images/platform-mockup.jpg"
                  alt="Interface de la plateforme FAAQS sur ordinateur et mobile"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Caption */}
              <div className="text-center mt-6">
                <p className="text-lg font-medium text-foreground">Notre plateforme en image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
