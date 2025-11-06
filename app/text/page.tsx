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

      const SUFFIX_PROMPT = `
        이 태그 정보와 가장 유사한 여행 상품 5개를 결정해야함. 각 여행 상품에 대해 각각 다음의 정보를 '|' 문자를 구분자로 하여 출력. 모든 결과 출력의 개행 문자는 반드시 '|' 로 출력해야 함.
        1. 여행 상품 이름
        2. 여행 상품 이름 5개에 대해 각각 가장 유사한 태그 4개. 태그 4개는 각각 '#태그1 #태그2 #태그3 #태그4' 형식으로 출력.
        3. 여행 상품의 예상되는 가격대. 자료가 충분하지 않을 경우 예상되는 금액을 추론하여 상상하여 작성.
        별다른 특징은 정리하지 않아야 함. 다른 문장형 답변은 불필요.
        종합된 태그를 바탕으로 가장 유사한 태그 6개를 정하여 유사한 순서대로 '#태그1 #태그2 #태그3 #태그4 #태그5 #태그6' 형식으로 가장 마지막에 출력.
        `

    const finalInput = analysisData.data.text + SUFFIX_PROMPT;

    console.log("Final input :", finalInput)

      const response = await fetch("https://rq7xwcscz0.execute-api.ap-northeast-2.amazonaws.com/Prod/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'input':finalInput}),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const result = await response.json()
      const info_list = result.output.split('|')

      console.log("Info List:", info_list);

      const pkg_list = result.output.split('\n')
      updatePreferences({
        tags: info_list[15] ? info_list[15].split(' ') : ["#여행추천", "#휴양", "#문화탐방", "#자연경관", "#액티비티", "#힐링"],
        packages: [
              {
                id: 1,
                rank: 1,
                title: info_list[0] ? info_list[0] : "title 1st",
                description: info_list[1] ? info_list[1] : "description 1st",
                price: info_list[2] ? info_list[2] : "price 1st",
                tags: info_list[1] ? info_list[1] : ["#여행", "#추천", "#휴양"],
              },
              {
                id: 2,
                rank: 2,
                title: info_list[3]? info_list[3] : "title 2nd",
                description: info_list[4] ? info_list[4] : "description 2nd",
                price: info_list[5] ? info_list[5] : "price 2nd",
                tags: info_list[4] ? info_list[4] : ["#여행", "#추천", "#휴양"],
              },
              {
                id: 3,
                rank: 3,
                title: info_list[6]? info_list[6] : "title 3rd",
                description: info_list[7] ? info_list[7] : "description 3rd",
                price: info_list[8] ? info_list[8] : "price 3rd",
                tags: info_list[7] ? info_list[7] : ["#여행", "#추천", "#휴양"],
              },
              {
                id: 4,
                rank: 4,
                title: info_list[9]? info_list[9] : "title 4th",
                description: info_list[10] ? info_list[10] : "description 4th",
                price: info_list[11] ? info_list[11] : "price 4th",
                tags: info_list[10] ? info_list[10] : ["#여행", "#추천", "#휴양"],
              },
              {
                id: 5,
                rank: 5,
                title: info_list[12]? info_list[12] : "title 5th",
                description: info_list[13] ? info_list[13] : "description 5th",
                price: info_list[14] ? info_list[14] : "price 5th",
                tags: info_list[13] ? info_list[13] : ["#여행", "#추천", "#휴양"],
              }
            ], 
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
            <img src="/tripic-logo.png" alt="TRIPIC" className="h-16 w-auto" />
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
