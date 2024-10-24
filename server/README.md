
## Auth Routes

### Signup Route

- Path - `/api/v1/auth/signup`
- Method - `POST`
- Body : 
```json
{
    "username": "abhiram",
    "email": "abhiramjaini28@gmail.com",
    "password": "12345678",
    "cPassword": "12345678"
}
```
- response -
```json
{
    "message": "User created Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJ1c2VySWQiOiJjbTJtZ2wxOHIwMDAzenU2YnNlcDhtYzgyIiwiaWF0IjoxNzI5NzIzMjg2LCJleHAiOjE3Mjk4MDk2ODZ9.
    xx9gxEM4BSG3Xdu3LDD2743GRhkRFpgPL3mBCbOwVY4"
}
```


### Signin Route

- Path - `api/v1/auth/signin`
- Method - `POST`
- Body:
  ```json
  {
      "email": "user@example.com",
      "password": "password123"
  }
  ```
- Response:
     ```json
     {
         "message": "Signin successful",
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
         eyJ1c2VySWQiOiJjbTJtZ2wxOHIwMDAzenU2YnNlcDhtYzgyIiwiaWF0IjoxNzI5NzIzMjg2LCJleHAiOjE3Mjk4MDk2ODZ9.
         xx9gxEM4BSG3Xdu3LDD2743GRhkRFpgPL3mBCbOwVY4"
     }
     ```


### Forgot Password Route

- Path - `.api/v1/auth/forgotPassword`
- Method - `POST`
- Body:
  ```json
  {
      "email": "user@example.com"
  }
  ```
- Response:
  ```json
  {
      "msg": "Email sent successfully"
  }
  ```



### Reset Password Route

- Path - `/api/v1/auth/resetPassword`
- Method - `POST`
- Body: 
  ```json
  {
      "password": "newpassword123",
      "cPassword": "newpassword123"
  }
  ```
- Response:
  ```json
  {
      "msg": "Password updated successfully",
      "user": {
          "id": "userId123",
          "username": "user123",
          "email": "user@example.com"
      }
  }
  ```

### Logout Route

- Path - `/api/v1/auth/logout`
- Method - `POST`
- Response:
  ```json
  {
      "msg": "Logged out successfully"
  }
  ```

## User Routes

### Get User Info Route

- **Path**: `/api/v1/user-info`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "message": "User details fetched successfully",
        "validatedUserData": {
            // User object details including waste requests, contributions, and products
        }
    }
    ```

## Waste Request Controllers

### Upload Waste Request Route

- **Path**: `/api/v1/waste-requests`
- **Method**: `POST`

- **Request Body**:
  ```json
  {
      "image": "image_url",
      "name": "Waste Request Name",
      "description": "Description of the waste request",
      "requiredQuantity": 10, 
      "remainingQuantity": 5, 
      "quantityUnit": "kg", 
      "price": 100.0 
  }
  ```

- **Response**:
    ```json
    {
        "message": "Successfully Uploaded!",
        "newWasteRequest": {
            // New waste request object details
        }
    }
    ```

### Get Waste Requests Route

- **Path**: `/api/v1/waste-requests`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "wasteRequests": [
            {
                // Waste request object details
            },
            // More waste requests
        ]
    }
    ```

### Get Waste Request by ID Route

- **Path**: `/api/v1/waste-requests/:id`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "wasteRequest": {
            // Waste request object details
        }
    }
    ```

### Get Unsatisfied Waste Requests Route

- **Path**: `/api/v1/waste-requests/unsatisfied`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "unsatisfiedRequests": [
            {
                // Unsatisfied waste request object details
            }
        ]
    }
    ```

### Get Satisfied Waste Requests Route

- **Path**: `/api/v1/waste-requests/satisfied`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "unsatisfiedRequests": [
            {
                // Satisfied waste request object details
            }
        ]
    }
    ```


## Contribute Route

- **Path**: `/api/v1/waste-requests/:wasteRequestId/contribute`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "mobile": "1234567890",
      "address": "123 Main St",
      "city": "CityName",
      "state": "StateName",
      "pincode": "123456",
      "quantity": 5
  }
  ```
- **Response**:
    ```json
    {
        "message": "Contribution added successfully!",
        "newContribute": {
            // New contribution object
        },
        "updatedRequest": {
            // Updated waste request object with remaining quantity
        }
    }
    ```


## Satisfied Waste Orders Routes

### Create Satisfied Order Route

- **Path**: `/api/v1/satisfied-orders`
- **Method**: `POST`

- **Request Body**:
  ```json
  {
      "satisfiedWasteReqId": "string",
      "amount": "number",              
      "mobile": "string",               
      "address": "string",              
      "city": "string",                 
      "state": "string",                
      "pincode": "string"              
  }
  ```

- **Response**:
    ```json
    {
        "message": "Ordered Successfully!!",
        "newOrder": {
            // Details of the newly created order
        }
    }
    ```

### Get Satisfied Orders Route

- **Path**: `/api/v1/satisfied-orders`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "message": "All Orders fetched successfully!",
        "validatedOrders": [
            {
                // Details of each satisfied order
            }
        ]
    }
    ```

### Get Satisfied Order By ID Route

- **Path**: `/api/v1/satisfied-orders/:id`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "message": "Order fetched successfully!",
        "validatedOrder": {
            // Details of the satisfied order
        }
    }
    ```


### Update Satisfied Order Route

- **Path**: `/api/v1/satisfied-orders/:id`
- **Method**: `PUT`

- **Request Body**:
  ```json
  {
      "status": "new status" 
  }
  ```

- **Response**:
    ```json
    {
        "message": "Status Changed Successfully!",
        "validatedOrder": {
            // Updated order object details
        }
    }
    

  
## Innovative Product Controllers

### Upload Innovative Product Route

- **Path**: `/api/v1/innovative-products`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "image": "url_to_image", 
      "name": "Product Name", 
      "description": "Product Description", 
      "price": 100.00,
      "quantity": 10, 
      "materialsUsed": "Materials used in the product" 
  }
  ```

- **Response**:
    ```json
    {
        "message": "Product Uploaded successfully!!",
        "newProduct": {
            // Newly created product object details
        }
    }
    ```

### Get Innovative Products Route

- **Path**: `/api/v1/innovative-products`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "message": "All Products are",
        "validatedProducts": [
            {
                // Details of each innovative product
            }
        ]
    }
    ```

### Get Innovative Product by ID Route

- **Path**: `/api/v1/innovative-products/:id`
- **Method**: `GET`

- **Response**:
    ```json
    {
        "message": "Innovative Product Fetched Successfully",
        "validatedProd": {
            // Details of the innovative product
        }
    }
    ```




## Innovative Product Orders Routes

### Create Innovative Order Route

- **Path**: `/api/v1/innovative-orders`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "innovativeProductId": "12345",
      "amount": 100.00,
      "mobile": "1234567890",
      "address": "123 Main St",
      "city": "CityName",
      "state": "StateName",
      "pincode": "123456"
  }
  ```
- **Response**:
    ```json
    {
        "message": "Ordered Successfully!!",
        "newOrder": {
            // New order object details
        },
        "updatedProduct": {
            // Updated product object details
        }
    }
    ```

### Get Innovative Orders Route

- **Path**: `/api/v1/innovative-orders`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "All Orders fetched successfully!",
        "validatedOrders": [
            {
                // Order object details
            },
            {
                // Order object details
            }
            // Additional orders...
        ]
    }
    ```

### Get Innovative Order by ID Route

- **Path**: `/api/v1/innovative-orders/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "Order fetched successfully!",
        "validatedOrder": {
            // Order object details
        }
    }
    ```

### Update Innovative Order Route

- **Path**: `/api/v1/innovative-orders/:id`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
      "status": "new status" 
  }
    ```









## BulkWaste Routes

### Upload Bulk Waste Route

- **Path**: `/api/v1/waste/upload`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "image": "string", 
      "name": "string", 
      "description": "string",
      "price": "number",              
      "quantityAvailable": "number",   
      "quantityUnit": "string"        
  }
  ```
- **Response**:
    ```json
    {
        "message": "Waste Uploaded Successfully!!",
        "newBulkWaste": {
            // Object containing details of the newly created bulk waste
        }
    }
    ```
    
### Get Bulk Waste Route

- **Path**: `/api/v1/waste`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "Wastes received Successfully!",
        "validatedWaste": [
            // Array of bulk waste objects
        ]
    }
    ```

### Get Bulk Waste By ID Route

- **Path**: `/api/v1/waste/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "Successfully retrieved Waste",
        "validatedWaste": {
            // Bulk waste object
        }
    }
    ```

## BulkWasteOrders Routes

### Create Bulk Waste Order Route

- **Path**: `/api/v1/orders/bulk-waste`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "bulkWasteId": "string",
      "amount": "number",
      "mobile": "string",
      "address": "string",
      "city": "string",
      "state": "string",
      "pincode": "string"
  }
  ```
- **Response**:
    ```json
    {
        "message": "Ordered Successfully!!",
        "newOrder": {
            // Order object
        },
        "updatedBulkWaste": {
            // Updated bulk waste object
        }
    }
    ```

### Get Bulk Waste Orders Route

- **Path**: `/api/v1/orders/bulk-waste`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "All Orders fetched successfully!",
        "validatedOrders": [
            // Array of order objects
        ]
    }
    ```

### Get Bulk Waste Order by ID Route

- **Path**: `/api/v1/orders/bulk-waste/:id`
- **Method**: `GET`
- **Response**:
    ```json
    {
        "message": "Order fetched successfully!",
        "validatedOrder": {
            // Order object
        }
    }
    ```

### Update Bulk Waste Order Route

- **Path**: `/api/v1/orders/bulk-waste/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
      "status": "newStatus"  
  }
  ```
- **Response**:
    ```json
    {
        "message": "Status Changed Successfully!",
        "validatedOrder": {
            // Updated order object
        }
    }
    ```