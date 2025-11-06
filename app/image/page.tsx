"use client"

import { useState, useEffect } from "react"
import { Shuffle, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTripTaste } from "../context/TripTasteContext"
import { LoadingModal } from "@/components/loading-modal"

const TRAVEL_IMAGES = [
  {
    id: 1,
    tags: "#괌 #사이판 #열대기후 #연중온화 #휴양특화",
    url: "/image/%23괌%20%23사이판%20%23열대기후%20%23연중온화%20%23휴양특화.jpg"
  },
  {
    id: 2,
    tags: "#괌 #열대기후 #해양성기후 #휴양특화",
    url: "/image/%23괌%20%23열대기후%20%23해양성기후%20%23휴양특화.jpg"
  },
  {
    id: 3,
    tags: "#호주 #건조기후 #사막기후 #일교차큼 (2)",
    url: "/image/%23호주%20%23건조기후%20%23사막기후%20%23일교차큼%20(2).jpg"
  },
  {
    id: 4,
    tags: "#호주 #건조기후 #사막기후 #일교차큼",
    url: "/image/%23호주%20%23건조기후%20%23사막기후%20%23일교차큼.jpg"
  },
  {
    id: 5,
    tags: "#케냐 #탄자니아 #열대몬순 #건기우기 #사파리",
    url: "/image/%23케냐%20%23탄자니아%20%23열대몬순%20%23건기우기%20%23사파리.jpg"
  },
  {
    id: 6,
    tags: "#호주 #온화한기후 #사계절쾌적 #따뜻한겨울 (2)",
    url: "/image/%23호주%20%23온화한기후%20%23사계절쾌적%20%23따뜻한겨울%20(2).jpg"
  },
  {
    id: 7,
    tags: "#호주 #온화한기후 #사계절쾌적 #따뜻한겨울",
    url: "/image/%23호주%20%23온화한기후%20%23사계절쾌적%20%23따뜻한겨울.jpg"
  },
  {
    id: 8,
    tags: "#미국 #하와이 #열대기후 #연중온화 #휴양특화",
    url: "/image/%23미국%20%23하와이%20%23열대기후%20%23연중온화%20%23휴양특화.jpg"
  },
  {
    id: 9,
    tags: "#미국 #캐나다 #대륙성기후 #사계절뚜렷",
    url: "/image/%23미국%20%23캐나다%20%23대륙성기후%20%23사계절뚜렷.jpg"
  },
  {
    id: 10,
    tags: "#네팔 #고산기후 #건조기후 #트레킹",
    url: "/image/%23네팔%20%23고산기후%20%23건조기후%20%23트레킹.jpg"
  },
  {
    id: 11,
    tags: "#미국 #건조기후 #사막기후 #일교차큼",
    url: "/image/%23미국%20%23건조기후%20%23사막기후%20%23일교차큼.jpg"
  },
  {
    id: 12,
    tags: "#남미 #고산기후 #건조기후 #극적인기후",
    url: "/image/%23남미%20%23고산기후%20%23건조기후%20%23극적인기후.jpg"
  },
  {
    id: 13,
    tags: "#칠레 #한랭기후 #겨울추위 #야생동물",
    url: "/image/%23칠레%20%23한랭기후%20%23겨울추위%20%23야생동물.jpg"
  },
  {
    id: 14,
    tags: "#인도 #아열대기후 #건조기후 #겨울건기 (2)",
    url: "/image/%23인도%20%23아열대기후%20%23건조기후%20%23겨울건기%20(2).jpg"
  },
  {
    id: 15,
    tags: "#인도 #아열대기후 #건조기후 #겨울건기",
    url: "/image/%23인도%20%23아열대기후%20%23건조기후%20%23겨울건기.jpg"
  },
  {
    id: 16,
    tags: "#태국 #열대몬순 #건기우기 #연중고온",
    url: "/image/%23태국%20%23열대몬순%20%23건기우기%20%23연중고온.jpg"
  },
  {
    id: 17,
    tags: "#미국 #아열대기후 #습한여름 #테마파크",
    url: "/image/%23미국%20%23아열대기후%20%23습한여름%20%23테마파크.jpg"
  },
  {
    id: 18,
    tags: "#대만 #아열대기후 #습한여름 #자유여행",
    url: "/image/%23대만%20%23아열대기후%20%23습한여름%20%23자유여행.jpg"
  },
  {
    id: 19,
    tags: "#미국 #습윤대륙성 #겨울추위 #자연경관",
    url: "/image/%23미국%20%23습윤대륙성%20%23겨울추위%20%23자연경관.jpg"
  },
  {
    id: 20,
    tags: "#미국 #습윤대륙성 #사계절뚜렷 #교육여행",
    url: "/image/%23미국%20%23습윤대륙성%20%23사계절뚜렷%20%23교육여행.jpg"
  },
  {
    id: 21,
    tags: "#미국 #습윤대륙성 #사계절뚜렷 #도시탐방",
    url: "/image/%23미국%20%23습윤대륙성%20%23사계절뚜렷%20%23도시탐방.jpg"
  },
  {
    id: 22,
    tags: "#모로코 #건조기후 #사막기후 #문화탐방",
    url: "/image/%23모로코%20%23건조기후%20%23사막기후%20%23문화탐방.jpg"
  },
  {
    id: 23,
    tags: "#일본 #냉대기후 #여름쾌적 #습윤대륙성",
    url: "/image/%23일본%20%23냉대기후%20%23여름쾌적%20%23습윤대륙성.jpg"
  },
  {
    id: 24,
    tags: "#몽골 #건조기후 #대륙성기후 #여름쾌적",
    url: "/image/%23몽골%20%23건조기후%20%23대륙성기후%20%23여름쾌적.jpg"
  },
  {
    id: 25,
    tags: "#러시아 #냉대기후 #극심한겨울 #습윤대륙성 (2)",
    url: "/image/%23러시아%20%23냉대기후%20%23극심한겨울%20%23습윤대륙성%20(2).jpg"
  },
  {
    id: 26,
    tags: "#러시아 #냉대기후 #극심한겨울 #습윤대륙성 (3)",
    url: "/image/%23러시아%20%23냉대기후%20%23극심한겨울%20%23습윤대륙성%20(3).jpg"
  },
  {
    id: 27,
    tags: "#러시아 #냉대기후 #극심한겨울 #습윤대륙성",
    url: "/image/%23러시아%20%23냉대기후%20%23극심한겨울%20%23습윤대륙성.jpg"
  },
  {
    id: 28,
    tags: "#스위스 #산악기후 #냉대기후 #여름쾌적 (2)",
    url: "/image/%23스위스%20%23산악기후%20%23냉대기후%20%23여름쾌적%20(2).jpg"
  },
  {
    id: 29,
    tags: "#스위스 #산악기후 #냉대기후 #여름쾌적",
    url: "/image/%23스위스%20%23산악기후%20%23냉대기후%20%23여름쾌적.jpg"
  },
  {
    id: 30,
    tags: "#라오스 #열대몬순 #건기우기 #문화탐방",
    url: "/image/%23라오스%20%23열대몬순%20%23건기우기%20%23문화탐방.jpg"
  },
  {
    id: 31,
    tags: "#홍콩 #아열대기후 #습한여름 #쇼핑천국 (2)",
    url: "/image/%23홍콩%20%23아열대기후%20%23습한여름%20%23쇼핑천국%20(2).jpg"
  },
  {
    id: 32,
    tags: "#홍콩 #아열대기후 #습한여름 #쇼핑천국",
    url: "/image/%23홍콩%20%23아열대기후%20%23습한여름%20%23쇼핑천국.jpg"
  },
  {
    id: 33,
    tags: "#일본 #아열대기후 #습한여름 #해양액티비티",
    url: "/image/%23일본%20%23아열대기후%20%23습한여름%20%23해양액티비티.jpg"
  },
  {
    id: 34,
    tags: "#일본 #습윤온대 #사계절쾌적 #도시탐방",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23도시탐방.jpg"
  },
  {
    id: 35,
    tags: "#일본 #습윤온대 #사계절쾌적 #겨울온천 (2)",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23겨울온천%20(2).jpg"
  },
  {
    id: 36,
    tags: "#일본 #습윤온대 #사계절쾌적 #겨울온천",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23겨울온천.jpg"
  },
  {
    id: 37,
    tags: "#중국 #습윤온대 #사계절쾌적 #내륙탐방",
    url: "/image/%23중국%20%23습윤온대%20%23사계절쾌적%20%23내륙탐방.jpg"
  },
  {
    id: 38,
    tags: "#중국 #습윤온대 #사계절쾌적 #자연경관",
    url: "/image/%23중국%20%23습윤온대%20%23사계절쾌적%20%23자연경관.jpg"
  },
  {
    id: 39,
    tags: "#일본 #습윤온대 #사계절쾌적 #봄가을추천 (2)",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23봄가을추천%20(2).jpg"
  },
  {
    id: 40,
    tags: "#일본 #습윤온대 #사계절쾌적 #봄가을추천",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23봄가을추천.jpg"
  },
  {
    id: 41,
    tags: "#그리스 #지중해성기후 #온화한기후 #종교여행",
    url: "/image/%23그리스%20%23지중해성기후%20%23온화한기후%20%23종교여행.jpg"
  },
  {
    id: 42,
    tags: "#모로코 #지중해성기후 #온화한기후 #사막체험",
    url: "/image/%23모로코%20%23지중해성기후%20%23온화한기후%20%23사막체험.jpg"
  },
  {
    id: 43,
    tags: "#독일 #습윤대륙성 #사계절쾌적 #가을단풍",
    url: "/image/%23독일%20%23습윤대륙성%20%23사계절쾌적%20%23가을단풍.jpg"
  },
  {
    id: 44,
    tags: "#캐나다 #습윤대륙성 #사계절뚜렷 #스포츠여행",
    url: "/image/%23캐나다%20%23습윤대륙성%20%23사계절뚜렷%20%23스포츠여행.jpg"
  },
  {
    id: 45,
    tags: "#영국 #서안해양성기후 #온화한기후 #흐린날씨",
    url: "/image/%23영국%20%23서안해양성기후%20%23온화한기후%20%23흐린날씨.jpg"
  },
  {
    id: 46,
    tags: "#프랑스 #스위스 #산악기후 #냉대기후 #여름쾌적",
    url: "/image/%23프랑스%20%23스위스%20%23산악기후%20%23냉대기후%20%23여름쾌적.jpg"
  },
  {
    id: 47,
    tags: "#이집트 #건조기후 #사막기후 #일교차큼",
    url: "/image/%23이집트%20%23건조기후%20%23사막기후%20%23일교차큼.jpg"
  },
  {
    id: 48,
    tags: "#이집트 #건조기후 #사막기후 #역사탐방",
    url: "/image/%23이집트%20%23건조기후%20%23사막기후%20%23역사탐방.jpg"
  },
  {
    id: 49,
    tags: "#스페인 #포르투갈 #지중해성기후 #온화한기후",
    url: "/image/%23스페인%20%23포르투갈%20%23지중해성기후%20%23온화한기후.jpg"
  },
  {
    id: 50,
    tags: "#스웨덴 #한랭기후 #겨울긴밤 #겨울추위",
    url: "/image/%23스웨덴%20%23한랭기후%20%23겨울긴밤%20%23겨울추위.jpg"
  },
  {
    id: 51,
    tags: "#잠비아 #열대몬순 #건기우기 #자연경관",
    url: "/image/%23잠비아%20%23열대몬순%20%23건기우기%20%23자연경관.jpg"
  },
  {
    id: 52,
    tags: "#브라질 #아르헨티나 #열대기후 #온화한기후",
    url: "/image/%23브라질%20%23아르헨티나%20%23열대기후%20%23온화한기후.jpg"
  },
  {
    id: 53,
    tags: "#멕시코 #아열대기후 #해변휴양 #건기우기 (2)",
    url: "/image/%23멕시코%20%23아열대기후%20%23해변휴양%20%23건기우기%20(2).jpg"
  },
  {
    id: 54,
    tags: "#멕시코 #아열대기후 #해변휴양 #건기우기 (3)",
    url: "/image/%23멕시코%20%23아열대기후%20%23해변휴양%20%23건기우기%20(3).jpg"
  },
  {
    id: 55,
    tags: "#멕시코 #아열대기후 #해변휴양 #건기우기",
    url: "/image/%23멕시코%20%23아열대기후%20%23해변휴양%20%23건기우기.jpg"
  },
  {
    id: 56,
    tags: "#프랑스 #온화한기후 #습윤온대 #사계절쾌적",
    url: "/image/%23프랑스%20%23온화한기후%20%23습윤온대%20%23사계절쾌적.jpg"
  },
  {
    id: 57,
    tags: "#프랑스 #지중해성기후 #여름건조 #온화한기후",
    url: "/image/%23프랑스%20%23지중해성기후%20%23여름건조%20%23온화한기후.jpg"
  },
  {
    id: 58,
    tags: "#북유럽 #한랭기후 #겨울긴밤 #여름쾌적",
    url: "/image/%23북유럽%20%23한랭기후%20%23겨울긴밤%20%23여름쾌적.jpg"
  },
  {
    id: 59,
    tags: "#필리핀 #열대몬순 #건기우기 #따뜻한휴식(2)",
    url: "/image/%23필리핀%20%23열대몬순%20%23건기우기%20%23따뜻한휴식(2).jpg"
  },
  {
    id: 60,
    tags: "#필리핀 #열대몬순 #건기우기 #따뜻한휴식",
    url: "/image/%23필리핀%20%23열대몬순%20%23건기우기%20%23따뜻한휴식.jpg"
  },
  {
    id: 61,
    tags: "#필리핀 #열대몬순 #해양액티비티 #건기우기",
    url: "/image/%23필리핀%20%23열대몬순%20%23해양액티비티%20%23건기우기.jpg"
  },
  {
    id: 62,
    tags: "#동유럽 #대륙성기후 #습윤대륙성 #겨울추위",
    url: "/image/%23동유럽%20%23대륙성기후%20%23습윤대륙성%20%23겨울추위.jpg"
  },
  {
    id: 63,
    tags: "#남아공 #지중해성기후 #온화한기후 #사파리",
    url: "/image/%23남아공%20%23지중해성기후%20%23온화한기후%20%23사파리.jpg"
  },
  {
    id: 64,
    tags: "#볼리비아 #고산기후 #건조기후 #극적인기후",
    url: "/image/%23볼리비아%20%23고산기후%20%23건조기후%20%23극적인기후.jpg"
  },
  {
    id: 65,
    tags: "#탄자니아 #고산기후 #극심한고도 #모험여행",
    url: "/image/%23탄자니아%20%23고산기후%20%23극심한고도%20%23모험여행.jpg"
  },
  {
    id: 66,
    tags: "#이탈리아 #산악기후 #냉대기후 #여름쾌적",
    url: "/image/%23이탈리아%20%23산악기후%20%23냉대기후%20%23여름쾌적.jpg"
  },
  {
    id: 67,
    tags: "#싱가포르 #열대우림 #연중고온 #스콜성비",
    url: "/image/%23싱가포르%20%23열대우림%20%23연중고온%20%23스콜성비.jpg"
  },
  {
    id: 68,
    tags: "#캄보디아 #열대몬순 #연중고온 #문화탐방",
    url: "/image/%23캄보디아%20%23열대몬순%20%23연중고온%20%23문화탐방.jpg"
  },
  {
    id: 69,
    tags: "#이탈리아 #지중해성기후 #온화한기후 #여름건조 (2)",
    url: "/image/%23이탈리아%20%23지중해성기후%20%23온화한기후%20%23여름건조%20(2).jpg"
  },
  {
    id: 70,
    tags: "#이탈리아 #지중해성기후 #온화한기후 #여름건조 (3)",
    url: "/image/%23이탈리아%20%23지중해성기후%20%23온화한기후%20%23여름건조%20(3).jpg"
  },
  {
    id: 71,
    tags: "#이탈리아 #지중해성기후 #온화한기후 #여름건조",
    url: "/image/%23이탈리아%20%23지중해성기후%20%23온화한기후%20%23여름건조.jpg"
  },
  {
    id: 72,
    tags: "#네덜란드 #벨기에 #서안해양성기후 #온화한기후",
    url: "/image/%23네덜란드%20%23벨기에%20%23서안해양성기후%20%23온화한기후.jpg"
  },
  {
    id: 73,
    tags: "#뉴질랜드 #해양성기후 #사계절쾌적 #온화한기후",
    url: "/image/%23뉴질랜드%20%23해양성기후%20%23사계절쾌적%20%23온화한기후.jpg"
  },
  {
    id: 74,
    tags: "#아일랜드 #스코틀랜드 #서안해양성기후 #온화한기후",
    url: "/image/%23아일랜드%20%23스코틀랜드%20%23서안해양성기후%20%23온화한기후.jpg"
  },
  {
    id: 75,
    tags: "#크로아티아 #지중해성기후 #온화한기후 #여름건조",
    url: "/image/%23크로아티아%20%23지중해성기후%20%23온화한기후%20%23여름건조.jpg"
  },
  {
    id: 76,
    tags: "#말레이시아 #열대몬순 #연중고온 #따뜻한휴식",
    url: "/image/%23말레이시아%20%23열대몬순%20%23연중고온%20%23따뜻한휴식.jpg"
  },
  {
    id: 77,
    tags: "#마다가스카르 #열대기후 #습한여름 #모험여행",
    url: "/image/%23마다가스카르%20%23열대기후%20%23습한여름%20%23모험여행.jpg"
  },
  {
    id: 78,
    tags: "#일본 #습윤온대 #사계절쾌적 #도시탐방 (2)",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23도시탐방%20(2).jpg"
  },
  {
    id: 79,
    tags: "#일본 #습윤온대 #사계절쾌적 #도시탐방 (3)",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23도시탐방%20(3).jpg"
  },
  {
    id: 80,
    tags: "#일본 #습윤온대 #사계절쾌적 #도시탐방 (4)",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23도시탐방%20(4).jpg"
  },
  {
    id: 81,
    tags: "#일본 #습윤온대 #사계절쾌적 #도시탐방 (5)",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23도시탐방%20(5).jpg"
  },
  {
    id: 82,
    tags: "#일본 #습윤온대 #사계절쾌적 #문화탐방",
    url: "/image/%23일본%20%23습윤온대%20%23사계절쾌적%20%23문화탐방.jpg"
  },
]

export default function ImagePage() {
  const router = useRouter()
  const { preferences, updatePreferences } = useTripTaste()

  const [currentRound, setCurrentRound] = useState(0)
  const [roundImages, setRoundImages] = useState<typeof TRAVEL_IMAGES>([])
  const [selectedImageRounds, setSelectedImageRounds] = useState<number[][]>(
    preferences.selectedImageRounds || [[], [], [], [], []],
  )
  const [usedImageIds, setUsedImageIds] = useState<Set<number>>(new Set())
  const [shuffleCount, setShuffleCount] = useState(0)
  const [showResetModal, setShowResetModal] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const maxShuffles = 3

  useEffect(() => {
    setCurrentRound(0)
    setSelectedImageRounds([[], [], [], [], []])
    setUsedImageIds(new Set())
    setShuffleCount(0)
    updatePreferences({ selectedImageRounds: [[], [], [], [], []] })

    // Get 3 random images for this round
    generateRoundImages()
  }, [])

  const generateRoundImages = () => {
    const availableImages = TRAVEL_IMAGES.filter((img) => !usedImageIds.has(img.id))
    if (availableImages.length < 3) {
      console.error("Not enough available images")
      return
    }
    const shuffled = availableImages.sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 3)
    setRoundImages(selected)
  }

  const handleShuffle = () => {
    if (shuffleCount >= maxShuffles) {
      alert("다시 섞기는 최대 2번까지만 가능합니다!")
      return
    }

    if (shuffleCount < maxShuffles) {
      generateRoundImages()
      setShuffleCount((prev) => prev + 1)
    }
  }

  const handleSelectImage = (imageId: number) => {
    const newRounds = [...selectedImageRounds]
    newRounds[currentRound] = [imageId]
    setSelectedImageRounds(newRounds)

    // Mark as used
    const newUsed = new Set(usedImageIds)
    newUsed.add(imageId)
    setUsedImageIds(newUsed)

    // Move to next round or complete
    setTimeout(() => {
      if (currentRound === 4) {
        // All 5 rounds complete - proceed to analysis
        handleAnalyze(newRounds)
      } else {
        // Move to next round
        setCurrentRound((prev) => prev + 1)
        setRoundImages([])
        generateRoundImages()
      }
    }, 300)
  }

  const handleAnalyze = async (finalRounds: number[][]) => {
    const allSelectedIds = finalRounds.flat()
    updatePreferences({ selectedImageRounds: finalRounds })

    setIsAnalyzing(true)

    console.log("Selected image IDs for analysis:", allSelectedIds)

    const selectedTagsList = TRAVEL_IMAGES
  .filter(image => allSelectedIds.includes(image.id))
  .map(image => image.tags);

    console.log(selectedTagsList);
    const SUFFIX_PROMPT = `
        이 태그 정보와 가장 유사한 여행 상품 5개를 결정해야함. 각 여행 상품에 대해 각각 다음의 정보를 '|' 문자를 구분자로 하여 출력. 모든 결과 출력의 개행 문자는 반드시 '|' 로 출력해야 함.
        1. 여행 상품 이름
        2. 여행 상품 이름 5개에 대해 각각 가장 유사한 태그 4개. 태그 4개는 각각 '#태그1 #태그2 #태그3 #태그4' 형식으로 출력.
        3. 여행 상품의 예상되는 가격대. 자료가 충분하지 않을 경우 예상되는 금액을 추론하여 상상하여 작성.
        별다른 특징은 정리하지 않아야 함. 다른 문장형 답변은 불필요.
        종합된 태그를 바탕으로 가장 유사한 태그 6개를 정하여 유사한 순서대로 '#태그1 #태그2 #태그3 #태그4 #태그5 #태그6' 형식으로 가장 마지막에 출력.
        `;
    
    const concatenatedTags = selectedTagsList.join(' ');
    const finalInput = concatenatedTags + SUFFIX_PROMPT;

    console.log("Final input :", finalInput)

    const startTime = Date.now()
    const minDisplayTime = 7500

    try {
      const response = await fetch("https://rq7xwcscz0.execute-api.ap-northeast-2.amazonaws.com/Prod/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 'input': finalInput }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const result = await response.json()
      const info_list = result.output.split('|')

      console.log("Info List:", info_list);
      
      // const SECOND_PROMPT = " 입력된 여행 상품 이름 5개에 대해 각각 가장 유사한 태그 4개를 정리하고 예상되는 가격대를 추론하여 답변. 각 여행상품의 5개의 답변은 각각 구분자 '|' 로 구분. 모든 개행문자 또한 '|' 로 출력하여 구분. 별다른 특징은 정리하지 않아야 함. 다른 문장형 답변은 불필요."
      // const finalInput2 = concatenatedTags + SECOND_PROMPT;

      // const response2 = await fetch("https://rq7xwcscz0.execute-api.ap-northeast-2.amazonaws.com/Prod/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ 'input': finalInput2 }),
      // })

      // if (!response2.ok) throw new Error("Analysis2 failed")

      // const result2 = await response2.json()

      // const description_list = result2.output.split('|')
      // console.log("Description List:", description_list);

      // updatePreferences({
      //   tags: result.tags,
      //   packages: result.packages,
      // })
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

      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsed)

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      router.push("/results")
    } catch (error) {
      console.error("Analysis error:", error)

      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsed)

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      router.push("/results")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setShowResetModal(false)
    setCurrentRound(0)
    setSelectedImageRounds([[], [], [], [], []])
    setUsedImageIds(new Set())
    setShuffleCount(0)
    updatePreferences({ selectedImageRounds: [[], [], [], [], []] })
    setRoundImages([])
    generateRoundImages()
  }

  const isSelecting = selectedImageRounds[currentRound]?.length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/tripic-logo.png" alt="TRIPIC" className="h-16 w-auto" />
          </Link>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="초기화"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{currentRound}/5 선택</h2>
            <div className="text-sm text-slate-600 dark:text-slate-400">{currentRound + 1} 라운드</div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(currentRound / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-slate-600 dark:text-slate-400 text-lg">마음에 드는 여행 경험을 하나 선택하세요.</p>
        </div>

        {/* Image selection cards - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 flex-1 relative">
          {roundImages.map((image, index) => (
            <div key={image.id} className="relative">
              {index === 2 && (
                <div className="absolute -top-14 right-0 z-10">
                  <button
                    onClick={handleShuffle}
                    disabled={shuffleCount >= maxShuffles || isSelecting}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      shuffleCount >= maxShuffles || isSelecting
                        ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-95"
                    }`}
                  >
                    <Shuffle className="w-4 h-4" />
                    <span className="text-sm font-medium">다시 섞기</span>
                    <span className="text-xs ml-1">
                      {shuffleCount}/{maxShuffles}
                    </span>
                  </button>
                </div>
              )}

              <button
                onClick={() => handleSelectImage(image.id)}
                disabled={isSelecting}
                className={`w-full relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer transition-all transform ${
                  isSelecting ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"
                } shadow-lg hover:shadow-2xl`}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt="Travel experience"
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {selectedImageRounds[currentRound]?.includes(image.id) && (
                  <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center animate-bounce">
                      <span className="text-blue-600 text-4xl">✓</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Selection count */}
        <div className="text-center text-slate-600 dark:text-slate-400 text-sm">
          {isSelecting ? "선택 중..." : "이미지를 선택하세요"}
        </div>
      </main>

      {/* Reset confirmation modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">선택 초기화</h3>
              <p className="text-slate-600 dark:text-slate-400">처음부터 다시 선택하시겠습니까?</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              >
                취소
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium active:scale-95"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading modal */}
      {isAnalyzing && <LoadingModal />}
    </div>
  )
}
