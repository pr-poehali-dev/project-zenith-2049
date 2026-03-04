import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (playing) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [playing])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-2">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        data-clickable
      >
        {playing ? (
          <span className="flex gap-1">
            <span className="w-1.5 h-5 bg-primary-foreground rounded-full" />
            <span className="w-1.5 h-5 bg-primary-foreground rounded-full" />
          </span>
        ) : (
          <span
            className="ml-1 border-l-[18px] border-l-primary-foreground border-y-[11px] border-y-transparent"
            style={{ display: "inline-block" }}
          />
        )}
      </button>
      <div className="w-full max-w-[160px] space-y-2">
        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.floor(progress * 0.6)}:00</span>
          <span>60:00</span>
        </div>
      </div>
    </div>
  )
}

function ExcerptCard() {
  const [page, setPage] = useState(0)
  const excerpts = [
    "«Это было утро, когда всё изменилось...»",
    "«Она смотрела в окно и видела не улицу — она видела весь мир.»",
    "«Слова — это мосты между душами.»",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % excerpts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-2">
      <motion.p
        key={page}
        className="font-serif text-lg text-foreground text-center leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {excerpts[page]}
      </motion.p>
      <div className="flex gap-1.5 mt-2">
        {excerpts.map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === page ? "bg-primary" : "bg-foreground/20"}`}
          />
        ))}
      </div>
    </div>
  )
}

function FilmPreview() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-4 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-clickable
    >
      <motion.div
        className="w-20 h-20 rounded-2xl bg-foreground/10 flex items-center justify-center relative overflow-hidden"
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-primary/20"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="text-4xl">🎬</span>
      </motion.div>
      <p className="text-sm text-muted-foreground text-center">
        {hovered ? "Смотреть мультфильм →" : "Мультфильм по книге"}
      </p>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="excerpt" className="bg-background px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Форматы
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-secondary rounded-xl p-8 min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            data-clickable
          >
            <div className="flex-1">
              <ExcerptCard />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">Фрагменты книги</h3>
              <p className="text-muted-foreground text-sm mt-1">Погрузитесь в атмосферу с первых строк.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-secondary rounded-xl p-8 min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <AudioPlayer />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">Аудиокнига</h3>
              <p className="text-muted-foreground text-sm mt-1">Слушайте историю в любом месте и в любое время.</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-secondary rounded-xl p-8 min-h-[280px] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <FilmPreview />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-xl text-foreground">Мультфильм</h3>
              <p className="text-muted-foreground text-sm mt-1">История оживает в анимации для всей семьи.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
