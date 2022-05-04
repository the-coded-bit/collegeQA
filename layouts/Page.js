import { Head } from 'next/head'
import React from 'react'

function Page({children, title, content}) {
  return (
    <div>
        <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Head>
      {
          children
      }
    </div>
  )
}

export default Page