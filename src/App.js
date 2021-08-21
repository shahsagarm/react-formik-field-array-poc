import { Container } from 'react-bootstrap';

import RestaurantForm from './components/RestaurantForm/RestaurantForm';

const App = () => {
  return (
    <>
      <Container>
        <section className="my-5">
          <h1 className="display-4 text-center text-white">React & Formik FieldArray POC</h1>
          <p className="lead text-center text-white">
            <span>This poc demonstrates how to work with array fields in Formik including basic validations.</span>
            <br />
            <span>Here's an example of a restaurant details form, which captures basic restaurant information such as the restaurant's name and a list of locations.</span>
          </p>
        </section>
        <main className="my-5">
          <RestaurantForm />
        </main>
      </Container>
    </>
  );
}

export default App;
