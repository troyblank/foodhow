import React, { FunctionComponent } from 'react'
import NextHead from 'next/head'

export const Head: FunctionComponent = () => {
    return (
      <NextHead>
        <meta httpEquiv={'Content-Type'} content={'text/html; charset=utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />

        <title>Food How</title>
        <link href={'https://fonts.googleapis.com/css?family=Bitter:700|Raleway:500'} rel={'stylesheet'} />
        {/* Bookmark icons */}
        <link rel={'shortcut icon'} href={'/static/icons/favicon.png'} type={'image/png'} />
        {/* For third-generation iPad with high-resolution Retina display */}
        <link rel={'apple-touch-icon-precomposed'} sizes={'144x144'} href={'/static/icons/apple-touch-icon-144x144-precomposed.png'} />
        {/* For iPhone with high-resolution Retina display */}
        <link rel={'apple-touch-icon-precomposed'} sizes={'114x114'} href={'/static/icons/apple-touch-icon-114x114-precomposed.png'} />
        {/* For first- and second-generation iPad */}
        <link rel={'apple-touch-icon-precomposed'} sizes={'72x72'} href={'/static/icons/apple-touch-icon-72x72-precomposed.png'} />
        {/* For non-Retina iPhone, iPod Touch, and Android 2.1+ devices */}
        <link rel={'apple-touch-icon-precomposed'} href={'/static/icons/apple-touch-icon-precomposed.png'} />
        {/* For sharing this page on Facebook */}
        <link rel={'image_src'} type={'image/jpeg'} href={'/static/icons/facebook.jpg'} />
        {/* Landscape share social media icon */}
        <meta property={'og:image'} content={'/static/icons/social-1200x627.png'} />
       </NextHead>
     );
}
