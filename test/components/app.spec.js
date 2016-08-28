
import { assert } from 'chai';
import { App, mapStateToProps, mapDispachToProps } from '../../src/client/js/components/app';

describe('App', () => {
    const mockState = {
        ingredients: []
    };
    const mockDispatch = () => true;

    it('should have an app', () => {
        assert.isNotNull(App);
    });

    it('should map state to props', () => {
        assert.deepEqual(mapStateToProps(mockState), { ingredients: mockState.ingredients });
    });

    it('should map dispatch to props', () => {
        assert.isObject(mapDispachToProps(mockDispatch));
    });
});
