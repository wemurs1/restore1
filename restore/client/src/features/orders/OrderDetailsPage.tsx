import { Typography, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { fetchOrderAsync, orderSelectors } from './orderSlice';
import { useParams } from 'react-router-dom';
import { BasketItem } from '../../app/models/basket';
import { useEffect } from 'react';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) =>
    orderSelectors.selectById(state, id!)
  );

  useEffect(() => {
    if (!order) dispatch(fetchOrderAsync(parseInt(id!)));
  }, [id, dispatch, order]);

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      {order && (
        <>
          <BasketTable
            items={order.orderitems as BasketItem[]}
            isBasket={false}
          />
          <Grid container>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <BasketSummary basketItems={order.orderitems as BasketItem[]} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
