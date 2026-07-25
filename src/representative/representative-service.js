const fetch = require('node-fetch');
const config = require('../config');

const RepresentativeService = {
  getReps(address) {
    const params = new URLSearchParams({ 
      q: address, 
      fields: 'cd',
      api_key: config.GEOCODE_REPRESENTATIVE_LOOKUP_KEY,
    });

    return fetch(
      `${config.GEOCODE_API_URL}?${params.toString()}`
    )
      .then(res => {
        return res.json();
      })
  },

  imagesMap(images) {
    let imgArr = images.map(img => {
      const nameArr = img.name.split(' ');
      const lastname = nameArr[nameArr.length-1];
      return {lastname, photoUrl: img.photoUrl};
    });
    return imgArr;
  }
};

module.exports = RepresentativeService;
