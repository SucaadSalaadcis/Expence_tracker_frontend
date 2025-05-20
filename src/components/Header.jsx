import React from 'react'

export default function Header({ toggleSidebar }) {
  return (
    // Top bar for mobile
    <header className="flex items-center justify-between p-4 bg-white shadow md:hidden">
      <button className="text-xl text-black" onClick={toggleSidebar}>
        ☰
      </button>
      <span className="text-lg mr-5 font-bold text-[#155DFC]">Expense Tracker</span>
    </header>
  )
}
