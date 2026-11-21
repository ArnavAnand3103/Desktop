import React from 'react'

function Card({username,btnText="visit me"}) {
  console.log("props",props);
  console.log(username);
  return (
  <div className="relative h-[400px] w-[300px] rounded-md mb-4">

    <img src=""
    alt="AirMax Pro"
    className="z-0 h-full w-full rounded-md object-cover"/>

    <div className="absolute inset-0 bg-gradient-to-t
    from-gray-900 to-transparent"></div>
    <div className="absolute bottom-4 left-4 text-left">
        <h1 className="text-lg font-semibold text-white">{username}</h1>
    </div>
    <p className="mt-2 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At placeat natus sunt optio et, ratione odit beatae facilis aliquam explicabo qui praesentium quas accusantium ab, suscipit similique deleniti esse assumenda?
    </p>
    <button className="mt-2 inline-flex cursor-pointer
    items-center text-sm font-semibold text-white">
        {btnText}
    </button>
  </div>
  )
}

export default Card
