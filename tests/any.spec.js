import { expect } from 'chai';
import PropTypes from 'prop-types';

import validators from '../src/validators';
const { any } = validators;

describe('Validators :: Any', () => {
    it('should be an object', () => {
        expect(any).to.be.an('object');
    });

    describe('#_base', () => {
        it('should return function', () => {
            expect(any._base(() => {})).to.be.a('function');
        });

        it('should throw on wrong argument', () => {
            expect(() => any._base()).to.throw(/first argument/gi);
        });

        it('should run the validator function', next => {
            any._base(() => next(null))({});
        });

        it('should return an error', () => {
            expect(any._base(() => false)({})).to.be.an('error');
        })
    });

    describe('#_prepareArguments', () => {
        it('should work with one argument', () => {
            expect(any._prepareArguments(1)).to.be.deep.equal([ 1 ]);
        });

        it('should work with 2+ argument', () => {
            expect(any._prepareArguments(1, 2)).to.be.deep.equal([ 1, 2 ]);
        });

        it('should work with array argument', () => {
            expect(any._prepareArguments([ 1, 2 ])).to.be.deep.equal([ 1, 2 ]);
        });
    });

    describe('#allow', () => {
        it('should validate', () => {
            expect(any.allow(1)({ a: 1 }, 'a')).to.be.equal(undefined);
        });

        it('should validate for several arguments', () => {
            expect(any.allow(1, 2)({ a: 2 }, 'a')).to.be.equal(undefined);
        });

        it('should validate for array of arguments', () => {
            expect(any.allow([1, 2])({ a: 2 }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(any.allow(1)({ a: 2 }, 'a')).to.be.an('error');
            expect(any.allow(1)({ a: 1 }, 'b')).to.be.an('error');
        });

        it('should have alliases', () => {
            [ 'valid', 'only', 'equal', 'equals' ].forEach(propName => {
                expect(any[propName]).to.be.equal(any.allow);
            });
        });
    });

    describe('#disallow', () => {
        it('should validate', () => {
            expect(any.disallow(1)({ a: 2 }, 'a')).to.be.equal(undefined);
            expect(any.disallow(1)({ a: 1 }, 'b')).to.be.equal(undefined);
        });

        it('should validate for several arguments', () => {
            expect(any.disallow(1, 2)({ a: 3 }, 'a')).to.be.equal(undefined);
        });

        it('should validate for array of arguments', () => {
            expect(any.disallow([1, 2])({ a: 3 }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(any.disallow(1)({ a: 1 }, 'a')).to.be.an('error');
        });

        it('should invalidate for 2+ arguments', () => {
            expect(any.disallow([ 1, 2 ])({ a: 2 }, 'a')).to.be.an('error');
        });

        it('should have alliases', () => {
            [ 'not', 'invalid' ].forEach(propName => {
                expect(any[propName]).to.be.equal(any.disallow);
            });
        });
    });

    describe('#required', () => {
        it('should validate', () => {
            expect(any.required()({ a: 2 }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(any.required()({ a: undefined }, 'a')).to.be.an('error');
            expect(any.required()({ }, 'a')).to.be.an('error');
        });

        it('should have alliases', () => {
            [ 'exist' ].forEach(propName => {
                expect(any[propName]).to.be.equal(any.required);
            });
        });
    });

    describe('#forbidden', () => {
        it('should validate', () => {
            expect(any.forbidden()({ }, 'a')).to.be.equal(undefined);
            expect(any.forbidden()({ a: undefined }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(any.forbidden()({ a: 1 }, 'a')).to.be.an('error');
        });
    });
});
