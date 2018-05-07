import React from 'react';
import Option from './Option.js';

const Options = props => (
    <div>
        <div className='widget-header'>
            <h3 className='widget-header__title'>Your Options</h3>
            <button 
                onClick={props.handleDeleteOptions}
                className='button button--link'
            >
                Remove all
            </button>
        </div>
        {props.options.length === 0 && <p className='widget__message'>Please add an option to get started</p>}
        {props.options.map((value, index) => (
            <Option 
                key={value} 
                optionText={value}
                count={index + 1} 
                handleDeleteOption={props.handleDeleteOption}
            />
        )) }
    </div>
);

export default Options;