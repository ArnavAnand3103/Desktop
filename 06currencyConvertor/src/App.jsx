
import { useState } from 'react'
import { InputBox } from './component'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo || {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to])
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
    backgroundImage:"url('data:image/jpeg;base64,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')"
  }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">

          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default App
