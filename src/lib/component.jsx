import { Component } from 'react';
import PropTypes from 'prop-types';

import validation from './validation';

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
        return validation(this.props);
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
