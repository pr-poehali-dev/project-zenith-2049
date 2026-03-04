import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

const chapters = [
  {
    title: "Глава 1. Начало пути",
    category: "Фрагмент",
    image: "/visual-storytelling-design-article.jpg",
    text: "Утро было серым, как старая фотография. Герой стоял у окна и думал о том, что всё могло быть иначе...",
  },
  {
    title: "Глава 4. Перекрёсток",
    category: "Фрагмент",
    image: "/writer-portfolio-website-elegant.jpg",
    text: "Выбор никогда не бывает простым. Особенно когда на весах — всё, что дорого твоему сердцу...",
  },
  {
    title: "Глава 9. Возвращение",
    category: "Фрагмент",
    image: "/personal-branding-digital-marketing.jpg",
    text: "Дом — это не место. Это люди, которые ждут тебя. И эта мысль согревала его в самые тёмные минуты...",
  },
  {
    title: "Эпилог. Спустя годы",
    category: "Фрагмент",
    image: "/typography-trends-modern-fonts.jpg",
    text: "Жизнь расставила всё по местам. Не так, как он мечтал. Лучше — потому что правда всегда лучше мечты...",
  },
]

export function InsightsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [expanded, setExpanded] = useState<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section className="bg-background px-6 py-24" onMouseMove={handleMouseMove}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Фрагменты книги
        </motion.p>

        <div className="divide-y divide-border">
          {chapters.map((chapter, i) => (
            <motion.div
              key={i}
              className="group py-6 relative cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setExpanded(expanded === i ? null : i)}
              data-clickable
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{chapter.category}</span>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1 group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: expanded === i ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-serif text-lg text-foreground/70 leading-relaxed mt-4 pb-2 italic">
                      {chapter.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="fixed pointer-events-none z-50 w-[200px] md:w-[300px] rounded-lg overflow-hidden shadow-2xl hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePosition.x + 20,
                y: mousePosition.y - 100,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={chapters[hoveredIndex].image || "/placeholder.svg"}
                alt={chapters[hoveredIndex].title}
                className="w-full h-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
