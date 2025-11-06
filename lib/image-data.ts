// lib/image-data.ts (서버 전용 모듈 - "use client" 지시어 없음)
import fs from 'fs/promises';
import path from 'path';

export type ImageType = {
    id: number;
    category: string;
    url: string;
};

export async function getLocalTravelImages(): Promise<ImageType[]> {
  // 프로젝트 루트를 기준으로 public/image 경로 설정
  const imagesDirectory = path.join(process.cwd(), 'public', 'image');
  const BASE_URL = '/image/'; 

  try {
    const fileNames = await fs.readdir(imagesDirectory);

    let idCounter = 1;

    console.log("fileNames : "+fileNames);

    const localImages = fileNames
        .filter(fileName => fileName.endsWith('.jpg') || fileName.endsWith('.png'))
        .map(fileName => {
          // 파일명에 포함된 특수문자와 한글을 URL 인코딩
          const encodedFileName = encodeURIComponent(fileName);
            const category = "local";

          return {
            id: idCounter++,
            category: "local",
            url: `${BASE_URL}${encodedFileName}`, 
          };
        });
        
    return localImages;

  } catch (error) {
    console.error("Error reading local image directory:", error);
    // 폴더가 없거나 권한이 없을 경우 빈 배열 반환
    return [];
  }
}