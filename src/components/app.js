import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './app.css';
import TableOperations from './TableOperations'
import InputDialog from './InputDialog'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listOperations: [
                {
                    date: '24.02.2017',
                    category: 'Зарплата',
                    sum: 100
                },
                {
                    date: '24.02.2017',
                    category: 'Развлечения',
                    sum: -200
                },
                {
                    date: '24.02.2017',
                    category: 'Халтура',
                    sum: 500
                }
            ]
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <InputDialog />
                    <TableOperations listOperations={this.state.listOperations}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;