import NotFound from './404';
import Loading from './Loading';

  function Error({ statusCode }) {
    return (
      <div>
        {statusCode ? (
          <p style={{ height: '100vh' }}>
            <NotFound />
            abcd
          </p>
        ) : (
          <div style={{height:"100vh"}} className={'d-flex justify-content-center align-items-center'}>
            <Loading/>
          </div>
        )}
      </div>
    );
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  };
  
  export default Error;