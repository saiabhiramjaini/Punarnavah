




# Client Structure

### Folder Structure

**Assets folder** - Contains all the images and animations used.   
**Components folder** - Contains reusable UI 
components.  
**Pages folder** - Contains the different route pages.  


### Routes

```
path="/" --> LandingPage
path="/home" --> HomePage

path="/signup" --> Signup
path="/signin" --> Signin
path="/forgotpassword" --> ForgotPassword 
path="/resetpassword" --> ResetPassword
path="/profile" --> ProfilePage

path="/upload-req" --> UploadReqPage
path="/waste-req" --> WasteReqPage
path="/waste-req-overview/:id" --> WasteReqOverviewPage
path="/contribution/:id" --> ContributionPage
path="/satisfied-waste/checkout/:id" --> SatisfiedWasteCheckOutPage  

path="/upload-innovative-prod" --> UploadInnovativeProdPage
path="/innovative-prods" --> InnovativeProds
path="/innovative-prod-overview/:id" --> InnovativeProdOverview
path="innovative-prod/checkout/:id" --> InnovativeProdCheckOutPage

path="/upload-bulk-waste" --> UploadBulkWastePage
path="/bulk-waste" --> BulkWastePage
path="/bulk-waste-overview/:id" --> BulkWasteOverviewPage
path="/bulk-waste/checkout/:id" --> BulkWasteCheckOutPage
```

## Pages

1. **Landing Page** (```/```)

- **Hero Section** : The page starts with a hero component that introduces "Punarnavah," with navigation buttons for home and signup. It includes a large title and slogan.
- **Key Features**: Displays four key features using FeatureCard components (e.g., "Artisans' Hub," "Waste Contribution"), each showcasing different functionalities and concepts of the platform.
- **Footer**:  Concludes with a footer containing social media icons (Twitter, Instagram, Facebook) and a call to action to sign up and contribute to the platform.

2. **Home Page** (```/home```)

- **Layout and Structure** : The HomePage consists of a navbar at the top and a layout with two columns of interactive images on either side of the central main image.
- **Navigation**: Each image button uses the useNavigate hook to route users to different pages (/waste-req, /innovative-prods, etc.) based on their interaction.
- **Reusability**: Common behavior for image buttons (hover effect, animations) is encapsulated with reusable motion components, reducing redundancy in the code.

3. **Sign-up Page** (```/signup```)

- **Form Handling**: Manages signup form state with useState for username, email, password, and confirm password fields.
- **API Integration**: Submits form data to the backend using axios and handles successful signup by saving the token in localStorage.
- **Reusability**: Implements modular, reusable components for improved code organization and maintainability.
- **Form Submission**: Includes a handleSubmit function that prevents default form submission, triggers API calls, and manages loading state.
- **Authentication**: Ensure that your backend API is set up to handle the signup request and return a token upon successful registration.

4. **Sign-in Page** (```/signin```)

- **Form Handling**: Manages signin form state with useState, capturing email and password input from the user.
- **API Integration**: Submits signin data to the backend using axios. On successful response (status === 201), the token is stored in localStorage, and the user is redirected to the /home page.
- **Navigation**: Utilizes useNavigate from react-router-dom to handle post-signin navigation.
- **Reusability**: Implements reusable components such as Heading, InputBox, Button, and TextLink to maintain clean and modular code.
- **Form Submission**: handleSubmit function manages form submission, updates loading state, and prevents default behavior on button click.

5. **Forget Password Page** (```/forget-password```)

- **Form Handling**: Manages the forgot password form state with useState, collecting the email input from the user.
- **API Integration**: Submits the email to the backend using axios to trigger a password reset. On successful response (status === 200), a success message is shown using toast notifications.
- **Loading State**: Tracks loading status during form submission, displaying "Submitting..." on the button while the request is in progress.
- **Reusability**: Uses reusable components such as SubHeading, InputBox, and Button to maintain modularity and clean code.

6. **Reset Password Page** (```/reset-password```)

- **Form Handling**: Manages form state with useState, capturing the user's new password and confirm password for resetting their account password.
- **API Integration**: Submits the new password to the backend using axios. Upon successful update, the user is redirected to the signin page with a success message displayed via toast notifications.
- **Navigation**: Uses useNavigate from react-router-dom to redirect the user to the signin page after a successful password reset.
- **Reusability**: Leverages reusable components like SubHeading, InputBox, and Button to maintain clean, modular code.
- **Form Submission**: The handleSubmit function handles form submission, updates loading state, and prevents default form behavior on button click.

7. **Profile Page** (```/profile```)

- **User Data Fetching**: Uses axios to fetch authenticated user data from the backend upon component mount with useEffect. If unauthorized, the user is redirected to the signin page.
- **State Management**: Manages state for user data, loading, error, and section toggles (open/close) using useState. Different sections of the profile (e.g., "Waste Requests", "Contributions") are toggleable.
- **Logout Functionality**: Provides a logout option that clears the token from localStorage and redirects the user to the signin page upon success.
- **Dynamic Section Rendering**: Renders various sections dynamically using a helper function renderSection, which displays relevant tables with the user’s data (like waste requests, contributions, etc.).
- **Conditional Actions**: Within specific sections like "Waste Requests," the component conditionally displays action buttons (e.g., Pay button for waste orders).

8. **Upload Request Page** (```/upload-req```)

- **State Management** : Utilizes useState to manage the waste request data (uploadReq), selected image, loading state, and error messages. The UploadWasteRequestType is used for type safety.
- **Image Upload**: Allows users to upload an image using the UploadImage component, storing the selected file in the state and uploading it to Cloudinary for storage.
- **Form Handling**: The form captures user input for waste request details (name, quantity, unit, price, and description) with validation, and submits the data to the backend API using Axios.

9. **Waste Request Page** (```/waste-req```)

- **State Management** : Utilizes useState to manage the data, search query, loading state, and error messages. The WasteRequestType is used for type safety.
- **Data Fetching**: On component mount, it fetches unsatisfied waste requests from the backend using Axios, handling loading and error states appropriately.
- **Search Functionality**: Implements a search bar to filter waste requests based on the user's input, updating the displayed cards dynamically.
- **Navigation**: Each card is clickable, navigating to a detailed overview page for the selected waste request using the handleCardClick function.

10. **Waste Request Overview Page** (```/waste-req-overview/:id```)

- **State Management** : Uses useState to manage the fetched waste request data (data), loading state (loading), and error messages (error). The WasteRequestType is leveraged for type safety.
- **Data Fetching**: Implements useEffect to fetch waste request details based on the id from the URL parameters. It handles the API call with Axios and manages loading and error states appropriately.

11. **Contribution Page** (```/contribution/:id```)

- **State Management** : The component manages its state with data for contribution details, loading to indicate submission status, and error to store error messages encountered during the process.
- **Data Handling**: It initializes wasteRequestId from URL parameters using useParams and updates the data state via the handleChange function, capturing user input for the contribution.
- **Form Submission**: The handleSubmit function performs an asynchronous API call to submit the contribution data. It includes error handling for unauthorized access and redirects the user upon successful submission.
- **Reusable Components**: The component utilizes reusable InputBox and Button components for consistent design and functionality, enhancing maintainability across the application.


12. **Satisfied Waste CheckOut Page** (```/satisfied-waste/checkout/:id```)

- **State Management** : The component maintains state for form data, including contact and address details, as well as loading and error states, to handle the submission process effectively.
- **Data Initialization**: It initializes satisfiedWasteReqId from URL parameters and retrieves item details like name, quantity, and price from the location state for the order summary.
- **Input Handling**: The handleInputChange function updates the form data as users fill in their contact and shipping information, ensuring real-time data binding with the input fields.
- **Order Calculation**: The total price is calculated based on the quantity and price of the item, with delivery charges set to zero, resulting in a grand total that is submitted with the order.
- **Form Submission**: The handleSubmit function sends the updated form data to the backend via a POST request. It includes error handling for unauthorized access and displays success or error messages accordingly.

13. **Upload Innovative Product Page** (```/upload-innovative-prod```)

- **State Management**: Handles state using useState to manage the product details (uploadReq), image file (selectedImg), loading state, and error messages.
- **Image Upload**: Uses the UploadImage component to select an image, which is then uploaded to Cloudinary. The uploaded image’s URL is stored in the form state (uploadReq.image).
- **Form Input Handling**: Captures user input through multiple form fields (e.g., InputBox, TextAreaBox, Dropdown) that update the state for product details like name, quantity, price, description, and materials used.
- **Form Submission**: On form submission, it uploads the image (if selected), prepares the product data, and sends it to the backend using axios to create a new product. Displays success or error messages using react-hot-toast.

14. **Innovative Products Page** (```/innovative-prods```)

- **Data Fetching** : Uses useEffect to fetch a list of innovative products from the backend (/api/v1/innovative-prod) via axios. The fetched data is stored in the data state.
- **State Management**: Manages states for product data (data), search query (searchQuery), loading (loading), and errors (error) using useState.
- **Search Functionality**: Implements a search feature where the data is filtered based on the user’s input in the SearchBar. The search filters products by name.
- **Navigation**: Displays a grid of Card components for each innovative product. Clicking a card navigates the user to a detailed product overview using React Router's useNavigate.

15. **Innovative Products Overview Page** (```innovative-prod-overview/:id```)

- **State Management**: Uses useState to manage data, loading, and error states, allowing for clear representation of the data-fetching process.
- **Data Fetching**: Utilizes useEffect to fetch product details from the backend API based on the id from the URL when the component mounts.
- **Responsive UI Layout**: Features a flexible layout with a product image on the left and details on the right, ensuring a user-friendly experience across devices.
- **Navigation and User Interaction**:Provides detailed product information and a "Buy Now" button for seamless navigation to the checkout page, enhancing user engagement.

16. **Innovative Products CheckOut Page** (```/innovative-prod/checkout/:id```)

- **State Management**: Utilizes React's useState to manage the form data for the checkout process, along with loading and error states to provide feedback during the submission.
- **Data Fetching**: Retrieves the product ID from the URL parameters and gets the product name and price from the navigation state, ensuring the correct product is processed during checkout.
- **Form Handling**: Implements an input change handler to update the state with user input and handles form submission by making a POST request to create a new order with the collected data.

17. **Upload Bulk Waste Page** (```/upload-bulk-waste```)

- **State Management** : The component maintains states for the upload request details, selected image file, loading status, and error messages, enabling efficient form handling and image uploading.
- **Image Handling**: The handleImageChange function captures the selected image file for upload, while uploadImage manages the asynchronous upload process to Cloudinary, returning the secure image URL.
- **Input Handling**: The handleInputChange function updates the component's state based on user inputs, converting numeric values for quantity and price to ensure proper data formatting.
- **Navigation**: On successful submission, a success notification is displayed, and the user is navigated to the profile page. Errors are handled gracefully with appropriate messages to enhance user feedback.
- **Form Submission**: The handleSubmit function processes form submissions, combines the upload request data with the uploaded image URL, and sends it to the backend via a POST request, including error handling for various scenarios.

18. **Bulk Waste Page** (```/bulk-waste```)

- **State Management** : The component manages four states: data for storing bulk waste items, searchQuery for user search input, loading to indicate data fetching status, and error to handle any errors encountered during API calls.
- **Data Fetching**: On component mount, the useEffect hook initiates an asynchronous function to fetch bulk waste data from the backend API. The fetched data is stored in the data state, while errors are caught and displayed as necessary.
- **Search Functionality**: The component includes a search bar that filters the displayed bulk waste items based on the user's input. The filtering is case-insensitive, enhancing user experience by allowing flexible searches.
- **Card Navigation**: Each bulk waste item is presented as a card. Clicking on a card navigates the user to a detailed overview page for that specific item, enhancing the usability and interactivity of the application.

19. **Bulk Waste Overview Page** (```/bulk-waste-overview/:id```)

- **State Management** : The component manages multiple state variables to handle bulk waste item details, loading status, and errors during API calls. Utilizing useState allows the UI to dynamically respond to changes in these states.
- **Data Fetching**: An asynchronous function within a useEffect hook fetches detailed information about a specific bulk waste item from the backend API using its ID from the URL parameters. The fetched data is stored in the data state, while any errors encountered are managed through the error state.
- **Navigation**: The component includes an "Order" button that navigates users to a checkout page for purchasing the bulk waste item. This button is only active when the item data is successfully fetched, enhancing usability and ensuring that users can only proceed with valid information.

20. **Bulk Waste CheckOut Page** (```/bulk-waste/checkout/:id```)

- **State Management** : The component uses the useState hook to manage state variables such as formData for user contact and shipping details, loading for submission status, and error for order placement issues. This allows the UI to dynamically react to user interactions and API responses.
- **Form Handling**: The form includes input fields for user details like phone number, address, city, state, and PIN code. The handleInputChange function updates the formData state as the user fills out the form, ensuring data accuracy.
- **Order Calculation**: The component calculates the total price for the order, including the bulk waste item price and delivery charges, displaying the grand total in the order summary section
- **Data Submission**: Upon form submission, an asynchronous function sends the order details to the backend API. If successful, a success message appears, and the user is redirected to the profile page. The component also manages various error scenarios, displaying appropriate messages and redirecting unauthorized users to the sign-in page.
