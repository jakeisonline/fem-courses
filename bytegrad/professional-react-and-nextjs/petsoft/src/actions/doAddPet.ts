"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addPet(formData: any) {
  try {
    await prisma.pet.create({
      data: {
        name: formData.get("name"),
        ownerName: formData.get("ownerName"),
        imageUrl: formData.get("imageUrl") || "/pet-placeholder.png",
        age: parseInt(formData.get("age")),
        notes: formData.get("notes"),
      },
    })
  } catch (error) {
    return { message: "Failed to add pet to database" }
  }

  revalidatePath("/app", "layout")
}