import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

Given('that I am on the domain {string}', async function (urlPrefix) {
  this.setUrlPrefix(urlPrefix);
});

When('I visit the endpoint {string} {string}', async function (method, url) {
  await this.fetch(url, { method });
  // console.log('response:', this.response, '\nresponseTime:', this.responseTime, '\njson:', this.json);
});

Then('the status code of the response should be {float}', async function (statusCode) {
  expect(this.response.status).to.equal(statusCode);
});

Then('the response time should be below {float} milliseconds', async function (ms) {
  expect(this.responseTime).to.be.below(ms);
});

Then('there should be at least {float} main categories', async function (numberOfCategories) {
  expect(this.json.children.length).to.be.at.least(numberOfCategories);
  // store the category url parts for the next scenario (see usage in feature file)!
  this.categoryUrlParts = this.json.children.map(x => x.url);
});

Then('there should be at least {int} product in the category', async function (minimumNumberOfProducts) {
  expect(this.json.results.length).to.be.at.least(minimumNumberOfProducts);
});