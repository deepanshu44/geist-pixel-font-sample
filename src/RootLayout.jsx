import { GeistPixelSquare } from 'geist/font/pixel'

export default function RootLayout({children}){
    return (
        <html lang="en" className={GeistPixelSquare.variable}>
          <body>{children}</body>
        </html>
    )
}
