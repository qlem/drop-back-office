import React from 'react'
import TopUser from "./User/topUser";
import LastDrops from "./Drop/lastDrops";

export default function Home () {
  return (
      <div className="flex justify-around">
          <TopUser/>
          <LastDrops/>
      </div>

  )
}