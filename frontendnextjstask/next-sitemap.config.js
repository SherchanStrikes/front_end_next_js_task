const siteUrl = "https://front-end-next-js-task-beige.vercel.app/";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
    ],
  },
};
