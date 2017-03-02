import React from 'react';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import styles1 from './tableoperations.css';

const styles = {
    textCenter: {
        textAlign: 'center'
    },
    textCenterUppercase: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: ' #000'
    },
    textCenterMiddle: {
        textAlign: 'center',
        verticalAlign: 'middle',
        fontWeight: 700
    }
};

export default class TableOperations extends React.Component {
    constructor(props) {
        super(props);
    }

    outCallback = (pre, cur) => {
        let num = cur < 0 ? cur : 0;
        return pre + num;
    };

    inCallback = (pre, cur) => {
        let num = cur > 0 ? cur : 0;
        return pre + num;
    };

    sumCallback = (pre, cur) => pre + cur;

    render() {
        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="4" style={styles.textCenterUppercase}>Список
                                операций</TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Дата</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Категория</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Расход</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenterUppercase}>Приход</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.props.listOperations.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.textCenter}>{row.date}</TableRowColumn>
                                <TableRowColumn style={styles.textCenter}>{row.category}</TableRowColumn>
                                <TableRowColumn
                                    style={styles.textCenter}>{row.sum < 0 ? Math.abs(row.sum) : ' '}</TableRowColumn>
                                <TableRowColumn style={styles.textCenter}>
                                    <div className="cellTable">{row.sum > 0 ? row.sum : ' '}</div>
                                    <div className="cellMenu">
                                        <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                  targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                            <MenuItem primaryText="Редактировать"/>
                                            <MenuItem primaryText="Удалить"/>
                                        </IconMenu>
                                    </div>
                                </TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter adjustForCheckbox={false}>
                        <TableRow>
                            <TableRowColumn style={styles.textCenterMiddle}>Итого</TableRowColumn>
                            <TableRowColumn />
                            <TableRowColumn
                                style={styles.textCenterMiddle}>{Math.abs(this.props.listOperations.map(row => row.sum).reduce(this.outCallback, 0))}</TableRowColumn>
                            <TableRowColumn
                                style={styles.textCenterMiddle}>{this.props.listOperations.map(row => row.sum).reduce(this.inCallback, 0)}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn style={styles.textCenterMiddle}>Остаток</TableRowColumn>
                            <TableRowColumn
                                style={styles.textCenterMiddle}>{this.props.listOperations.map(row => row.sum).reduce(this.sumCallback, 0)}</TableRowColumn>
                            <TableRowColumn />
                            <TableRowColumn />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}
