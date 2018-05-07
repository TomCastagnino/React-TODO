import React from 'react';

export default class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error: undefined
        };
    }
    onFormSubmit(e) {
        e.preventDefault(); //avoid the full page refresh
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option);
        this.setState(() => ( { error: error } ) );
        if(!error) e.target.elements.option.value = '';
    }
    render() {
        return (
            <div>
                {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
                <form className='add-option' onSubmit={this.onFormSubmit}>
                    <input className='add-option__input' type="text" name="option"/>
                    <button className='button'>Add option</button>
                </form>
            </div>
        );
    }
}