import any from './any';
import AnyValidator from './any';
import ArrayValidator from './array';

export default {
    any: new AnyValidator(),
    array: new ArrayValidator()
};
