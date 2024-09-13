import '@testing-library/jest-dom';

jest.mock('prop-types', () => {
    const actualPropTypes = jest.requireActual('prop-types');
    const mockPropTypes = {};

    Object.keys(actualPropTypes).forEach((key) => {
        mockPropTypes[key] = jest.fn(() => null);
    });

    return mockPropTypes;
});

jest.mock('react-logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));
