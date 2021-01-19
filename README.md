### Warehouse Application

### Table of contents
* [Description](#description)
* [Demo](#demo)
* [Caching](#caching)
* [API bug workaround](#api-bug-workaround)

### Description
This is a web application for viewing information about three kinds of products - gloves, beanies and facemasks - in a warehouse.

### Demo
The application is deployed to Heroku and can be accessed by the following link:  
[https://nameless-sierra-57591.herokuapp.com/](https://nameless-sierra-57591.herokuapp.com/)

### Caching
To boost the performance, caching was implemented on the backend.
On application startup, only the general information for products is retrieved.
Then, when user wants to see the details of a product and its availability in stock, application makes
an API call for the corresponding manufacturer and caches all the values for its products.
It may take some time, but after that availability information about the products of the same manufacturer
will be available much faster.

Cached values are saved for 5 minutes, as remote API also has a cache for 5 minutes only.

### API bug workaround
One of the APIs contains an intentional bug - sometimes instead of array of objects it returns a string "[]".
If that happens, application will continue making API calls until an array of objects is returned.