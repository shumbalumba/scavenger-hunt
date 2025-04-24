import { Input } from "@/components/ui/input"

export const ImageUpload = () => {
  return <Input capture="user" type="file" accept="image/*" />
}