const products = [
  {
    id: 1,
    name: "山原みかん（Mサイズ）",
    desc: "甘みと酸味のバランスが絶妙な定番サイズ。家族で楽しむのに最適です。",
    price: "¥1,800 / 2kg",
    img: "https://picsum.photos/seed/mikan1/400/300",
  },
  {
    id: 2,
    name: "山原みかん（Lサイズ）",
    desc: "果肉たっぷりの大玉みかん。贈り物にも喜ばれる一品です。",
    price: "¥2,200 / 2kg",
    img: "https://picsum.photos/seed/mikan2/400/300",
  },
  {
    id: 3,
    name: "山原みかん（詰め合わせ）",
    desc: "M・Lサイズを詰め合わせたギフトセット。熨斗対応も可能です。",
    price: "¥3,500 / 3kg",
    img: "https://picsum.photos/seed/mikan3/400/300",
  },
]

export default function Products() {
  return (
    <div className="bg-[#FAF7F2] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3A2D1E] mb-4 text-center">商品</h1>
        <p className="text-center text-[#3A2D1E] mb-12">沖縄の太陽をいっぱい浴びて育った、甘いみかんをお届けします。</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold text-[#3A2D1E] mb-2">{product.name}</h2>
                <p className="text-sm text-[#3A2D1E] leading-relaxed mb-4">{product.desc}</p>
                <p className="text-[#E8834A] font-bold text-lg mb-4">{product.price}</p>
                <button className="w-full py-2 bg-[#E8834A] text-white rounded-full hover:bg-[#d4733d] transition-colors">
                  カートに追加
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
