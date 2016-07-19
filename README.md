# IndieCinema

IndieCinema is a web application that builds better view for Vimeo videos from given channels.

Check it out online: [IndieCinema](https://indiecinema.belardesign.com/)

Features:

- predefined grid with videos from popular channels dedicated to independent film
- pop-up with embed and information about video
- custom channels
- channel management (hide, delete, refresh)

## Technology

Front-end: [VueJS](https://vuejs.org)<br>
API: [HapiJS](https://hapijs.com/)<br>
Setup: [Hapi Vue](https://github.com/Belar/hapi-vue-simple)

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
