import React from 'react';
import Link from 'next/link';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Chance from 'chance';
import Ingredient, { extractLink } from './ingredient';
import { TOGGLE_INGREDIENT_ON_LIST } from './actions';

describe('Ingredient', () => {
    const chance = new Chance();
    const text = chance.word();
    const url = `/${chance.word()}/${chance.word()}`;
    const link = `[${text}](${url})`;
    const fileName = chance.word();

    it('should render', () => {
        const wrapper = shallow(<Ingredient text={text} shoppingList={[]} />);
        const instance = wrapper.instance();

        assert.isTrue(wrapper.contains(
          <li
            className={'ingredient'}
          >
            <button
              dangerouslySetInnerHTML={{ __html: text }}
              onClick={instance.onToggle}
            />
          </li>
        ));
    });

    it('should render a link', () => {
        const wrapper = shallow(<Ingredient text={link} shoppingList={[]} />);

        assert.isTrue(wrapper.contains(
          <li
            className={'ingredient ingredient--is-link'}
          >
            <Link href={url}>
              <a dangerouslySetInnerHTML={{ __html: text }} />
            </Link>
          </li>
        ));
    });

    it('should be able to construct an id', () => {
        const wrapper = shallow(<Ingredient text={text} fileName={fileName} shoppingList={[]} />);
        const instance = wrapper.instance();
        const expectedID = `${fileName}|${text}`;

        assert.equal(instance.getID(), expectedID);
    });

    it('should mark as active it ingredient is in shopping list', () => {
        const shoppingList = [{ id: `${fileName}|${text}` }];
        const wrapper = shallow(<Ingredient text={text} fileName={fileName} shoppingList={shoppingList} />);

        assert.isTrue(wrapper.find('.ingredient--active').exists());
    });

    it('should be able to toggle', () => {
        const dispatch = sinon.spy();
        const wrapper = shallow(<Ingredient text={text} fileName={fileName} shoppingList={[]} dispatch={dispatch} />);
        const button = wrapper.find('button');

        button.simulate('click');

        assert.isTrue(dispatch.calledOnce);
        assert.equal(dispatch.args[0][0].type, TOGGLE_INGREDIENT_ON_LIST);
    });

    it('should be able to extract a link from raw text that is in the proper format', () => {
        const { full, label, url: extractedURL } = extractLink(link);

        assert.equal(full, link);
        assert.equal(label, text);
        assert.equal(url, extractedURL);
    });

    it('should note be able to extract a link from raw text that is not in the proper format', () => {
        const badLink = extractLink(text);

        assert.equal(badLink, null);
    });
});
