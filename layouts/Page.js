import Head from 'next/head'
import React from 'react'


export default function Page({children, title, content}) {
    return (
        <div className='mx-12 bg-slate-100'>
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
