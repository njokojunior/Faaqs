"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "Est-ce que c'est gratuit ?",
    answer:
      "Oui, tu peux tester gratuitement 1 fiche, 1 quiz et 1 sujet corrigé. Pour tout le reste, il suffit de souscrire à un pass.",
  },
  {
    question: "Combien ça coûte?",
    answer:
      "Nos programmes sont accessibles à partir de 1999 F CFA par mois. Très accessible, ce tarif permet d'accéder à tous nos cours et fiches de révision de ton BTS. Tu peux choisir ton mode abonnement selon tes besoins !",
  },
  {
    question: "Comment je paie ?",
    answer: "Par Mobile Money (Orange Money, MTN MoMo, Express Union) ou carte bancaire.",
  },
  {
    question: "Est-ce que c'est sûr que je vais réussir ?",
    answer:
      "Nous ne pouvons pas passer l'examen à ta place 😅, mais nous mettons entre tes mains tous les outils nécessaires pour réussir avec brio.",
  },
  {
    question: "Est-ce que je peux réviser sur mon téléphone ?",
    answer: "Oui, FAAQS est conçu pour être utilisé partout, à tout moment, sur ton smartphone ou ton PC.",
  },
]

export function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance mb-4">Questions fréquentes</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Trouve les réponses aux questions les plus posées sur FAAQS
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-background rounded-lg border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  aria-expanded={openItems.includes(index)}
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{item.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openItems.includes(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-6 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-primary text-lg flex-shrink-0 mt-0.5">👉</span>
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 p-8 bg-background rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-3">Tu as d'autres questions ?</h3>
            <p className="text-muted-foreground mb-6">Notre équipe est là pour t'aider à réussir ton BTS</p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
