import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

export default class InputDialog extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton label="Отмена" onTouchTap={this.handleClose}/>,
            <FlatButton label="Ввести" primary={true} onTouchTap={this.handleClose}/>
        ];

        return (
            <div>
                <RaisedButton label="Новый доход\расход" primary={true} onTouchTap={this.handleOpen}/>
                <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}
                        title="Новая запись">
                    <DatePicker hintText="Date Picker"/>
                    <TextField hintText="Назначение дохода\расхода" floatingLabelText="Назначение"/><br/>
                    <TextField floatingLabelText="Сумма"/>
                </Dialog>
            </div>
        );
    }
}