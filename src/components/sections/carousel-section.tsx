import { motion } from "framer-motion"

const quotes = [
  "«Эта книга — как глоток свежего воздуха»",
  "«Читается на одном дыхании»",
  "«История, которая остаётся с тобой»",
  "«Шедевр современной прозы»",
  "«Обязательно к прочтению»",
  "«Не мог оторваться до последней страницы»",
]

const marketplaces = [
  { name: "Литрес", emoji: "📚" },
  { name: "Ozon", emoji: "🟦" },
  { name: "Wildberries", emoji: "🟣" },
  { name: "Amazon", emoji: "📦" },
  { name: "Google Books", emoji: "📖" },
  { name: "Apple Books", emoji: "🍎" },
]

export function CarouselSection() {
  const items = [...quotes, ...quotes]

  return (
    <section id="marketplaces" className="bg-primary py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-serif text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Читатели уже влюблены.
        </motion.h2>
        <motion.p
          className="text-primary-foreground/70 mt-3 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Доступна на всех крупных платформах
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {marketplaces.map((m, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-5 py-2.5 rounded-full transition-colors text-sm font-medium"
              data-clickable
            >
              <span>{m.emoji}</span>
              {m.name}
            </a>
          ))}
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((quote, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-primary-foreground/10 rounded-xl px-8 py-6 max-w-[360px]"
            >
              <p className="font-serif text-primary-foreground text-lg leading-relaxed">{quote}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
