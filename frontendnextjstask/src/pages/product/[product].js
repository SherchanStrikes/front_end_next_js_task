import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const ProductDetail = ({fieldRes}) => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={()=>router.push('/')}>Go Back</Button>
      <Button onClick={()=>router.push('/SearchPage')}>Search Page</Button>
      <h2>{fieldRes.id}</h2>
      <p>{fieldRes.price}</p>
      <p>{fieldRes.description}</p>
      <img src={fieldRes.image} alt={fieldRes.title} />
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;

export const getStaticPaths = async () => {
  const { NEXT_PUBLIC_API_URL } = process.env;
  const fields = await fetch(NEXT_PUBLIC_API_URL + 'products');

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
  const field = await fetch(
    NEXT_PUBLIC_API_URL + `products/${params.product}`
  );
  const fieldRes = await field.json();
  return {
    props: { fieldRes: fieldRes },

    revalidate: 1,
  };
};