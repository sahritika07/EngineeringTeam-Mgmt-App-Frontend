import "./globals.css"
import Layout from "../components/Layout"

export const metadata = {
  title: "Engeering RMS",
  description: "Full-stack Engineering Resource Management System",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
