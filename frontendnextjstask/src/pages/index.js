import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, Row } from "react-bootstrap";
import Link from "next/link";

const Home = ({ landingRes }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  
  return (
    <section>
      <Container>
      <div className="d-flex justify-content-between">
      
          <Button
              variant="dark"
              className="py-3 px-5 my-3"
              style={{ lineHeight: "1", fontSize: "14px" }}
              onClick={() => setShow(!show)}
            >
              {show ? "Show Less" : "Show More"}
            </Button>
            <Link href='/SearchPage' className="text-success my-3 pt-3">Search For Products</Link>
        </div>
        <Row className="d-flex justify-content-center justify-content-md-start ">
          {/* Name, prices, images */}
          {show
            ? landingRes?.map((i) => (
                <div
                  className="border border-2 shadow-lg rounded-2 col-md-6 col-xl-4 position-relative p-5 cc"
                  key={i?.id}
                  style={{cursor: 'pointer'}}
                  onClick={() => router.push(`/product/${i?.id}`)}
                >
                  <Image
                    src={i?.image}
                    className="card-img-top pic"
                    alt="..."
                    width={300}
                    height={300}
                  />
                    <div className="product-details position-absolute top-50 start-50 translate-middle hoveredTitle">
                      <p className="text-center fw-bold">{i?.title}</p>
                    </div>
                </div>
              ))
            : landingRes?.slice(0, landingRes?.length / 3).map((i) => (
                <div
                  className="border border-2 shadow-lg rounded-2 col-md-6 col-xl-4 position-relative p-5 cc"
                  key={i?.id}
                  style={{cursor: 'pointer'}}
                  onClick={() => router.push(`/product/${i?.id}`)}
                >
                  <Image
                    src={i?.image}
                    className="card-img-top pic"
                    alt="..."
                    width={300}
                    height={300}
                  />
                    <div className="product-details position-absolute top-50 start-50 translate-middle hoveredTitle">
                      <p className="text-center fw-bold">{i?.title}</p>
                    </div>
                </div>
              ))}
          
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
