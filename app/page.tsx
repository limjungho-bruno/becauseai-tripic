"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ImageIcon, PenTool, ChevronDown } from "lucide-react"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [showScrollIndicator2, setShowScrollIndicator2] = useState(false)
  const [showScrollIndicator3, setShowScrollIndicator3] = useState(false)

  // Handle scroll snap to sections
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollElement = e.target as HTMLElement
      if (scrollElement.scrollTop > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }

      if (
        scrollElement.scrollTop > scrollElement.clientHeight * 0.8 &&
        scrollElement.scrollTop < scrollElement.clientHeight * 1.8
      ) {
        setShowScrollIndicator2(true)
      } else {
        setShowScrollIndicator2(false)
      }

      if (
        scrollElement.scrollTop > scrollElement.clientHeight * 1.8 &&
        scrollElement.scrollTop < scrollElement.clientHeight * 2.8
      ) {
        setShowScrollIndicator3(true)
      } else {
        setShowScrollIndicator3(false)
      }

      if (!isScrolling) {
        const scrollPosition = scrollElement.scrollTop
        const sectionHeight = scrollElement.clientHeight
        const newSection = Math.round(scrollPosition / sectionHeight)
        setActiveSection(newSection)
      }
    }

    const mainContainer = document.getElementById("scroll-container")
    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll)
      return () => mainContainer.removeEventListener("scroll", handleScroll)
    }
  }, [isScrolling])

  // Scroll to section function
  const scrollToSection = (index: number) => {
    setIsScrolling(true)
    const container = document.getElementById("scroll-container")
    if (container) {
      const sectionHeight = container.clientHeight
      container.scrollTo({
        top: sectionHeight * index,
        behavior: "smooth",
      })
    }
    setTimeout(() => setIsScrolling(false), 1000)
  }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/tripic-logo.png" alt="TRIPIC" className="h-16 w-auto" />
          </Link>

          {/* Navigation dots */}
          <div className="hidden md:flex items-center gap-2">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSection === index ? "bg-blue-500 w-6" : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main scroll container */}
      <div id="scroll-container" className="scroll-snap-container h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* Section 1: Hero with background image */}
        <section className="scroll-snap-item w-full h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-slate-950">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/travel-background.png"
              alt="Travel items 3D background"
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/95 dark:via-slate-950/40 dark:to-slate-950/95"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto px-4 pt-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">여행</h1>
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300">누구의 취향에 맞추고 있나요?</p>
          </div>

          {showScrollIndicator && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer"
              onClick={() => scrollToSection(1)}
            >
              <ChevronDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
          )}
        </section>

        {/* Section 2: Benefit - "Rest" with landmarks background */}
        <section className="scroll-snap-item w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
          <div className="absolute inset-0 -top-[60px]">
            <img
              src="/landmarks-bg.png"
              alt="Landmarks 3D background"
              className="w-full h-full object-cover object-top opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/50 to-blue-100/95 dark:via-slate-950/50 dark:to-slate-950/95"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              남들이 추천한 명소 대신,
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              AI가 분석한 당신의 취향을 기반으로 선별된 여행을 경험하세요
            </p>
          </div>

          {showScrollIndicator2 && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer"
              onClick={() => scrollToSection(2)}
            >
              <ChevronDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
          )}
        </section>

        {/* Section 3: Benefit - "Personalization" */}
        <section className="scroll-snap-item w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 -top-[60px]">
            <img
              src="/travel-items-bg.png"
              alt="Travel items 3D background"
              className="w-full h-full object-cover object-top opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/50 to-slate-100/95 dark:via-slate-900/50 dark:to-slate-900/95"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              진짜 내가 좋아할 곳으로.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              사진, 텍스트 중 원하는 방식으로 당신의 여행 스타일을 알려주세요
            </p>
          </div>

          {showScrollIndicator3 && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer"
              onClick={() => scrollToSection(3)}
            >
              <ChevronDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
            </div>
          )}
        </section>

        {/* Section 4: CTA Cards */}
        <section className="scroll-snap-item w-full h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">시작하기</h2>
              <p className="text-slate-600 dark:text-slate-400">어떤 방식으로 당신의 취향을 알려주시겠어요?</p>
            </div>

            {/* CTA Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Photo Input */}
              <Link href="/image">
                <button className="w-full group relative p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg cursor-pointer overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">사진으로 시작하기</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      마음에 드는 사진을 선택해서 당신의 스타일을 표현하세요
                    </p>
                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      시작하기
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </Link>

              {/* Card 2: Text Input */}
              <Link href="/text">
                <button className="w-full group relative p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg cursor-pointer overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="relative z-10 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                        <PenTool className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">텍스트로 시작하기</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                      당신의 여행 취향을 글로 자유롭게 표현하세요
                    </p>
                    <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      시작하기
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
