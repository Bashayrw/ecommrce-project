/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/YQGvcadtBF1
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

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
import { Button } from "@/components/ui/button"

export function cardProduct() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm mx-auto">
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          alt="Product Image"
          className="object-cover w-full h-full"
          height="300"
          src="/placeholder.svg"
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width="400"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Acme Wireless Headphones</h3>
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold mr-2">$99.99</span>
          <span className="text-gray-500 text-sm line-through">$149.99</span>
        </div>
        <p className="text-gray-600 mb-4">
          Experience the ultimate in audio quality with our Acme Wireless Headphones.
        </p>
        <Button size="sm">View Details</Button>
      </div>
    </div>
  )
}
