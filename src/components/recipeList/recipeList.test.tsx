import React from 'react';
import { fireEvent, render } from '@testing-library/react'
import Chance from 'chance';
import { getRecipes } from '../../data';
import { RecipeList } from './';

jest.mock('../../data', () => ({
    getRecipes: jest.fn(),
}));

describe('Recipe List', () => {
    const chance = new Chance();

    it('Should render.', () => {
        const mockedRecipes = [chance.word(), chance.word(), chance.word()];

        jest.mocked(getRecipes).mockReturnValue(mockedRecipes);
        const { getByText } = render(<RecipeList />);

        expect(getByText('Food How')).toBeInTheDocument();
        expect(getByText(mockedRecipes[0])).toBeInTheDocument();
        expect(getByText(mockedRecipes[1])).toBeInTheDocument();
        expect(getByText(mockedRecipes[2])).toBeInTheDocument();
        expect(getByText('Food How is a place on how to make food. You will find recipes on this site that are used to make foods that are probably pretty good to eat.')).toBeInTheDocument();
    });

    it('Should filter list when input has changed.', () => {
        const mockedRecipes = ['beer', 'beef', 'fish'];

        jest.mocked(getRecipes).mockReturnValue(mockedRecipes);

        const { getByPlaceholderText, getByText, queryByText } = render(<RecipeList />);

        const input = getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'bee' } });

        expect(getByText('beer')).toBeInTheDocument();
        expect(getByText('beef')).toBeInTheDocument();
        expect(queryByText('fish')).not.toBeInTheDocument();
    });
  });
