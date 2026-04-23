export default function Commitment() {
  const Commitments = [
    { icon: "🍊", title: "手作業収穫", desc:"説明文..."},
    { icon: "🌿", title: "農薬を減らした栽培", desc:"説明文..."},
    { icon: "📦", title: "産地直送", desc:"説明文..."},
  ]
  return (
    <div>
      
        {Commitments.map((item) => (
          <div key={item.title}>
            <span>{item.icon}</span>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
    </div>
  )
}
