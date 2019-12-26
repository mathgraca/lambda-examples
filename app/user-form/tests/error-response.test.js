const jsonResponse = require('../error-response');

describe('jsonResponse', () => {
  it('responds with HTTP code 500', () => {
    const result = jsonResponse('body', 'origin');
    expect(result.statusCode).toEqual(500);
  });

  it('includes the CORS origin', () => {
    const result = jsonResponse('body', 'https://gojko.net');
    expect(result.headers['Access-Control-Allow-Origin'])
      .toEqual('https://gojko.net');
  });

  it('formats objects as JSON strings', () => {
    const result = jsonResponse({a: 11, b: {c: 1}});
    expect(result.body).toEqual('{"a":11,"b":{"c":1}}');
  });

  it('uses the JSON content type', () => {
    const result = jsonResponse('body', 'origin');
    expect(result.headers['Content-Type'])
      .toEqual('text/plain');
  });

});
