export default class AnyValidator{
    _base(func){
        if (typeof func !== 'function'){
            throw new TypeError(`First argument should be a function instead of ${typeof func}`);
        }

        return function(props, propName, componentName){
            const result = func(props[propName]);
            if (!result){
                return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
            }
        }
    }

    _prepareArguments(...array){
        return Array.isArray(array[0]) ? array[0] : array;
    }

    allow(...args){
        return this._base(testValue => {
            const _values = this._prepareArguments(...args);
            return _values.indexOf(testValue) !== -1;
        });
    }
}