import { render, screen } from "@testing-library/react"
import React from "react"
import { DifficultyBadge } from "@/components/difficulty-badge"

describe("DifficultyBadge", () => {
  it("renders Easy variant", () => {
    render(<DifficultyBadge difficulty="Easy" />)
    const badge = screen.getByText("Easy")
    expect(badge).toBeInTheDocument()
    expect(badge.className).toContain("bg-green-100")
  })

  it("renders Medium variant", () => {
    render(<DifficultyBadge difficulty="Medium" />)
    const badge = screen.getByText("Medium")
    expect(badge.className).toContain("bg-yellow-100")
  })

  it("renders Hard variant", () => {
    render(<DifficultyBadge difficulty="Hard" />)
    const badge = screen.getByText("Hard")
    expect(badge.className).toContain("bg-red-100")
  })
})

