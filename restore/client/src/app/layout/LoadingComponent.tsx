interface Props {
  message?: string;
}

export default function LoadingComponent({ message = 'Loading...' }: Props) {
  return (
    <div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
      <div className='text-center'>
        <div className='spinner-border' role='status'></div>
        <div>{message}</div>
      </div>
    </div>
  );
}
