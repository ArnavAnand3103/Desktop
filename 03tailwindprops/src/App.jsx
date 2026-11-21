import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  let myobj={
    username:"hitesh",
    age:21
  }
  let newArr=[1,2,3]

  return (
    <>
     <h1 className='bg-green-400 text-black p-4 rounded-xl'>Tailwind test</h1>
     {/* <figure class="md:flex bg-slate-100 rounded-xl
     p-8 md:p-0 dark:bg-slate-800">

     </figure>
     <img class="w-24 h-24 md:w-48 md:h-auto
     md:rounded-none rounded-full mx-auto" src="https://images.pexels.com/photos/40590191/pexels-photo-40590191.jpeg" alt="" width="384" height="512"/>
     <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
      <blockquote>
        <p class="text-lg font-medium">
          "Tailwind CSS is the only framework that I've seen scale
          on larget teams.It's easy to customize,adapts to any design,
          and the build size is tiny."
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-sky-500 dark:text-sky-400">
          Sarah Dayan
        </div>
        <div class="text-slate-700 dark:text-slate-500">
          STaff Engineer,Algolia
        </div>
      </figcaption>
     </div> */}
     <Card username="chaiaurcode" btnText="click me"/>
     <Card username="hitesh" btnText="visit me"/>

    </>
  )
}

export default App
