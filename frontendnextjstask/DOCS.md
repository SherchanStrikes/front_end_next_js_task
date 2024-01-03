Start by installing all the dependencies with `npm install`, then run it with `npm run dev`.

Technologies: 
1. Tanstack/react-query for api fetching and search queries.
2. Bootstrap/React-bootstrap for styling.
3. Bootstrap icons/MUI icons for icons.
4. Context API
5. React-dom

How to start optimizing for performance:
1. `npm i next-sitemap` if you havent installed, but if alr done, `npm i`
2.  Create a next-sitemap.config.js.
3.  Add a script in your package.json inside scripts : `"postbuild": "next-sitemap"`
4.  `npm run postbuild` and see the new sitemap.xml files in your public folder.
5.  Configure your next-sitemap.config.js so the new robots.txt get url permissions.
6.  `npm run build` for the final step and watch how your entire application gets covered with sitemap.
7.  Deploy and test your Website and urls with PageSpeed Insights for SEO and performance optimization. 
    

 

