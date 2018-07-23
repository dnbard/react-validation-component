import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret';

const DEFAULT_NAME = 'React Validate Component';

export default function ({ children={}, propTypes, onValidation, title }){
    const errors = [];
        
        for(let prop in propTypes){
            const propHandler = propTypes[prop];
            const propHandlers = typeof propHandler === 'function' ? [ propHandler ] : propHandler;

            if (!Array.isArray(propHandlers)){
                throw new TypeError('propHandlers should be an array');
            }

            for(let i in propHandlers){
                const e = propHandlers[i](children, prop, title || DEFAULT_NAME, '', null, ReactPropTypesSecret);
                if(e){
                    errors.push({ error: e, property: prop });
                }
            }
        }
        
    return onValidation(errors.length === 0 ? null : errors);
}
