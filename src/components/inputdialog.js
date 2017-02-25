import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

if (areIntlLocalesSupported(['ru'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
} else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/ru');
}

const curDate = new Date();
curDate.setHours(0, 0, 0, 0);

export default class InputDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            valueDate: curDate,
            valueType: 1,
            valueTarget: '',
            errorTextTarget: '',
            valueSum: 0,
            errorTextSum: ''
        }
    };

    handleOpen = () => {
        this.setState({
            open: true,
            valueDate: curDate,
            valueType: 1,
            valueTarget: '',
            errorTextTarget: '',
            valueSum: 0,
            errorTextSum: ''
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        let error = false;

        if (this.state.valueTarget === '') {
            this.setState({errorTextTarget: 'Поле должно быть заполненно!'});
            error = true;
        }
        if (this.state.valueSum === '') {
            this.setState({errorTextTarget: 'Поле должно быть заполненно!'});
            error = true;
        }
        if (this.state.valueSum <= 0) {
            this.setState({errorTextSum: 'Недопустимое значение числа!'});
            error = true;
        }
        if (!error) {
            this.setState({open: false});
            this.props.onResult(
                {
                    date: this.state.valueDate,
                    category: this.state.valueTarget,
                    sum: (this.state.valueType === 2 ? this.state.valueSum * -1 : this.state.valueSum)
                })
        }
    };

    handleChangeSum = (event) => {
        if (Number.isInteger(+event.target.value)) {
            this.setState({
                valueSum: +event.target.value,
                errorTextSum: ''
            })
        } else {
            this.setState({
                errorTextSum: 'Недопустимое значение числа!'
            })
        }
    };

    handleChangeTarget = (event) => {
        this.setState({
            valueTarget: event.target.value,
            errorTextTarget: ''
        });
    };

    handleChangeDate = (event, date) => {
        this.setState({
            valueDate: date
        });
    };

    handleChangeType = (event, index, value) => this.setState({valueType: value});

    render() {
        const actions = [
            <FlatButton label="Отмена" onTouchTap={this.handleClose}/>,
            <FlatButton label="Ввести" primary={true} onTouchTap={this.handleSubmit}/>
        ];

        return (
            <div>
                <RaisedButton label="Новый доход\расход" primary={true} onTouchTap={this.handleOpen}/>
                <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}
                        title="Новая запись">
                    <DatePicker hintText="Дата платежа" cancelLabel="Отмена"
                                DateTimeFormat={DateTimeFormat} locale="ru" value={this.state.valueDate}
                                onChange={this.handleChangeDate}/>
                    <SelectField floatingLabelText="Тип платежа" value={this.state.valueType}
                                 onChange={this.handleChangeType}>
                        <MenuItem value={1} primaryText="Доход"/>
                        <MenuItem value={2} primaryText="Расход"/>
                    </SelectField>
                    <TextField floatingLabelText="Назначение дохода\расхода"
                               fullWidth={true} value={this.state.valueTarget} onChange={this.handleChangeTarget}
                               floatingLabelFixed={true} errorText={this.state.errorTextTarget}/>
                    <TextField floatingLabelText="Сумма" value={this.state.valueSum} onChange={this.handleChangeSum}
                               floatingLabelFixed={true} errorText={this.state.errorTextSum}/>
                </Dialog>
            </div>
        );
    }
}