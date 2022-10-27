import Image from "next/image";
import { MdxComponents } from "@/components/utils";

export default function Profile({ initCategory }: { initCategory: boolean }) {
  const { Note } = MdxComponents;
  return (
    <div className="flex flex-col place-items-center">
      <div>
        <section className="mx-2 mt-10 flex sm:p-8 md:p-10">
          <Image
            priority
            src="/images/profile.png"
            className="select-none rounded-full ring-2 ring-indigo-900 ring-offset-1 sm:h-16 sm:w-16 md:h-20 md:w-20"
            height={80}
            width={80}
            alt="프로필"
          />
          <div className="ml-8 flex flex-col justify-center space-y-1">
            <p className="font-heading text-lg">혜조</p>
            <p className="text-base">취준일기</p>
          </div>
        </section>
        <section className="mx-10 flex items-center">
          <p className="font-content text-base sm:leading-6 md:leading-7">
            안녕하세요. 처절한 코딩 생존기를 담은 사이트입니다.
            <br />
            <Note
              show={initCategory}
              type="underline"
              color="orange"
              animationDuration={1000}
            >
              코딩과 일기
            </Note>
            가 뒤죽박죽 섞여 있어요 😵‍💫
          </p>
        </section>
      </div>
    </div>
  );
}
