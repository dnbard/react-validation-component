import AnyValidator from './any';

export default class ArrayValidator extends AnyValidator{
    constructor(){
        super();

        // testValue in validators are guaranteed to be an array
        this._addPreTest(testValue => Array.isArray(testValue));
    }

    /* PUBLIC */

    denyUndefined(){
        return this._base(testValue => testValue.filter(v => v === undefined).length === 0);
    }

    allowTypes(types=[]){
        return this._base(testValue => testValue.filter(v => types.indexOf(typeof v) === -1).length === 0);
    }
}
