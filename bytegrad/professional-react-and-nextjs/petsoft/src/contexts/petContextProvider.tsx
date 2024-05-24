"use client"

import { addPet } from "@/actions/doAddPet"
import { checkoutPet } from "@/actions/doCheckoutPet"
import { editPet } from "@/actions/doEditPet"
import { TPet } from "@/lib/types"
import { createContext, useOptimistic, useState } from "react"
import { toast } from "sonner"

type PetContextProviderProps = {
  data: TPet[]
  children: React.ReactNode
}

type PetContextArgs = {
  pets: TPet[]
  selectedPetId: string | null
  handleSelectedPet: (id: string) => string
  handleAddPet: (petData: Omit<TPet, "id">) => Promise<TPet | undefined>
  handleEditPet: (
    id: string,
    petData: Omit<TPet, "id">,
  ) => Promise<TPet | undefined>
  handleCheckoutPet: (id: string) => Promise<void>
  selectedPet: TPet | undefined
  numberOfPets: number
}

export const PetContext = createContext<PetContextArgs | null>(null)

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (prev, petData: Omit<TPet, "id">) => {
      return [
        ...prev,
        {
          ...petData,
          id: String(Math.random()),
        },
      ]
    },
  )
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId)
  const numberOfPets = optimisticPets.length

  const handleSelectedPet = (id: string): string => {
    setSelectedPetId(id)
    return id
  }

  const handleAddPet = async (
    petData: Omit<TPet, "id">,
  ): Promise<TPet | undefined> => {
    setOptimisticPets(petData)
    const { error, response } = await addPet(petData)

    if (error) {
      toast.warning(error.message)
      return
    }

    if (response) setSelectedPetId(response.id)
    return response
  }

  const handleEditPet = async (
    id: string,
    petData: Omit<TPet, "id">,
  ): Promise<TPet | undefined> => {
    const { error, response } = await editPet(id, petData)

    if (error) {
      toast.warning(error.message)
      return
    }

    return response
  }

  const handleCheckoutPet = async (id: string) => {
    const { error } = await checkoutPet(id)

    if (error) {
      toast.warning(error.message)
      return
    }

    // Select the next pet in the list, if any
    const checkoutPetIndex = optimisticPets.map((pet) => pet.id).indexOf(id)
    setSelectedPetId(getNextPetId(checkoutPetIndex))
  }

  const getNextPetId = (previousPetIndex: number): string | null => {
    if (previousPetIndex === 0 && optimisticPets.length - 1 > 0)
      return optimisticPets[previousPetIndex + 1].id
    if (previousPetIndex > 0) return optimisticPets[previousPetIndex - 1].id

    return null
  }

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleSelectedPet,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        selectedPet,
        numberOfPets,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
