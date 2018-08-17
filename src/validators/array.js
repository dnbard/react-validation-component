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

    allowType(type){
        return this._base(testValue => testValue.filter(v => typeof v !== type).length === 0);
    }

    allowTypes(...args){
        const types = this._prepareArguments(...args);
        return this._base(testValue => testValue.filter(v => types.indexOf(typeof v) === -1).length === 0);
    }

    min(value = 0){
        return this._base(testValue => testValue.length >= value);
    }

    max(value = 0){
        return this._base(testValue => testValue.length <= value);
    }

    length(value = 0){
        return this._base(testValue => testValue.length === value);
    }
}
