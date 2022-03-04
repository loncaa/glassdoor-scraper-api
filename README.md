**_GlassDoor CV Scraper_**
- use [POST] `api/scraper/glassdoor/userprofile` to scrape user profile information and retrieve scraper information
  - required body fields: `username`, `password`
- use [GET] `api/userprofile` to retrive user profile data
  - required query parameter: `u` as user `username`

**_Setup_**
- start `REDIS` instance
- create `.env` file and populate with required environment variables:
  - REDIS_URL=localhost:6379
  - PORT=3001
- install dependencies and run server: `npm install` and `npm start`

**_Docker_**
- don't know how to dockerize `puppeteer`
