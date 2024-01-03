import Head from 'next/head';

const Seo = ({ seo, structured, name, content, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={name} content={content} />
       
        {seo?.canonicalURL && (
          <>
            <meta property="og:url" content={seo?.canonicalURL} />
            <link rel="canonical" href={seo?.canonicalURL} />
          </>
        )}
        {structured && (
          <script type="application/ld+json" id="analytics">
            {JSON.stringify(structured)}
          </script>
        )}
      </Head>
    </>
  );
};

export default Seo;
