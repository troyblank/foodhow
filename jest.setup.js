import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// To allow 3rd party SSR libraries to work in jest. (e.g. amplify)
global.Request = jest.fn();
global.Response = jest.fn();
if (typeof global.structuredClone === 'undefined') {
    global.structuredClone = (object) => JSON.parse(JSON.stringify(object));
}

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve()
}),);

global.userEvent = userEvent.setup();

global.afterEach(() => {
    jest.spyOn(console, 'info').mockImplementation(() => {});

    jest.clearAllMocks();
});

window.alert = jest.fn();
