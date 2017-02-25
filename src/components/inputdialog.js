import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

export default class InputDialog extends React.Component {
    state = {
        open: false,
        valueTarget: '',
        valueSum: '',
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChangeSum = (event) => {
        this.setState({
            valueSum: event.target.valueSum,
        });
    };

    handleChangeTarget = (event) => {
        this.setState({
            valueTarget: event.target.valueTarget,
        });
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
                    <TextField floatingLabelText="Назначение дохода\расхода"
                               fullWidth={true} value={this.state.valueTarget} onChange={this.handleChangeTarget}
                               floatingLabelFixed={true}/>
                    <TextField floatingLabelText="Сумма" value={this.state.valueSum} onChange={this.handleChangeSum}
                               floatingLabelFixed={true}/>
                </Dialog>
            </div>
        );
    }
}