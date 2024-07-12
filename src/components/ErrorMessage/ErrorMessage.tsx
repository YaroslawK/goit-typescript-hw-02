interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && <p>Помилка: {error}</p>}
    </>
  );
};

export default ErrorMessage;
