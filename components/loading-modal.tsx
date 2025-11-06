"use client"

import { useEffect, useState } from "react"
import { Plane } from "lucide-react"

const LOADING_MESSAGES = [
  "취향 분석 중...",
  "비행기 찾는 중... ✈️",
  "숙소 고르는 중... 🏠",
  "가이드 찾는 중... 🧑🏻",
  "준비 완료! 🤩",
]

export function LoadingModal() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-12 w-[400px] mx-4 animate-in fade-in zoom-in-95 duration-300">
        {/* Animated plane icon */}
        <div className="relative h-32 mb-8 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Plane className="w-16 h-16 text-blue-600 animate-[fly_3s_ease-in-out_infinite]" />
          </div>
          {/* Cloud decorations */}
          <div className="absolute top-4 left-8 w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full opacity-60 animate-[float_4s_ease-in-out_infinite]" />
          <div className="absolute bottom-8 right-12 w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded-full opacity-40 animate-[float_5s_ease-in-out_infinite_1s]" />
        </div>

        <div className="text-center min-h-[80px] flex items-center justify-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white animate-pulse">
            {LOADING_MESSAGES[currentMessageIndex]}
          </h3>
        </div>
      </div>

      <style jsx>{`
        @keyframes fly {
          0%,
          100% {
            transform: translateX(-20px) translateY(0px) rotate(-5deg);
          }
          50% {
            transform: translateX(20px) translateY(-10px) rotate(5deg);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}
