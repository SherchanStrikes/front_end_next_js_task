import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { Button, Container, Row } from "react-bootstrap";

const Home = ({ landingRes }) => {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <section>
      <Container>
        <div className="py-3 d-flex justify-content-center">
          <Button className="btn-primary" onClick={()=>router.push('SearchPage')}>Search Page</Button>
        </div>
        <Row className="py-4 d-flex justify-content-center">
          {/* Name, prices, images */}
          {show
            ? landingRes?.map((i) => (
                <div
                  className="card col-md-6 col-xl-4 position-relative"
                  key={i?.id}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  // onClick={handleClick(i?.id)}
                  onClick={()=>router.push(`/product/${i?.id}`)}
                >
                  <Image
                    src={i?.image}
                    className="card-img-top"
                    alt="..."
                    width={500}
                    height={500}
                  />
                  {isHovered && (
                    <div className="product-details position-absolute top-50 start-50 translate-middle">
                      <h3 className="product-title">{i?.title}</h3>
                      <p className="product-price">{i?.price}</p>
                    </div>
                  )}
                </div>
              ))
            : landingRes?.slice(0, landingRes?.length / 3).map((i) => (
                <div
                  className="card col-md-6 col-xl-4 position-relative"
                  key={i?.id}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  // onClick={handleClick(i?.id)}
                  onClick={()=>router.push(`/product/${i?.id}`)}
                >
                  <Image
                    src={i?.image}
                    className="card-img-top"
                    alt="..."
                    width={500}
                    height={500}
                  />
                  {isHovered && (
                    <div className="product-details position-absolute top-50 start-50 translate-middle">
                      <h3 className="product-title">{i?.title}</h3>
                      <p className="product-price">{i?.price}</p>
                    </div>
                  )}
                </div>
              ))}
          <div className="headerFont d-flex justify-content-center">
            <Button
              className="py-3 px-5 mt-4 bg-primary"
              style={{ lineHeight: "1", fontSize: "14px" }}
              onClick={() => setShow(!show)}
            >
              {show ? "Show Less" : "Show More"}
            </Button>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
export const getStaticProps = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const landing = await fetch(NEXT_PUBLIC_API_URL + "products");
  const landingRes = await landing.json();
  return {
    props: {
      landingRes: landingRes,
    },
    revalidate: 1000,
  };
};
