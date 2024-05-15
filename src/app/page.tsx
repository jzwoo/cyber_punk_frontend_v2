import { robotoMonoFont } from "@/app/font"
import Ticker from "@/components/ticker/ticker"
import Image from "next/image"
import React from "react"

const Landing: React.FC = () => {
  const displayTitle = () => {
    return (
      <div className="p-10">
        <span className="align-top text-[140px] leading-[7rem]">CYBER</span>

        <span className="font-light align-top text-[35px]">[コマース]</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      {displayTitle()}

      <Ticker />

      <div className="flex flex-1 p-10 justify-between gap-10">
        <div className="w-[500px]">
          <p
            className={`${robotoMonoFont.className} text-xl text-justify leading-[1.8] tracking-[8px]`}
          >
            In an industry where seemingly everything has already been said.
            <span className="text-[var(--gold)]">サイバー</span> seeks to
            comment more than state.
            <span
              className="animate-blink-caret"
              style={{ borderRight: ".15em solid var(--gold)" }}
            >
              {" "}
              Check out the new neohuman collection.
            </span>
          </p>
        </div>

        <div className="relative flex flex-[2_2_0%]">
          <Image
            className="object-cover"
            src="/landing/image1.jpg"
            alt="Image1"
            fill={true}
            quality={100}
          />
        </div>

        <div className="relative flex flex-col flex-1">
          <div className="relative flex flex-1 mt-[-286px] mb-[130px]">
            <Image
              className="object-cover"
              src="/landing/image2.jpg"
              alt="Image2"
              fill={true}
              quality={100}
            />
          </div>

          <div className="absolute flex flex-col items-center right-[-29.5px] bottom-[29.5px] -rotate-90 leading-none">
            <a href="#credits" className="tracking-wide">
              SCROLL
            </a>

            <a href="#credits">
              <span className="text-[var(--gold)] font-light">
                [スクロール]
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Credits: React.FC = () => {
  return (
    <div id="credits" className="bg-blue-500 h-[calc(100vh-60px)]">
      Credits
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <div>
      <Landing />

      <Credits />
    </div>
  )
}

export default Home
