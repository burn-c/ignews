import { useEffect, useState } from "react";

export function Async() {
  const [isButtonVisible, setButtonVisible] = useState(false)
  const [isButtonNotVisible, setButtonNotVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setButtonVisible(true)
      setButtonNotVisible(false)
    }, 1000)
  }, [])

  return (
    <div>
      <div>Hello World</div>
      {isButtonVisible && <button>Button Visible</button>}
      {isButtonNotVisible && <button>Button not Visible</button>}
    </div>
  )
}