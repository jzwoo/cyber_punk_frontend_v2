import Ticker from "@/components/ticker/ticker"
import React from "react"

const Landing: React.FC = () => {
  const displayTitle = () => {
    return (
      <div className="p-[40px]">
        <span className="align-top text-[140px] leading-[7rem]">CYBER</span>

        <span className="font-light align-top text-[35px]">[コマース]</span>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-60px)]">
      {displayTitle()}

      <Ticker />

      <div>Bottom Container</div>
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
