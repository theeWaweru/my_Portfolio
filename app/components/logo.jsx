import React from "react"
import Image from "next/image"
import Link from "next/link"
import Icon from "/public/favicon.svg"

export default function Logo() {
  return (
    <>
      <Link href="/"><Image src={Icon} alt="my icon" /></Link>
    </>
  )
}
