import { robotoMonoFont } from "@/app/font"
import Ticker from "@/components/ticker/ticker"
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

      <div className="flex flex-1 p-10 justify-between gap-8">
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

        <div className="flex flex-1 bg-blue-500">image 1</div>

        <div className="flex flex-1 bg-green-500">image 2</div>
      </div>
    </div>
  )
}

const Credits: React.FC = () => {
  return <div className="bg-red-500">Credits</div>
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
