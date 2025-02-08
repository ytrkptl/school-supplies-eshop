import Spinner from "../spinner/spinner.component";

const WithSpinner = ({ isLoading, children }) => {
  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default WithSpinner;
