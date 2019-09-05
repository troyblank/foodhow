import React from 'react';

export default function Html({ assets }) {
    return (
      <html lang={'en-us'}>
        <head>
          <meta httpEquiv={'Content-Type'} content={'text/html; charset=utf-8'} />
          <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
          <title>Food How</title>
          <link href={'http://fonts.googleapis.com/css?family=Bitter:700|Raleway:500'} rel={'stylesheet'} />
          <link href={'/styles/styles.css'} rel={'stylesheet'} media={'all'} />
          <link href={'/styles/print.css'} rel={'stylesheet'} media={'print'} />
          {
            Object.keys(assets.styles).map((style) => (
              <link href={assets.styles[style]} key={style} rel={'stylesheet'} />
            ))
          }
        </head>

        <body>
          <nav>
            <div className={'nav-wrapper'}>
              <a href={'/'} className={'home'} />
              <a href={'/guide'} className={'guide'} />
              <a href={'/shoppinglist'} className={'list'} />
            </div>
          </nav>
          <section id={'shopping-list-react'} />
          {
            Object.keys(assets.javascript).map((javascript) => (
              <script key={javascript} src={`/scripts/${assets.javascript[javascript]}`} />
            ))
          }
        </body>
      </html>
    );
}
