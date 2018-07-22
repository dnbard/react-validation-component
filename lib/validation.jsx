import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPropTypesSecret from 'prop-types/lib/ReactPropTypesSecret';

const DEFAULT_NAME = 'React Validate Component';

export default class ReactValidation extends Component{
    componentDidMount(){
        return this.validate.call(this);
    }

    shouldComponentUpdate({ children, propTypes }){
        return this.props.children !== children || this.props.propTypes !== propTypes;
    }

    componentDidUpdate(){
        return this.validate.call(this);
    }

    validate(){
        const { children, propTypes, onValidation, title } = this.props;
        const errors = [];
        
        for(let prop in propTypes){
            const e = propTypes[prop](children, prop, title || DEFAULT_NAME, '', null, ReactPropTypesSecret);
            if(e){
                errors.push({ error: e, property: prop });
            }
        }
        
        return onValidation(errors.length === 0 ? null : errors);
    }

    render(){
        return null;
    }
}

ReactValidation.propTypes = {
    children: PropTypes.object.isRequired,
    propTypes: PropTypes.object.isRequired,
    onValidation: PropTypes.func.isRequired,
    title: PropTypes.string
};
