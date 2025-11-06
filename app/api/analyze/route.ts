import { type NextRequest, NextResponse } from "next/server"

// This is a mock implementation - connect to your backend service for real analysis

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Mock analysis results
    let tags: string[] = []
    let packages: any[] = []

    if (type === "images") {
      // Mock image-based analysis
      tags = ["#자연", "#힐링", "#온천", "#하이킹", "#한적함"]
      packages = generateMockPackages(5)
    } else if (type === "free") {
      // Mock text-based analysis (free input)
      tags = extractTagsFromText(data.text)
      packages = generateMockPackages(5)
    } else if (type === "guide") {
      // Mock form-based analysis
      tags = generateTagsFromForm(data)
      packages = generateMockPackages(5)
    }

    return NextResponse.json(
      {
        success: true,
        tags,
        packages,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Analysis failed",
      },
      { status: 500 },
    )
  }
}

// Mock helper functions
function extractTagsFromText(text: string): string[] {
  const keywords = ["자연", "휴양", "카페", "하이킹", "온천", "힐링", "한적"]
  const tags = keywords.filter((keyword) => text.includes(keyword)).map((keyword) => `#${keyword}`)

  // Add some default tags if none extracted
  return tags.length > 0 ? tags : ["#자연", "#여행", "#추천"]
}

function generateTagsFromForm(data: any): string[] {
  const tags: string[] = []

  if (data.travelTypes?.includes("relax")) tags.push("#휴양")
  if (data.travelTypes?.includes("nature")) tags.push("#자연")
  if (data.travelTypes?.includes("food")) tags.push("#미식")
  if (data.travelTypes?.includes("culture")) tags.push("#문화")
  if (data.seasons?.includes("spring")) tags.push("#봄여행")
  if (data.companion === "couple") tags.push("#연인여행")

  return tags.length > 0 ? tags : ["#여행", "#추천"]
}

function generateMockPackages(count: number) {
  const mockTitles = [
    "제주 자연 휴양 패키지",
    "포항 해변 힐링 여행",
    "강원도 산림욕 액티비티",
    "남해 예술마을 투어",
    "지리산 하이킹 패키지",
    "경주 문화유산 탐방",
    "남대문 야경 도시여행",
    "전주 한옥마을 미식투어",
  ]

  const mockDescriptions = [
    "한적한 해변과 자연 경관을 즐기는 3박 4일",
    "푸른 바다와 신선한 공기 속 온천 투어",
    "산림욕과 생태 탐방을 포함한 2박 3일",
    "해안 드라이브와 지역 카페 투어",
    "초보자 친화적 산책로와 자연 명소",
    "유네스코 유산과 문화 체험",
    "야경 감상과 로컬 맛집 투어",
    "전통과 현대가 만나는 음식 여행",
  ]

  const prices = [
    "899,000원",
    "749,000원",
    "599,000원",
    "679,000원",
    "549,000원",
    "799,000원",
    "849,000원",
    "729,000원",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    title: mockTitles[i % mockTitles.length],
    description: mockDescriptions[i % mockDescriptions.length],
    price: prices[i % prices.length],
    tags: ["#여행", "#추천", "#특가"],
  }))
}
