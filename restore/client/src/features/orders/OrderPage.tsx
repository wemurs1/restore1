import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchOrdersAsync, orderSelectors } from './orderSlice';

export default function OrderPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(orderSelectors.selectAll);
  const { ordersLoaded, metaData } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!ordersLoaded) dispatch(fetchOrdersAsync());
  }, [dispatch, ordersLoaded]);

  if (!ordersLoaded) return <LoadingComponent message='Loading orders...' />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Order number</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Order Date</TableCell>
            <TableCell align='right'>Order Status</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {order.id}
              </TableCell>
              <TableCell align='right'>{currencyFormat(order.total)}</TableCell>
              <TableCell align='right'>
                {order.orderDate.split('T')[0]}
              </TableCell>
              <TableCell align='right'>{order.orderStatus}</TableCell>
              <TableCell align='right'>
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
