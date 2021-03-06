import React from 'react'
import {
    Grid,
    Button
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';

function createData(history, market, medicine, operation, stopPrice, price, amount, total1, remainder, actual, total2) {
    return { history, market, medicine, operation, stopPrice, price, amount, total1, remainder, actual, total2 };
}

const rows = [
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
    createData('21.12.2021', "BTCTRY", "Tip", "Satış", "413.437.00", "413.437.00", "0.0420034", "0.0420034", "0.0230034", "0.00", "0.0420034"),
];

function HistoryTable() {
    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <div className="main-row-container">
                    <div style={{ color: '#57B2F6' }} className="font-12">Açık Emirlerim</div>
                    <div className="font-12">İşlem Geçmişi</div>
                    <div className="font-12">Alım/Satım Geçmişi</div>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-tr-header">Tarih</TableCell>
                                <TableCell align="center" className="table-tr-header">Market</TableCell>
                                <TableCell align="center" className="table-tr-header">Tip</TableCell>
                                <TableCell align="center" className="table-tr-header">İşlem</TableCell>
                                <TableCell align="center" className="table-tr-header">Stop Fiyat (BTC)</TableCell>
                                <TableCell align="center" className="table-tr-header">Fiyat (BTC)</TableCell>
                                <TableCell align="center" className="table-tr-header">Miktar (ETH)</TableCell>
                                <TableCell align="center" className="table-tr-header">Toplam (BTC)</TableCell>
                                <TableCell align="center" className="table-tr-header">Kalan (ETH)</TableCell>
                                <TableCell align="center" className="table-tr-header">Gerçekleşen Mik.</TableCell>
                                <TableCell align="right" className="table-tr-header">Toplam (BTC)</TableCell>
                                <TableCell align="right" className="table-tr-header"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" className="table-tr">{row.history}</TableCell>
                                    <TableCell align="center" style={index === 0 || index === 1 ? { color: '#57CA79' } : { color: '#FF5640' }} className="table-tr" >{row.market}</TableCell>
                                    <TableCell align="center" style={index === 0 || index === 1 ? { color: '#57CA79' } : { color: '#FF5640' }} className="table-tr" >{row.medicine}</TableCell>
                                    <TableCell align="center" className="table-tr" >{row.operation}</TableCell>
                                    <TableCell align="center" className="table-tr" >{row.stopPrice}</TableCell>
                                    <TableCell align="center" className="table-tr" >{row.price}</TableCell>
                                    <TableCell align="center" className="table-tr" >{row.amount}</TableCell>
                                    <TableCell align="center" className="table-tr" >{row.total1}</TableCell>
                                    <TableCell align="center" className="table-tr" >{row.remainder}</TableCell>
                                    <TableCell align="center" className="table-tr">{row.actual}</TableCell>
                                    <TableCell align="right" className="table-tr">{row.total2}</TableCell>
                                    <TableCell align="right" className="table-tr">
                                        <div className="btn-cancel">
                                            <CloseIcon />
                                            İptal et
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default HistoryTable;