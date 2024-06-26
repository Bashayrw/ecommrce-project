/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/65wCCYlZelY
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

import { FacebookIcon, InstagramIcon, Sparkle, TwitterIcon } from "lucide-react"
import { Link } from "react-router-dom"

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/


export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-800 mt-7">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:gap-0">
        <div className="flex items-center">
          <Link className="flex items-center" to="#">
            <Sparkle className="h-6 w-6" />
            <span className="sr-only">Lustrous Inc</span>
          </Link>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
        <Link aria-label="Facebook" to="#">
            <FacebookIcon className="h-5 w-5 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mr-6" />
            </Link>
            <Link aria-label="Instagram" to="#">
            <InstagramIcon className="h-5 w-5 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mr-6" />
          </Link>
          <Link aria-label="Twitter" to="#">
            <TwitterIcon className="h-5 w-5 text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mr-6" />
          </Link>
        </div>
        </nav>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-right">© 2024 Lustrous Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
