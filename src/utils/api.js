import axios from 'axios';
import JSOG from 'jsog';


export default axios.create({

  baseURL: 'http://192.168.2.65:8080',

  headers: { 'Access-Control-Allow-Origin': '*' },
  // auth: {
  //   username: 'ezpro@alphaclinicalsystems.com',
  //   password: 'Asdx#123',
  // },
  transformResponse: [].concat(
    axios.defaults.transformResponse,
    data => JSOG.decode(data),
  ),
});
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// aaxios.defaults.headers.common['Authorization'] = 'Basic ZXpwcm9AYWxwaGFjbGluaWNhbHN5c3RlbXMuY29tOkFzZHgjMTIz';
// Authorization: 'Basic ZXpwcm9AYWxwaGFjbGluaWNhbHN5c3RlbXMuY29tOkFzZHgjMTIz'
