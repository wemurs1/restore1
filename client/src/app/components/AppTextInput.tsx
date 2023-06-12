import { TextField } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
}

export default function AppTextInput(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: '' });

  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      variant='outlined'
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
