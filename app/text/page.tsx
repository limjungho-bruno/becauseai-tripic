"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTripTaste } from "../context/TripTasteContext"
import { LoadingModal } from "@/components/loading-modal"

export default function TextPage() {
  const router = useRouter()
  const { preferences, updatePreferences } = useTripTaste()

  const [freeText, setFreeText] = useState(preferences.textInput)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    const analysisData = {
      type: "free",
      data: { text: freeText },
    }

    updatePreferences({
      textInput: freeText,
      textInputMode: "free",
    })

    setIsAnalyzing(true)

    const startTime = Date.now()
    const minDisplayTime = 7500

    try {
      console.log("analysisData : ", analysisData)
      const SUFFIX_PROMPT = " 이 정보와 가장 유사한 여행 상품 5개를 리스트로 답변. 리스트 이외의 다른 문장형 답변은 불필요."
      const response = await fetch("https://rq7xwcscz0.execute-api.ap-northeast-2.amazonaws.com/Prod/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'input':analysisData.data.text+SUFFIX_PROMPT}),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const result = await response.json()

      const pkg_list = result.output.split('\n')
      updatePreferences({
        tags: [],
        packages: [
              {
                id: 1,
                rank: 1,
                title: pkg_list[0],
                description: "description 1st",
                price: "price 1st",
                tags: ["#자연", "#휴양", "#한적함"],
              },
              {
                id: 2,
                rank: 2,
                title: pkg_list[1],
                description: "description 2nd",
                price: "price 2nd",
                tags: ["#힐링", "#온천", "#해변"],
              },
              {
                id: 3,
                rank: 3,
                title: pkg_list[2],
                description: "description 3rd",
                price: "price 3rd",
                tags: ["#자연", "#액티비티", "#산림욕"],
              },
              {
                id: 4,
                rank: 4,
                title: pkg_list[3],
                description: "description 4th",
                price: "price 4th",
                tags: ["#문화", "#카페", "#해안"],
              },
              {
                id: 5,
                rank: 5,
                title: pkg_list[4],
                description: "description 5th",
                price: "price 5th",
                tags: ["#하이킹", "#산", "#자연"],
              }
            ], //result.output,
        text_output : result.output
      })
      console.log(result)
      router.push("/results")
    } catch (error) {
      console.error("Analysis error:", error)
      // Fallback: still navigate to results with mock data
      router.push("/results")
    }
  }
  const isFreeTextValid = freeText.trim().length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600"></div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">Tripic</span>
          </Link>
          <div className="w-12"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {/* Subtitle */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            당신의 취향을 알려주세요.
          </h2>
          <p className="text-slate-600 dark:text-slate-400">자유롭게 표현해주세요</p>
        </div>

        {/* Tab content */}
        <div className="space-y-4">
          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value.slice(0, 500))}
            placeholder="예: 사람 많은 곳보다 한적한 자연, 카페 투어 좋아하고 너무 덥지 않은 곳 선호..."
            className="w-full h-64 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">입력 완료하면 분석하기를 눌러주세요</span>
            <span
              className={`font-semibold ${
                freeText.length >= 400
                  ? "text-orange-600"
                  : freeText.length >= 300
                    ? "text-blue-600"
                    : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {freeText.length}/500
            </span>
          </div>
        </div>
      </main>

      {/* Bottom fixed bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">{freeText.length}자 입력됨</div>
          <button
            onClick={handleAnalyze}
            disabled={!isFreeTextValid}
            className={`px-8 py-2 rounded-lg font-semibold transition-all ${
              !isFreeTextValid
                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            분석하기
          </button>
        </div>
      </div>

      {/* Loading Modal */}
      {isAnalyzing && <LoadingModal />}
    </div>
  )
}
