"use client"
import { Input } from "@/components/ui/input"
import { uploadImage } from "../lib/actions"

export const ImageUpload = () => {
  return <form action={uploadImage}><Input capture="user" type="file" accept="image/*" /></form>
}