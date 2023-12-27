import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import { useSamplesData } from "../../components/hooks/useSampleData";
import Link from "next/link";
import { useCart } from "../../components/context/CartContext";

const SearchPage = ({ productsRes }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState(null);
  const [id, setId] = useState(null);

  const { data: search, isLoading } = useSamplesData(id, category);

  const { addToCart, cart } = useCart();

  return (
    <section className="bg-warninglight py-5">
      <div className="d-flex justify-content-between">
        <Link href="/">
          <h1 className="px-4">
            <i className="bi bi-arrow-left-circle"></i>
          </h1>
        </Link>
        <button
          className="btn btn-primary me-3 p-3 rounded-5"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
        >
          Cart <i className="bi bi-cart2 ps-3 pe-1"></i>{cart?.length}
        </button>

        <div
          className="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          tabindex="-1"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header">
            <h2 className="offcanvas-title text-success" id="staticBackdropLabel">
              Shopping Cart
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.title} - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Container>
        <Row className="d-flex justify-content-center">
          <Row className="d-flex align-items-center my-3">
            <Col md={4}>
              <div>
                <h2>Product Lists</h2>
              </div>
            </Col>
            <Col md={8} className="col-12 d-flex justify-content-end">
              <div
                className="bg-white w-100 d-flex justify-content-between py-2 px-3"
                style={{ borderRadius: "15px" }}
              >
                <Select
                  className="my-select w-100 "
                  isLoading={isLoading}
                  instanceId="custom-select"
                  placeholder={<>Single Product (Id)</>}
                  onInputChange={(newValue) => setId(newValue)}
                  onChange={(newValue) => setId(newValue)}
                />
              </div>
              <div
                className="bg-white w-100 d-flex justify-content-between py-2 px-3"
                style={{ borderRadius: "15px" }}
              >
                <Select
                  className="my-select w-100 "
                  isLoading={isLoading}
                  instanceId="custom-select"
                  placeholder={<>Filter by Category</>}
                  onInputChange={(newValue) => setCategory(newValue)}
                  onChange={(newValue) => setCategory(newValue)}
                />
              </div>
              <div
                className="d-flex align-items-center w-100 "
                style={{ borderRadius: "15px" }}
              >
                <Button
                  variant={`${show ? "danger" : "warning"}`}
                  className="fw-bold text-white"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Clear Filters" : "Show All"}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col" className="desc">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col" className="price">Price</th>
                  <th scope="col">View</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {show ? (
                  productsRes?.map((item, index) => (
                    <tr key={item?.id}>
                      <th scope="row">{item?.id}</th>
                      <td>{item?.title}</td>
                      <td className="desc">{item?.description}</td>
                      <td>{item?.category}</td>
                      <td className="price">${item?.price}</td>
                      <td>
                        <Button variant="info" href={`/product/${item?.id}`}>
                          GO
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => addToCart(item)}
                        >
                          <i className="bi bi-cart2"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : search?.length > 1 ? (
                  search?.map((item, index) => (
                    <tr key={item?.id}>
                      <th scope="row">{item?.id}</th>
                      <td>{item?.title}</td>
                      <td className="desc">{item?.description}</td>
                      <td>{item?.category}</td>
                      <td className="price">${item?.price}</td>
                      <td>
                        <Button variant="info" href={`/product/${item?.id}`}>
                          GO
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => addToCart(item)}
                        >
                          <i className="bi bi-cart2"></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <th scope="row">{search?.id}</th>
                    <td>{search?.title}</td>
                    <td className="desc">{search?.description}</td>
                    <td>{search?.category}</td>
                    <td className="price">{search?.price}</td>
                    <td>
                      <Button
                        variant="info"
                        href={`/product/${search?.id}`}
                        disabled={`${!id ? true : false}`}
                      >
                        GO
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => addToCart(search)}
                        disabled={`${!id ? true : false}`}
                      >
                        <i className="bi bi-cart2"></i>
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Row>
        </Row>
      </Container>
    </section>
  );
};

export default SearchPage;

export const getStaticProps = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const products = await fetch(NEXT_PUBLIC_API_URL + "products");
  const productsRes = await products.json();
  return {
    props: {
      productsRes: productsRes,
    },
    revalidate: 1000,
  };
};
