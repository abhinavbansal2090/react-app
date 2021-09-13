# TRACK-SA (Experience) App Website

Based od [CRA](https://github.com/facebook/create-react-app).

This website is used as `WebView` in `PaymentsScreen` (all types of user) and `BusinessScreen` (Experience Providers only). Also, is available as standalone website.

When opened from mobile in `WebView` tokens and other configs passes by injection of javascript and placed in cookies.

When opened from web then requires logging in and is available only for providers.

## Starting locally

### `yarn start`

Runs the app in the development mode.<br />

### Browser
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### From mobile app in WebView

When running from Mobile, then must provide `WEBSITE_LOCAL_URL` env according to output of `yarn start` script: `In your local network: 192.x.x.x.`

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Deployment:
Simply log in to `exp-app` AWS console and paste `build` files to appropriate `S3` bucket.
