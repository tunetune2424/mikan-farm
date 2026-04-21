export default function Home() {
  return (
    <div>
      <main>
        <section className="bg-orange-200 h-screen relative bg-cover bg-center">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">ミカン園</h1>
            <p className="mt-4">沖縄の太陽が育てた、甘いみかん。</p>
            <button className="mt-8 px-8 py-3 bg-[#E8834A] text-white rounded-full">農園を見てみる</button>
          </div>
        </section>

        <section className="py-20 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">沖縄の小さな農園から</h2>
          <p className="text-[#3A2D1E] leading-relaxed">沖縄の温暖な気候と豊かな土壌で育てたみかんをお届けしています。農薬を極力抑え、一つひとつ手摘みで収穫。生産者の顔が見える、小さな農園のみかんです。</p>
        </section>
      </main>
    </div>
  )
}
