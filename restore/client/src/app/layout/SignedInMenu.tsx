import { Dropdown } from 'react-bootstrap';
import { signOut } from '../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  return (
    <Dropdown>
      <Dropdown.Toggle variant='primary'>{user?.email}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>My orders</Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(signOut())}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
