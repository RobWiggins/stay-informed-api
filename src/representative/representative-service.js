const fetch = require('node-fetch');
const config = require('../config');

const RepresentativeService = {
  getReps(address) {
    let congressionalDistrict = '';
    let stateCode;
    let districtCode;
    let districtObj;
    
    let params = new URLSearchParams({ q: address, fields: 'cd', api_key: process.env.GEOCODE_REPRESENTATIVE_LOOKUP_KEY });

    console.log('params.toString()', params.toString())

    return fetch(
      `${process.env.GEOCODE_API_URL}?${params.toString()}`
    )
      .then(res => {
        return res.json();
      })        
        // TODO remove comments
        // if(response.normalizedInput) {
        //   stateCode = response.normalizedInput.state.toLowerCase();

        //   Object.keys(response.divisions).forEach(item => {
        //     if (item.includes(`/state:${stateCode}/cd:`)) {
        //       districtCode = item.split(`/state:${stateCode}/cd:`)[1];
        //     }
        //   });
  
        //   districtObj = {
        //     state: stateCode,
        //     district: districtCode,
        //   };
        // }
        // // TODO remove
        // console.log('districtObj', districtObj);
        // return districtObj;
        // });
  },

  imagesMap(images){
    let imgArr = images.map(img => {
      const nameArr = img.name.split(' ');
      const lastname = nameArr[nameArr.length-1];
      return {lastname, photoUrl: img.photoUrl};
    });
    return imgArr;
  }
};

module.exports = RepresentativeService;
