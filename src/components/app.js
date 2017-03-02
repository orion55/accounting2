import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
                    id: 1,
                    date: '24.02.2017',
                    category: 'Зарплата',
                    sum: 100
                },
                {
                    id: 2,
                    date: '24.02.2017',
                    category: 'Развлечения',
                    sum: -200
                },
                {
                    id: 3,
                    date: '24.02.2017',
                    category: 'Халтура',
                    sum: 500
                }
            ]
        };
    }

    resultFunc = (data) => {
        data["id"] = this.state.listOperations.map(row => row.id).reduce((a, b) => Math.max(a, b)) + 1;
        this.setState({listOperations: this.state.listOperations.concat(data)});
    };

    deleteItem = (id) => {
        console.log('Delete ' + id);
    };

    editItem = (id) => {
        console.log('Edit ' + id);
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <InputDialog onResult={this.resultFunc.bind(this)}/>
                    <TableOperations listOperations={this.state.listOperations}
                                     deleteItem={this.deleteItem.bind(this)}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;