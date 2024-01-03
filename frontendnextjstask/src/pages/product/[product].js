import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import Seo from "../../../components/Seo";
import meta from "../../../seo.json";

const ProductDetail = ({ fieldRes }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { productpage } = meta;
  const jsonLd = {
    "@context": "https://front-end-next-js-task-beige.vercel.app/product",
    "@type": "Product",
    title: fieldRes?.title,
    image: fieldRes?.image,
    description: fieldRes?.description,
  };
  return (
    <div>
      <Seo
        title={productpage?.title}
        name={productpage?.name}
        content={productpage?.content}
        structured={jsonLd}
      />
      <section>
        <div className="d-flex justify-content-between p-3">
          <Button onClick={() => router.push("/")} variant="light">
            Go Back
          </Button>
          <Link href="/SearchPage" className="text-success">
            Search For Products
          </Link>
        </div>
        <Row className="border border-2 shadow-lg m-3 p-3 rounded-4 overflow-hidden d-flex justify-content-between">
          <div className="col-md-6 col-12 ">
            <h2>
              {fieldRes?.id}. {fieldRes?.title}
            </h2>
            <div className="d-flex">
              <p>Price:</p>
              <p className={`mx-2 ${show ? "" : "text-white"}`}>
                ${fieldRes?.price}
              </p>
              <span
                className="ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <i class="bi bi-eye-fill" />
                ) : (
                  <i className="bi bi-eye-slash-fill" />
                )}
              </span>
            </div>
            <p>{fieldRes?.description}</p>
            <div>
              {Array.from(
                { length: Math.round(parseInt(fieldRes?.rating?.rate, 10)) },
                (_, index) => (
                  <i
                    key={index}
                    className="bi bi-star-fill text-warning me-1"
                  />
                )
              )}
              {fieldRes?.rating?.rate === 10
                ? ""
                : Array.from(
                    { length: Math.round(5 - fieldRes?.rating?.rate) },
                    (_, index) => (
                      <i key={index} className="bi bi-star text-warning me-1" />
                    )
                  )}
            </div>
          </div>
          <div className="col-md-4 col-12 ">
            <Image
              src={fieldRes?.image}
              className="card-img-top pic"
              alt="product image"
              width={100}
              height={300}
              objectFit="cover"
              priority
            />
          </div>
        </Row>
      </section>
    </div>
  );
};

export default ProductDetail;

export const getStaticPaths = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const fields = await fetch(NEXT_PUBLIC_API_URL + "products");

  const allField = await fields.json();
  return {
    paths: allField?.map((product) => ({
      params: {
        product: `${product?.id}`,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const field = await fetch(NEXT_PUBLIC_API_URL + `products/${params.product}`);
  const fieldRes = await field.json();
  return {
    props: { fieldRes: fieldRes },

    revalidate: 1,
  };
};
