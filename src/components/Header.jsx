import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header className="w-full bg-[#FAF7F2] flex items-center justify-between px-6 py-4">
      <NavLink to="/" className={({ isActive }) =>
          isActive ? 'text-[#E8834A]' : 'text-[#3A2D1E] hover:text-[#E8834A]'
        }>ミカン園</NavLink>

      <nav className="flex gap-8">
        <NavLink to="/about" className={({ isActive }) =>
          isActive ? 'text-[#E8834A]' : 'text-[#3A2D1E] hover:text-[#E8834A]'
        }>農園紹介</NavLink>
        <NavLink to="/products" className={({ isActive }) =>
          isActive ? 'text-[#E8834A]' : 'text-[#3A2D1E] hover:text-[#E8834A]'
        }>商品</NavLink>
        <NavLink to="/commitment" className={({ isActive }) =>
          isActive ? 'text-[#E8834A]' : 'text-[#3A2D1E] hover:text-[#E8834A]'
        }>こだわり</NavLink>
        <NavLink to="/contact" className={({ isActive }) =>
          isActive ? 'text-[#E8834A]' : 'text-[#3A2D1E] hover:text-[#E8834A]'
        }>お問い合わせ</NavLink>
      </nav>
      
    </header>

  )
}
