import Head from 'next/head'
import React from 'react'


export default function Page({children, title, content, bgColor = 'bg-slate-100'}) {
    return (
        <div className={`mx-12 h-screen ${bgColor}`}>
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
