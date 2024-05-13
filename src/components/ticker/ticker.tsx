import React from "react"
import "./ticker.css"

const Ticker: React.FC = () => {
  const renderTexts = () => {
    const items = []

    for (let i = 0; i < 20; i++) {
      const color = i % 2 === 0 ? "white" : ""

      items.push(
        <div style={{ color: color }} key={i}>
          サイバー
        </div>
      )
    }

    return items
  }

  return (
    <div className="ticker">
      <div className="ticker-inner">{renderTexts()}</div>
    </div>
  )
}

export default Ticker
