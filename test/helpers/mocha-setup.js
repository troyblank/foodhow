import styles from './style-fakes';

function css(module) {
    const fake = module;

    fake.exports = styles;

    return fake;
}

require.extensions['.scss'] = css;
