const ErrorMessage = ({ error }) => {
  return <>
    { error && <p>Помилка: {error}</p> }
  </>;
};

export default ErrorMessage