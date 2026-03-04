import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const characters = [
  {
    name: "Алексей",
    role: "Главный герой",
    description:
      "Тридцатилетний архитектор, который строит дома для других, но никак не может найти место для себя. Упрямый, чуткий и вечно сомневающийся — он и есть сердце этой истории.",
    trait: "Искатель",
    color: "from-purple-500/20 to-purple-700/10",
    emoji: "🏛️",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Марина",
    role: "Антагонист",
    description:
      "Блестящий редактор с холодным умом и тёплым сердцем, которое она тщательно скрывает. Она знает всё о словах — и почти ничего о себе.",
    trait: "Хранитель тайн",
    color: "from-rose-500/20 to-rose-700/10",
    emoji: "📝",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Фёдор",
    role: "Наставник",
    description:
      "Пожилой книготорговец, у которого есть ответ на любой вопрос — кроме одного. Мудрость и ирония в равных пропорциях.",
    trait: "Мудрец",
    color: "from-amber-500/20 to-amber-700/10",
    emoji: "📚",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Соня",
    role: "Союзник",
    description:
      "Подруга Алексея с детства. Говорит только правду — даже когда это больно. Именно она произносит главную фразу всей книги.",
    trait: "Голос правды",
    color: "from-emerald-500/20 to-emerald-700/10",
    emoji: "🌿",
    image: "/placeholder-user.jpg",
  },
]

export function CharactersSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="characters" className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Персонажи
        </motion.p>

        <motion.h2
          className="text-3xl md:text-5xl font-serif text-foreground mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Познакомьтесь с героями
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {characters.map((char, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${char.color} border border-foreground/5`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 0.99 }}
              onClick={() => setActive(active === i ? null : i)}
              data-clickable
            >
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center text-3xl flex-shrink-0">
                      {char.emoji}
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-foreground">{char.name}</h3>
                      <p className="text-muted-foreground text-sm mt-0.5">{char.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-foreground/10 text-foreground px-3 py-1 rounded-full flex-shrink-0 mt-1">
                    {char.trait}
                  </span>
                </div>

                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      className="font-serif text-foreground/80 text-base leading-relaxed mt-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {char.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div
                  className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
                  animate={{ opacity: active === i ? 0.5 : 1 }}
                >
                  <span>{active === i ? "Скрыть" : "Узнать больше"}</span>
                  <motion.span
                    animate={{ rotate: active === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    ↓
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
