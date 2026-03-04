import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const PAW_NORMAL = (
  <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Пальчики */}
    <ellipse cx="20" cy="14" rx="7" ry="9" fill="currentColor" />
    <ellipse cx="36" cy="10" rx="7" ry="9" fill="currentColor" />
    <ellipse cx="51" cy="16" rx="6" ry="8" fill="currentColor" />
    <ellipse cx="10" cy="26" rx="5" ry="7" fill="currentColor" />
    {/* Подушечка */}
    <ellipse cx="32" cy="42" rx="18" ry="16" fill="currentColor" />
    {/* Маленькие подушечки */}
    <ellipse cx="20" cy="36" rx="6" ry="5" fill="white" opacity="0.25" />
    <ellipse cx="36" cy="34" rx="6" ry="5" fill="white" opacity="0.25" />
    <ellipse cx="44" cy="42" rx="5" ry="5" fill="white" opacity="0.25" />
    <ellipse cx="24" cy="48" rx="5" ry="5" fill="white" opacity="0.25" />
  </svg>
)

const PAW_HOVER = (
  <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="20" cy="14" rx="7" ry="9" fill="currentColor" />
    <ellipse cx="36" cy="10" rx="7" ry="9" fill="currentColor" />
    <ellipse cx="51" cy="16" rx="6" ry="8" fill="currentColor" />
    <ellipse cx="10" cy="26" rx="5" ry="7" fill="currentColor" />
    <ellipse cx="32" cy="42" rx="18" ry="16" fill="currentColor" />
    <ellipse cx="20" cy="36" rx="6" ry="5" fill="white" opacity="0.25" />
    <ellipse cx="36" cy="34" rx="6" ry="5" fill="white" opacity="0.25" />
    <ellipse cx="44" cy="42" rx="5" ry="5" fill="white" opacity="0.25" />
    <ellipse cx="24" cy="48" rx="5" ry="5" fill="white" opacity="0.25" />
  </svg>
)

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPressing, setIsPressing] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsPressing(true)
    const handleMouseUp = () => setIsPressing(false)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    const clickables = document.querySelectorAll("a, button, [data-clickable]")
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart)
      el.addEventListener("mouseleave", handleHoverEnd)
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart)
        el.removeEventListener("mouseleave", handleHoverEnd)
      })
    }
  }, [])

  const size = isHovering ? 44 : 32
  const offset = size / 2

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block text-foreground"
      animate={{
        x: position.x - offset,
        y: position.y - offset,
        opacity: isVisible ? 1 : 0,
        rotate: isPressing ? 20 : isHovering ? -10 : 0,
        scale: isPressing ? 0.85 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <motion.div
        animate={{ scale: isHovering ? 1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {isHovering ? PAW_HOVER : PAW_NORMAL}
      </motion.div>
    </motion.div>
  )
}
