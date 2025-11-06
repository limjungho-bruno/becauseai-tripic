"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useTripTaste } from "../context/TripTasteContext"

// Sample recommended packages (fallback)
const SAMPLE_PACKAGES = [
  {
    id: 1,
    rank: 1,
    title: "제주 자연 휴양 패키지",
    description: "한적한 해변과 자연 경관을 즐기는 3박 4일",
    price: "899,000원",
    tags: ["#자연", "#휴양", "#한적함"],
  },
  {
    id: 2,
    rank: 2,
    title: "포항 해변 힐링 여행",
    description: "푸른 바다와 신선한 공기 속 온천 투어",
    price: "749,000원",
    tags: ["#힐링", "#온천", "#해변"],
  },
  {
    id: 3,
    rank: 3,
    title: "강원도 산림욕 액티비티",
    description: "산림욕과 생태 탐방을 포함한 2박 3일",
    price: "599,000원",
    tags: ["#자연", "#액티비티", "#산림욕"],
  },
  {
    id: 4,
    rank: 4,
    title: "남해 예술마을 투어",
    description: "해안 드라이브와 지역 카페 투어",
    price: "679,000원",
    tags: ["#문화", "#카페", "#해안"],
  },
  {
    id: 5,
    rank: 5,
    title: "지리산 하이킹 패키지",
    description: "초보자 친화적 산책로와 자연 명소",
    price: "549,000원",
    tags: ["#하이킹", "#산", "#자연"],
  },
]

export default function ResultsPage() {
  const { preferences } = useTripTaste()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoSlide, setAutoSlide] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [packages, setPackages] = useState(preferences.packages.length > 0 ? preferences.packages : SAMPLE_PACKAGES)
  const [tags, setTags] = useState(
    preferences.tags.length > 0 ? preferences.tags : ["#자연", "#힐링", "#온천", "#하이킹", "#한적함", "#카페투어"],
  )

  const getRankDisplay = (rank: number) => {
    return rank.toString()
  }

const getRankColor = (rank: number) => {
    if (rank === 1) return "from-amber-200 to-amber-400"
    if (rank === 2) return "from-gray-300 to-gray-500"
    return "from-yellow-400 to-yellow-600"
  }

  useEffect(() => {
    if (!autoSlide || isHovering) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % packages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoSlide, isHovering, packages.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? packages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % packages.length)
  }

  const getPreviousIndex = () => (currentIndex === 0 ? packages.length - 1 : currentIndex - 1)
  const getNextIndex = () => (currentIndex + 1) % packages.length

  const previousPackage = packages[getPreviousIndex()]
  const currentPackage = packages[currentIndex]
  const nextPackage = packages[getNextIndex()]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/tripic-logo.png" alt="TRIPIC" className="h-16 w-auto" />
          </Link>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Summary section - 20% */}
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-slate-950 py-8 px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Carousel section - 70% */}
        <section
          className="flex-1 flex items-center justify-center py-12 px-4"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="max-w-6xl w-full">
            <div className="relative">
              <div className="flex gap-6 items-center justify-center">
                {/* Left side card - small */}
                <div className="w-48 flex-shrink-0">
                  <div className="relative h-72 rounded-3xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-lg opacity-50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${getRankColor(previousPackage.rank)} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-xs">{getRankDisplay(previousPackage.rank)}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                          {previousPackage.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-tight line-clamp-2">
                          {previousPackage.description}
                        </p>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{previousPackage.price}</div>
                    </div>
                  </div>
                </div>

                {/* Center card - large (main) */}
                <div className="w-96 flex-shrink-0">
                  <div className="relative h-96 rounded-3xl overflow-hidden ring-2 ring-blue-400 shadow-2xl transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700"></div>

                    {/* Card content */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${getRankColor(currentPackage.rank)} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <span className="text-white font-bold text-lg">{getRankDisplay(currentPackage.rank)}</span>
                        </div>
                      </div>

                      {/* Title and description */}
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                          {currentPackage.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {currentPackage.description}
                        </p>
                      </div>

                      {/* Price and button */}
                      <div>
                        <div className="text-3xl font-bold text-blue-600 mb-4">{currentPackage.price}</div>
                        <button
                          onClick={() => {}}
                          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                        >
                          자세히 보기
                        </button>
                      </div>
                    </div>

                    {/* Neon glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-transparent to-blue-400/20 pointer-events-none"></div>
                  </div>
                </div>

                {/* Right side card - small */}
                <div className="w-48 flex-shrink-0">
                  <div className="relative h-72 rounded-3xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 shadow-lg opacity-50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${getRankColor(nextPackage.rank)} rounded-full flex items-center justify-center shadow-lg`}
                      >
                        <span className="text-white font-bold text-xs">{getRankDisplay(nextPackage.rank)}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">
                          {nextPackage.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-tight line-clamp-2">
                          {nextPackage.description}
                        </p>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{nextPackage.price}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left arrow */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 z-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                aria-label="Previous package"
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>

              {/* Right arrow */}
              <button
                onClick={handleNext}
                className="absolute right-0 z-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                aria-label="Next package"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center gap-2 mt-12">
              {packages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all ${
                    idx === currentIndex
                      ? "w-8 h-3 bg-blue-600 rounded-full"
                      : "w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  aria-label={`Go to package ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
