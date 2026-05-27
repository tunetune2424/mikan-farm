import farmImg from '../assets/farm.png'

export default function About() {
  return (
    <div className="bg-[#FAF7F2]">
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3A2D1E] mb-12 text-center">農家紹介</h1>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img
              src={farmImg}
              alt="山原みかん農園の風景"
              className="w-full rounded-2xl shadow-md object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-[#3A2D1E] mb-4">山原みかん農園について</h2>
            <p className="text-[#3A2D1E] leading-relaxed mb-4">
              私たちの農園は、沖縄の温暖な気候と豊かな土壌に恵まれた小さな家族経営の農園です。
              創業から30年、みかん一筋で歩んできました。
            </p>
            <p className="text-[#3A2D1E] leading-relaxed mb-4">
              農薬を極力抑えた自然に近い栽培方法を守り、一つひとつのみかんを手で丁寧に収穫しています。
              機械に頼らず、家族みんなで心を込めて育てることが私たちのこだわりです。
            </p>
            <p className="text-[#3A2D1E] leading-relaxed">
              生産者の顔が見える農園として、安心・安全なみかんを皆さまのもとへ直接お届けしたいと思っています。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#3A2D1E] mb-10">農園の歩み</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { year: "1994年", label: "農園創業", desc: "家族3人でみかん栽培をスタート" },
              { year: "2005年", label: "産地直送開始", desc: "インターネット通販でお客様へ直接お届け" },
              { year: "2015年", label: "みかん狩り開始", desc: "農園体験を通じて地域と繋がる取り組みを開始" },
            ].map((item) => (
              <div key={item.year} className="bg-white rounded-2xl p-6 shadow-sm">
                <span className="text-[#E8834A] font-bold text-lg">{item.year}</span>
                <h3 className="text-[#3A2D1E] font-bold text-xl mt-2 mb-2">{item.label}</h3>
                <p className="text-[#3A2D1E] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
