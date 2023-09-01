import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function ProductDetailsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon.png" />
                <link rel="stylesheet" href="../assets/css/styles.min.css" />
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" referrerPolicy="no-referrer" />
            </head>
            <body className={inter.className}>{children}
                <Script src="../assets/libs/jquery/dist/jquery.min.js"></Script>
                <Script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>
                <Script src="../assets/js/sidebarmenu.js"></Script>
                <Script src="../assets/js/app.min.js"></Script>
                <Script src="../assets/libs/simplebar/dist/simplebar.js"></Script>
                <Script src="../assets/js/dashboard.js"></Script>
            </body>
        </html>
    )
}