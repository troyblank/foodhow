import React from 'react';

export default function Html({ assets }) {
    /* eslint-disable no-underscore-dangle */
    return (
      <html lang={'en-us'}>
        <head>
          <meta httpEquiv={'Content-Type'} content={'text/html; charset=utf-8'} />
          <title>Food How</title>
          <link href={'http://fonts.googleapis.com/css?family=Bitter:700|Raleway:500'} rel={'stylesheet'} />
          <link href={'/styles/styles.css'} rel={'stylesheet'} media={'all'} />
          <link href={'/styles/print.css'} rel={'stylesheet'} media={'print'} />
          {
            Object.keys(assets.assets).map((style, i) =>
              <style key={i}>
                {assets.assets[style]._style}
              </style>
            )
          }
        </head>

        <body>
          <nav>
            <div className={'nav-wrapper'}>
              <a href={'/'} className={'home'}></a>
              <a href={'/guide'} className={'guide'}></a>
              <a href={'/shoppinglist'} className={'list'}></a>
            </div>
          </nav>
          <section id={'shopping-list-react'}></section>
          {
            Object.keys(assets.javascript).map((javascript, i) =>
              <script key={i} src={`/scripts/${assets.javascript[javascript]}`}></script>
            )
          }
        </body>
      </html>
    );
    /* eslint-enable no-underscore-dangle */
}
