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

const styles = {
    textCenter: {
        textAlign: 'center'
    },
    textCenterUppercase: {
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    textCenterMiddle: {
        textAlign: 'center',
        verticalAlign: 'middle',
        fontWeight: 700
    }
};

export default class TableOperations extends React.Component {

    sumNumber = this.props.listOperations.map(row => row.sum);

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
                            <TableHeaderColumn style={styles.textCenter}>Дата</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenter}>Категория</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenter}>Расход</TableHeaderColumn>
                            <TableHeaderColumn style={styles.textCenter}>Приход</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {this.props.listOperations.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn style={styles.textCenter}>{row.date}</TableRowColumn>
                                <TableRowColumn style={styles.textCenter}>{row.category}</TableRowColumn>
                                <TableRowColumn style={styles.textCenter}>{row.sum < 0 ? row.sum : ''}</TableRowColumn>
                                <TableRowColumn style={styles.textCenter}>{row.sum > 0 ? row.sum : ''}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter adjustForCheckbox={false}>
                        <TableRow>
                            <TableRowColumn style={styles.textCenterMiddle}>Итого</TableRowColumn>
                            <TableRowColumn />
                            <TableRowColumn
                                style={styles.textCenterMiddle}>{this.sumNumber.reduce(this.outCallback, 0)}</TableRowColumn>
                            <TableRowColumn
                                style={styles.textCenterMiddle}>{this.sumNumber.reduce(this.inCallback, 0)}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn style={styles.textCenterMiddle}>Остаток</TableRowColumn>
                            <TableRowColumn
                                style={styles.textCenterMiddle}>{this.sumNumber.reduce(this.sumCallback, 0)}</TableRowColumn>
                            <TableRowColumn />
                            <TableRowColumn />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    }
}
