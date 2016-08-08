import Chance from 'chance';

const chance = new Chance();

export default {
    button: chance.word(),
    'shopping-list': chance.word()
};
