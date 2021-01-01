## Set up
- check out repo
- Run yarn install (node 12 and above)
- Run yarn build
- Run yarn start


## Requirements

- [ ] Provide a new API endpoint which gets a product by its public id from our local database.
### Build new Product Service getProductById with input publicId of product
- [ ] Update the existing endpoint to get products by adding an **optional** category filter.
  - This endpoint should return filtered products from our database, not those from the external api.
### Modify getProduct accept filterQuery param with category name. Example http://localhost:4000/products?filterQuery={"category": "men clothing"} 
- [ ] Fix current issues when synchronizing products.
  - [ ] We want to make sure the process succeeds before sending a response.
### Create mongo cloud account. Connect to that cloud database. Modify syncProducts function to return true if it's able to all product or false if one of the products can't be sync to local
  - [ ] Make sure products are being upserted instead of recreated every time a sync happens.
### Create new function upsertProduct. It is able to create if the product is new and update if it is found in datatabase  
  - [ ] Update all existing properties when a synchronization happens. For some reason the image isn't being stored. Figure out why this is happening.
### Modify the syncFunction to use upsertProduct instead of using Create Product. Add missing image in product object   
- [ ] Check on **every product route** whether a custom HTTP header is provided.
  - The header key should be `BonsaiDeveloper` and have *your name* as its value.
### Create new middleware authentication function to verify header Request has the key `BonsaiDeveloper` with value 'thienle'   
- [ ] Provide extra product checks when performing **checkout**.
  - Make sure the product exists in our database.
### Create new function isProduct to check each product in shopping cart to be exists in local database.  
- [ ] Synchronize users only if they have an even id (0, 2, 4, ...).
  - Fetch only the first 8 users.
  - Use `fetchUserById` to make sure you fetch each user individually from the Fake Store API instead of fetching all users and filtering out those by their id.
### Create upsertUser function to upsert user into database. Create a syncUsers to sync even user to local database

## Unit Test
- Create Product
- Upsert Product
- Upsert User

