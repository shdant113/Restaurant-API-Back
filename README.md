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
3. Pull a random restaurant:
	* /api/v1/search/city?={city}
	* Out of the information rendered from the API, the app randomly picks one index to display.
	* If user presses "I don't like this one" button, the indexed result is removed from the data. The app randomly picks another index and generates the data.
4. User profiles:
	* Creating new restaurant adds the inputted information to user's saved restaurants list.
		* /api/v1/{userID}
	* Editing and updating a restaurant replaces the old information with the new inputted information on the user's saved restaurants list.
		* /api/v1/{usedID}/{this.state.toEdit.restaurantID}
	* Deleting a restaurant removes the restaurant from their saved restaurants list.
		* /api/v1/{userID}/{restaurantID}
5. CRUD routes do not affect the information received for each restaurant from the API. They only affect the user-specific information inputted for each restaurant.