import { useRouteError } from "react-router-dom";

export function ErrorPage(props) {
  const error = useRouteError();
  console.error(error);
  return (
    <div class='error-page'>
      <p>error page</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
