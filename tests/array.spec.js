import { expect } from 'chai';

import validators from '../src/validators';
import AnyValidator from '../src/validators/any';
const { array } = validators;

describe('Validators :: Array', () => {
    it('should be an object', () => {
        expect(array).to.be.an('object');
    });

    it('should be an instance of AnyValidator', () => {
        expect(array).to.be.instanceof(AnyValidator);
        expect(array._base).to.be.a('function');
    });

    describe('pre-test', () => {
        it('should validate', () => {
            expect(array.denyUndefined()({ a: [1, 2] }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(array.denyUndefined()({ a: 1 }, 'a')).to.be.an('error');
        });
    });

    describe('#denyUndefined', () => {
        it('should validate', () => {
            expect(array.denyUndefined()({ a: [1, 2] }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(array.denyUndefined()({ a: [1, 2, undefined] }, 'a')).to.be.an('error');
        });
    });

    describe('#allowTypes', () => {
        it('should validate', () => {
            expect(array.allowTypes(['string'])({ a: ['lalala'] }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(array.allowTypes(['string'])({ a: [2 ,3] }, 'a')).to.be.an('error');
        });

        it('should work with non-array arguments', () => {
            expect(array.allowTypes('string')({ a: ['2' ,'3'] }, 'a')).to.be.equal(undefined);
        })
    });

    describe('#allowType', () => {
        it('should validate', () => {
            expect(array.allowType('string')({ a: ['lalala'] }, 'a')).to.be.equal(undefined);
        });

        it('should invalidate', () => {
            expect(array.allowType('string')({ a: [2 ,3] }, 'a')).to.be.an('error');
        });
    });
});
