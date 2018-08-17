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
});
