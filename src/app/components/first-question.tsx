"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"

export const FirstQuestion = () => {
  const [val, setVal] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement >) => {
    setVal(e.target.value)
  }

  const handleClick = () => {
    if (val === '123') {
      alert('vaziuojam toliau :)')
    } else {
      alert('cbb')
    }
  }

  return <div><Input value={val} placeholder="KUR TOLIAU??" onChange={handleChange}/><Button size="lg" onClick={handleClick}>Vaziojam</Button></div>
}