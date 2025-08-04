"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type ComboboxOption = {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function Combobox({ options, value, onValueChange, placeholder = "Selecione uma opção...", searchPlaceholder = "Buscar...", emptyMessage = "Nenhuma opção encontrada.", className, disabled = false }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const selectedOption = options.find((option) => option.value === value)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-full justify-between", className)} disabled={disabled}>
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <OptionsList options={options} onValueChange={onValueChange} setOpen={setOpen} searchPlaceholder={searchPlaceholder} emptyMessage={emptyMessage} selectedValue={value} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("w-full justify-between", className)} disabled={disabled}>
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <OptionsList options={options} onValueChange={onValueChange} setOpen={setOpen} searchPlaceholder={searchPlaceholder} emptyMessage={emptyMessage} selectedValue={value} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface OptionsListProps {
  options: ComboboxOption[]
  onValueChange: (value: string) => void
  setOpen: (open: boolean) => void
  searchPlaceholder: string
  emptyMessage: string
  selectedValue?: string
}

function OptionsList({ options, onValueChange, setOpen, searchPlaceholder, emptyMessage, selectedValue }: OptionsListProps) {
  /** Função para normalizar texto para busca (converter pra lower-case e desconsiderar acentos). */
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  return (
    <Command
      // Algoritmo de busca
      filter={(value, search) => {
        const option = options.find((opt) => opt.value === value) // Encontra a opção pelo value
        if (!option) return 0 // Se não encontrou, retorna 0 (não corresponde)

        // Normalizar busca
        const normalizedLabel = normalizeText(option.label)
        const normalizedSearch = normalizeText(search)

        return normalizedLabel.includes(normalizedSearch) ? 1 : 0
      }}
    >
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList className="w-full">
        <CommandEmpty className="text-center my-6 mx-10">{emptyMessage}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              onSelect={(currentValue) => {
                onValueChange(currentValue === selectedValue ? "" : currentValue)
                setOpen(false)
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", selectedValue === option.value ? "opacity-100" : "opacity-0")} />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
