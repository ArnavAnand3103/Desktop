
import { useEffect, useState } from "react"

function useCurrencyInfo(currency) {
  const [data, setData] = useState({})

  useEffect(() => {
    if (!currency) return

    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.json`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch currency data")
        }
        return res.json()
      })
      .then((res) => {
        setData(res[currency.toLowerCase()] || {})
      })
      .catch((error) => {
        console.error("Currency API Error:", error)
        setData({})
      })

  }, [currency])

  return data
}

export default useCurrencyInfo
