import Navigation from './_components/Navigation'
import Logo from './_components/Logo'
import Header from './_components/Header'

import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

console.log(josefin)

import '@/app/_styles/globals.css'

// 设置页面的元数据，便于SEO
export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased flex flex-col bg-primary-950 text-primary-100 min-h-screen`}>
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
        </div>

      </body>
    </html>

  )
}