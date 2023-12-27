import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";

const ProductDetail = ({ fieldRes }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  return (
    <section>
      <div className="d-flex justify-content-between p-3">
      <Button onClick={() => router.push("/")} variant="light">Go Back</Button>
      <Link href='/SearchPage' className="text-success">Search For Products</Link>
      </div>
      <div className="border border-2 shadow-lg m-3 p-3 rounded-4 row">
        <div className="col-md-6 col-12 ">
          <h2>{fieldRes.id}.</h2>
          <div className="d-flex">
            <p>Price:</p>
            <p className={`mx-2 ${show ? "" : "text-white"}`}>
              ${fieldRes.price}
            </p>
            <span className="ms-2" onClick={() => setShow(!show)}>
              {show ? (
                <i class="bi bi-eye-fill" />
              ) : (
                <i className="bi bi-eye-slash-fill" />
              )}
            </span>
          </div>
          <p>{fieldRes.description}</p>
        </div>
        <div className="col-md-6 col-12 ">
          <Image
            src={fieldRes?.image}
            className="card-img-top pic"
            alt="..."
            width={150} // Set the desired width
            height={300}
          />
        </div>
      </div>
      {/* Add more details as needed */}
    </section>
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
