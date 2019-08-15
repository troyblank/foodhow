import React from 'react';
import './guide.scss';

export default function Guide() {
    return (
      <section className={'guide'}>
        <h1>Meet your Meats</h1>
        <table>
          <tr>
            <th>Meat</th>
            <th>Med-Rare</th>
            <th>Medium</th>
            <th>Done</th>
          </tr>
          <tr>
            <td>Beef</td>
            <td>130&deg;-145&deg;</td>
            <td>145&deg;-160&deg;</td>
            <td>165&deg;</td>
          </tr>
          <tr>
            <td>Lamb</td>
            <td>140&deg;-150&deg;</td>
            <td>160&deg;</td>
            <td>165&deg;</td>
          </tr>
          <tr>
            <td>Pork</td>
            <td />
            <td>150&deg;</td>
            <td />
          </tr>
          <tr>
            <td>Poultry</td>
            <td />
            <td>165&deg;-175&deg;</td>
            <td />
          </tr>
        </table>
        <h1>Really Rough Grill Time Guide</h1>
        <table>
          <tr>
            <th>Meat</th>
            <th>Med-Rare</th>
            <th>Medium</th>
            <th>Done</th>
          </tr>
          <tr>
            <td>Hamburger</td>
            <td>5 mins | 4 mins</td>
            <td />
            <td />
          </tr>
          <tr>
            <td>Chicken</td>
            <td>5 mins | 5 mins</td>
            <td />
            <td />
          </tr>
        </table>
      </section>
    );
}
