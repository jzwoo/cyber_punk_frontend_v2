import React from "react"

const Landing: React.FC = () => {
  return (
    <div className="h-[calc(100vh-60px)]">
      <div className="flex flex-row">
        <div style={{ fontSize: "70px" }}>CYBER</div>

        <div className="font-light">[コマース]</div>
      </div>

      <div>Ticker</div>

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
