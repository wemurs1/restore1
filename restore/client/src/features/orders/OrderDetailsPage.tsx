import { Typography, Grid, Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { fetchOrderAsync, orderSelectors } from './orderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { BasketItem } from '../../app/models/basket';
import { useEffect } from 'react';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const order = useAppSelector((state) =>
    orderSelectors.selectById(state, id!)
  );

  useEffect(() => {
    if (!order) dispatch(fetchOrderAsync(parseInt(id!)));
  }, [id, dispatch, order]);

  if (!order)
    return (
      <Box display='flex' justifyContent='space-between'>
        <Typography sx={{ p: 2 }} variant='h4' gutterBottom>
          No Order Found
        </Typography>
        <Button
          onClick={() => navigate('/orders')}
          sx={{ m: 2 }}
          size='large'
          variant='contained'
        >
          Return to orders
        </Button>
      </Box>
    );

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <Typography sx={{ p: 2 }} variant='h4' gutterBottom>
          Order# {order?.id} - {order?.orderStatus}
        </Typography>
        <Button
          onClick={() => navigate('/orders')}
          sx={{ m: 2 }}
          size='large'
          variant='contained'
        >
          Return to orders
        </Button>
      </Box>
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
