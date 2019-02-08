# **RESTAURANTS API**

## Back End

#### Endpoints:

1. Search by city:
	* /api/v1/search/city?={city}
	* Display name, address, city, state, etc.
	* Maybe links to a website or menu?
2. Search by name:
	* /api/v1/search/name?={name}
	* Display name, address, city, state, etc.
	* Maybe a default option to the nearest location? Would require geolocation.
3. CRUD routes do not affect the information received for each restaurant from the API. They only affect the user-specific information inputted for each restaurant.