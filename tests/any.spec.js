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

    [ 'allow', 'valid', 'only', 'equal', 'equals' ].forEach(propName => {
        describe('#' + propName, () => {
            it('should validate', () => {
                expect(any[propName](1)({ a: 1 }, 'a')).to.be.equal(undefined);
            });
    
            it('should validate for several arguments', () => {
                expect(any[propName](1, 2)({ a: 2 }, 'a')).to.be.equal(undefined);
            });
    
            it('should validate for array of arguments', () => {
                expect(any[propName]([1, 2])({ a: 2 }, 'a')).to.be.equal(undefined);
            });
    
            it('should invalidate', () => {
                expect(any[propName](1)({ a: 2 }, 'a')).to.be.an('error');
                expect(any[propName](1)({ a: 1 }, 'b')).to.be.an('error');
            });
        }); 
    });

    [ 'disallow', 'not', 'invalid' ].forEach(propName => {
        describe('#' + propName, () => {
            it('should validate', () => {
                expect(any[propName](1)({ a: 2 }, 'a')).to.be.equal(undefined);
                expect(any[propName](1)({ a: 1 }, 'b')).to.be.equal(undefined);
            });

            it('should validate for several arguments', () => {
                expect(any[propName](1, 2)({ a: 3 }, 'a')).to.be.equal(undefined);
            });
    
            it('should validate for array of arguments', () => {
                expect(any[propName]([1, 2])({ a: 3 }, 'a')).to.be.equal(undefined);
            });

            it('should invalidate', () => {
                expect(any[propName](1)({ a: 1 }, 'a')).to.be.an('error');
            });

            it('should invalidate for 2+ arguments', () => {
                expect(any[propName]([ 1, 2 ])({ a: 2 }, 'a')).to.be.an('error');
            });
        });
    });

    [ 'required', 'exist' ].forEach(propName => {
        describe('#' + propName, () => {
            it('should validate', () => {
                expect(any[propName]()({ a: 2 }, 'a')).to.be.equal(undefined);
            });

            it('should invalidate', () => {
                expect(any[propName]()({ a: undefined }, 'a')).to.be.an('error');
                expect(any[propName]()({ }, 'a')).to.be.an('error');
            });
        });
    });
});
