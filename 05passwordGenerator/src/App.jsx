import { useCallback, useRef, useState } from 'react'
import './App.css'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const characters = '!@#$%^&*-_+=[]{}~`'

function randomIndex(max) {
  if (window.crypto?.getRandomValues) {
    const values = new Uint32Array(1)
    window.crypto.getRandomValues(values)
    return values[0] % max
  }
  return Math.floor(Math.random() * max)
}

function createPassword(length, numberAllowed, charAllowed) {
  let pool = letters
  if (numberAllowed) pool += numbers
  if (charAllowed) pool += characters

  let generated = ''
  for (let index = 0; index < length; index += 1) {
    generated += pool[randomIndex(pool.length)]
  }
  return generated
}

function App() {
  const [length, setLength] = useState(12)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState(() => createPassword(12, false, false))
  const [copyStatus, setCopyStatus] = useState('Copy')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    setPassword(createPassword(length, numberAllowed, charAllowed))
    setCopyStatus('Copy')
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopyStatus('Copied!')
    } catch {
      passwordRef.current?.select()
      document.execCommand('copy')
      setCopyStatus('Copied!')
    }
  }, [password])

  return (
    <main className="app">
      <section className="generator-card">
        <p className="eyebrow">Secure password tool</p>
        <h1>Password Generator</h1>
        <p className="subtitle">Create a strong, unique password in seconds.</p>

        <div className="password-row">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            aria-label="Generated password"
            readOnly
          />
          <button type="button" className="copy-button" onClick={copyPasswordToClipboard}>
            {copyStatus}
          </button>
        </div>

        <div className="settings">
          <div className="length-setting">
            <div className="setting-heading">
              <label htmlFor="length">Password length</label>
              <output htmlFor="length">{length}</output>
            </div>
            <input
              id="length"
              type="range"
              min="6"
              max="40"
              value={length}
              onChange={(event) => {
                const nextLength = Number(event.target.value)
                setLength(nextLength)
                setPassword(createPassword(nextLength, numberAllowed, charAllowed))
                setCopyStatus('Copy')
              }}
            />
          </div>

          <label className="toggle">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(event) => {
                const nextValue = event.target.checked
                setNumberAllowed(nextValue)
                setPassword(createPassword(length, nextValue, charAllowed))
                setCopyStatus('Copy')
              }}
            />
            <span className="checkmark" />
            Include numbers
          </label>

          <label className="toggle">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(event) => {
                const nextValue = event.target.checked
                setCharAllowed(nextValue)
                setPassword(createPassword(length, numberAllowed, nextValue))
                setCopyStatus('Copy')
              }}
            />
            <span className="checkmark" />
            Include special characters
          </label>
        </div>

        <button type="button" className="generate-button" onClick={passwordGenerator}>
          Generate new password
        </button>
      </section>
    </main>
  )
}

export default App
