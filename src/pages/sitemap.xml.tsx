import { GetServerSideProps } from 'next'

const Sitemap = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://ethfraudreport.com'
  
  // Define all static routes
  const staticPages = [
    '',
    '/check',
    '/report/new',
    '/reports',
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${page === '' ? '1.0' : '0.8'}</priority>
            </url>
          `
        })
        .join('')}
    </urlset>
  `
  
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()
  
  return {
    props: {},
  }
}

export default Sitemap