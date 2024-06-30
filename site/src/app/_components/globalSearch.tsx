"use client"
 
import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
 
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { CommandLoading } from "cmdk"
import Link from "next/link"
import { useRouter } from "next/navigation"
 
type GlobalCommandDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export function GlobalCommandDialog({ open, setOpen }: GlobalCommandDialogProps) {

  const [hunters, setHunters] = React.useState<{Name: string}[]>([])
  const [players, setPlayers] = React.useState<{Name: string, id: string}[]>([])
  const [search, setSearch] = React.useState("")

  const router = useRouter()

  React.useEffect(() => {
    async function fetchData() {
      const huntersResponse =  await fetch(`/api/hunters?name=${search}`)
      const hunters = await huntersResponse.json()
      setHunters(hunters.data)
      if (search.length > 3) {
        const playersResponse =  await fetch(`/api/players?name=${search}`)
        const players = await playersResponse.json()
        console.log(players.data)
        setPlayers(players.data)
      } else {
        setPlayers([])
      }
    }
    fetchData();
  }, [search])

  React.useEffect(() => {
    async function fetchData() {
      const huntersResponse =  await fetch(`/api/hunters`)
      const hunters = await huntersResponse.json()
      setHunters(hunters.data)
      setPlayers([])
    }
    fetchData();
  }, [open])

  const handleSelect = (url:string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <input
         onChange={(e) => setSearch(e.target.value)}
         placeholder="Search a role..."
         className="flex h-11 w-full rounded-md bg-transparent px-4 py-3 text-sm outline-none placeholder:text-defaultText font-medium disabled:cursor-not-allowed disabled:opacity-50"
      />
      <CommandList>
        <CommandEmpty>
          <p>No results found.</p>
        </CommandEmpty>
        { hunters.length > 0 && (
          <CommandGroup heading="Hunters">
            {hunters.map((hunter) => (
              // have navigation on command item
              <CommandItem key={hunter.Name} onSelect={() => handleSelect(`/hunters/${hunter.Name}`)} className="cursor-pointer">
                <span>{hunter.Name}</span>
              </CommandItem>
            ))}
            <CommandLoading />
          </CommandGroup>
        )}
        <CommandSeparator />
        { search.length > 3 && players.length > 0 && (
          <CommandGroup heading="Players">
            {players.map((player) => (
              <CommandItem key={player.id} onSelect={() => handleSelect(`/players/${player.id}`)} className="cursor-pointer">
                <span>{player.Name}</span>
              </CommandItem>
            ))}
            <CommandLoading />
          </CommandGroup>
        )}
        { search.length <= 3 && (
          <CommandGroup heading="Players">
            <span className="text-xs px-2 text-slate-500"> Type at least 4 characters to search for players.</span>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}