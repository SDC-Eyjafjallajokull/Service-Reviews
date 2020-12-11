import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 225 },
    { duration: '59s', target: 225 },
    // { duration: '1s', target: 1 },
  ],
  // vus: 125,
  // duration: '1m',
};

export default function () {
  let product = Math.floor(Math.random() * (10000000 - 0) + 0);
  http.get(`http://localhost:3001/api/products/${product}`);
  // sleep(1);
}
