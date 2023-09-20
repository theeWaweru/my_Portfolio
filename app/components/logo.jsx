import React from "react"
import Image from "next/image"
import Icon from "/public/favicon.svg"

export default function Logo() {
  return (
    <>
      <div><Image src={Icon} alt="my icon" /></div>
    </>
  )
}
