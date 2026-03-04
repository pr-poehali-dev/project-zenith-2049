import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const reviews = [
  {
    text: "«Эта книга перевернула мой взгляд на мир. Читала за один вечер, не могла оторваться.»",
    author: "Анна М.",
    role: "читательница",
    image: "/placeholder-user.jpg",
  },
  {
    text: "«Редкая история, которая одновременно заставляет думать и чувствовать. Рекомендую всем.»",
    author: "Дмитрий К.",
    role: "книжный блогер",
    image: "/placeholder-user.jpg",
  },
  {
    text: "«Язык автора — это отдельное произведение искусства. Каждая фраза точная и живая.»",
    author: "Ольга В.",
    role: "литературный критик",
    image: "/placeholder-user.jpg",
  },
]

const showcaseImages = [
  "/modern-architecture-building-exterior-minimal.jpg",
  "/fashion-model-editorial-portrait-dramatic-lighting.jpg",
  "/interior-design-minimalist-living-room-natural-lig.jpg",
]

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])

  const yValues = [y1, y2, y3]

  return (
    <section ref={containerRef} className="bg-background px-6 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Отзывы читателей
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className="relative h-auto md:h-[500px] rounded-xl overflow-hidden group bg-secondary p-8 flex flex-col justify-between"
              style={{ y: yValues[i] }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed">{review.text}</p>
              <div className="flex items-center gap-3 mt-8">
                <img
                  src={review.image}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover bg-foreground/10"
                />
                <div>
                  <p className="font-medium text-foreground text-sm">{review.author}</p>
                  <p className="text-muted-foreground text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mt-24 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Иллюстрации
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {showcaseImages.map((src, i) => (
            <motion.div
              key={i}
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden group"
              style={{ y: yValues[i] }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-clickable
            >
              <motion.img
                src={src}
                alt={`Иллюстрация ${i + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
