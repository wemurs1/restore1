import { TextField } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
}

export default function AppTextInput(props: Props) {
  const { field, fieldState } = useController({ ...props });

  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant='outlined'
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
