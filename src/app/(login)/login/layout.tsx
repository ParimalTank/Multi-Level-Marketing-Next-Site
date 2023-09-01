import Script from "next/script"

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="shortcut icon" type="image/png" href="../assets/images/logos/favicon.png" />
                <link rel="stylesheet" href="../assets/css/styles.min.css" />
            </head>
            <body>{children}
                <Script src="../assets/libs/jquery/dist/jquery.min.js"></Script>
                <Script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></Script>
            </body>
        </html>
    )
}