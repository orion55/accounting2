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
        let arrResult = this.state.listOperations.filter(item => item.id === data.id);
        if (arrResult.length === 0) {
            this.setState({listOperations: this.state.listOperations.concat(data)});
        } else {
            this.setState({
                listOperations: this.state.listOperations.map(item => {
                    if (item.id === data.id) {
                        item = data;
                    }
                    return item;
                })
            });
        }
    };

    deleteItem = (id) => {
        this.setState({
            listOperations: this.state.listOperations.filter(item => item.id !== id)
        });
    };

    editItem = (id) => {
        this.refs.dialog.handleEdit(this.state.listOperations.filter(item => item.id === id));
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <InputDialog onResult={this.resultFunc.bind(this)} listOperations={this.state.listOperations}
                                 ref="dialog"/>
                    <TableOperations listOperations={this.state.listOperations}
                                     deleteItem={this.deleteItem.bind(this)}
                                     editItem={this.editItem.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;