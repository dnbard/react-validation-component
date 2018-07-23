import { expect } from 'chai';
import PropTypes from 'prop-types';

import validation from '../src/lib/validation';

describe('Validation', () => {
    it('should throw an error on wrong property handler', () => {
        expect(() => validation({ propTypes: { name: 'string' } })).to.throw('propHandlers should be an array');
    });

    it('should validate object', (next) => {
        expect(validation({
            propTypes: { name: PropTypes.string.isRequired },
            children: { name: 'Lorem Ipsum' },
            onValidation: (err) => next(err || undefined)
        }));
    });

    it('should invalidate object', (next) => {
        expect(validation({
            propTypes: { name: PropTypes.string.isRequired },
            children: { name: 33 },
            onValidation: (err) => next(err ? undefined : 'errors list should not be empty')
        }));
    });
});
