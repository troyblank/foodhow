import React from 'react';
import Chance from 'chance';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import Html from '../../../src/server/components/html';

describe('Html', () => {
    const chance = new Chance();
    const jsAsset = chance.word();
    const styleAsset = chance.word();
    const assets = {
        javascript: {
            jsAsset
        },
        styles: {
            styleAsset
        }
    };

    it('should render html', () => {
        const wrapper = shallow(<Html assets={assets} />);

        /* eslint-disable no-underscore-dangle */
        assert.isTrue(wrapper.contains(
          <html lang={'en-us'}>
            <head>
              <meta httpEquiv={'Content-Type'} content={'text/html; charset=utf-8'} />
              <title>Food How</title>
              <link href={'http://fonts.googleapis.com/css?family=Bitter:700|Raleway:500'} rel={'stylesheet'} />
              <link href={'/styles/styles.css'} rel={'stylesheet'} media={'all'} />
              <link href={'/styles/print.css'} rel={'stylesheet'} media={'print'} />
              {
                Object.keys(assets.styles).map((style, i) =>
                  <link href={assets.styles[style]} key={i} rel="stylesheet" />
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
        ));
        /* eslint-enable no-underscore-dangle */
    });
});
