import React from 'react';
import AddOption from './AddOption.js';
import Options from './Options.js';
import Header from './Header.js';
import Action from './Action.js';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.pick = this.pick.bind(this);
        this.addOption = this.addOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);

        this.state = {
            options: [],
            selectedOption: undefined
        }
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) this.setState( () => ( { options: options } ) );
        } catch(e) {
            console.log("error: " + e);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }
    shutModal = () => this.setState( () => ( {selectedOption: undefined} ) );

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(option) {
        this.setState(prevState => ({
            options: prevState.options.filter(element => element !== option)
        }));
    }
    pick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState( () => ( {selectedOption: option} ) );
    }
    addOption(option) {
        if(!option) {
            return "Enter valid value item";
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
        this.setState(prevState => ( { options: prevState.options.concat(option) } ));
    }

    render() {
        const subtitle = "Blablabla";
        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action 
                    hasOptions={this.state.options.length > 0}
                    pick={this.pick} 
                    />
                    <div className='widget'>
                        <Options 
                        options={this.state.options} 
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                        addOption={this.addOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    shutModal={this.shutModal}
                />
            </div>
        );
    }
}