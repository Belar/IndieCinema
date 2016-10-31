# IndieCinema

IndieCinema is a web application that builds a grid of Vimeo videos based on given channels.

Check it out online: [IndieCinema](https://indiecinema.belardesign.com/)

Features:

- predefined and custom channels (groups)
- grid view
- pop-up (modal) with embed and information about video
- channel management
- infinite scrolling (+ scrollToTop)
- sorting

## Technology

Front-end: [VueJS](https://vuejs.org)  
API: [HapiJS](https://hapijs.com/)  
Setup: [Hapi Vue](https://github.com/Belar/hapi-vue)  

### Run Dev

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000 (with proxy at localhost:4000)
npm run dev
```

### Build and Run Production

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run application at localhost:3000
node app.js
```
