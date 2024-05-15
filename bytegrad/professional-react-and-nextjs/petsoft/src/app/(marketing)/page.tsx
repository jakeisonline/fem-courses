import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex xl:flex-row flex-col items-center justify-center gap-10">
      <Image
        src="/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />
      <div className="">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>
        <div className="mt-10 flex gap-3">
          <Button asChild><Link href="/signup">Get started</Link></Button>
          <Button variant="secondary" asChild><Link href="/login">Log in</Link></Button>
        </div>
      </div>
    </main>
  )
}
