import { Button } from "@/components/ui/button"

export function FinalCtaSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Header with pointing hand emoji */}
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              <span className="text-4xl lg:text-5xl mr-3">👉</span>
              Prêt à réussir ton BTS ?
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground text-balance">
              Ne laisse pas le hasard décider de ton avenir.
            </p>
          </div>

          {/* Main CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium px-12 py-4 text-xl rounded-full"
            >
              Découvrir gratuitement
            </Button>
          </div>

          {/* Lightning bolt with additional text */}
          <div className="pt-6">
            <p className="text-lg lg:text-xl text-foreground font-medium text-balance">
              <span className="text-2xl mr-2">⚡</span>
              Accède à ta première fiche, ton premier quiz et un sujet corrigé dès maintenant !
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
