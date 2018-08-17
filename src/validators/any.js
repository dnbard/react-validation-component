export default class AnyValidator{
    constructor(){
        // alliases
        this.equals = this.equal = this.only = this.valid = this.allow;
        this.not = this.invalid = this.disallow;
        this.exist = this.required;

        this._preTests = [];
    }

    /* PRIVATE */

    _base(func){
        if (typeof func !== 'function'){
            throw new TypeError(`First argument should be a function instead of ${typeof func}`);
        }

        const preTests = this._preTests;
        return function(props, propName, componentName){
            let result = null;
            
            for(let i in preTests){
                result = preTests[i](props[propName]);
                if (!result){
                    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
                }
            }

            result = func(props[propName]);
            if (!result){
                return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
            }    
        }
    }

    _addPreTest(preTest){
        if (typeof preTest !== 'function'){
            throw new TypeError('PreTest should be an error');
        }

        this._preTests.push(preTest);
    }

    _prepareArguments(...array){
        return Array.isArray(array[0]) ? array[0] : array;
    }

    /* PUBLIC */

    allow(...args){
        return this._base(testValue => {
            const _values = this._prepareArguments(...args);
            return _values.indexOf(testValue) !== -1;
        });
    }

    disallow(...args){
        return this._base(testValue => {
            const _values = this._prepareArguments(...args);
            return _values.indexOf(testValue) === -1;
        });
    }

    required(){
        return this._base(testValue => testValue !== undefined);
    }

    forbidden(){
        return this._base(testValue => testValue === undefined);
    }
}
