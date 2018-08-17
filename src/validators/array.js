import AnyValidator from './any';

export default class ArrayValidator extends AnyValidator{
    constructor(){
        super();

        this._addPreTest(testValue => Array.isArray(testValue));
    }

    /* PUBLIC */

    denyUndefined(){
        return this._base(testValue => testValue.filter(v => v === undefined).length === 0);
    }
}
