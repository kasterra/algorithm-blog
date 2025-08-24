"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Pagination } from "@/components/pagination"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString())
    params.set("page", String(page))
    const next = `${pathname}?${params.toString()}`
    router.push(next)
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {}
  }

  return (
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  )
}

