# Types of Testing

Now that we understand what testing is and why it's important, let's explore the different types of testing you'll encounter in web development. Understanding these testing types will help you create a comprehensive testing strategy for your projects.

## 2.1 Functional Testing

Functional testing focuses on testing the functionality of your application against the requirements. It answers the question: "Does the application do what it's supposed to do?"

### Unit Testing

Unit testing is the practice of testing individual components or functions in isolation. Think of it as testing the smallest "units" of your code.

**Example**: Let's say you have a function that validates email addresses:

```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

A unit test for this function might look like:

```javascript
function testValidateEmail() {
  console.log("Testing email validation...");
  
  // Valid email formats
  if (!validateEmail("user@example.com")) {
    console.error("Failed: user@example.com should be valid");
  }
  
  if (!validateEmail("name.surname@domain.co.uk")) {
    console.error("Failed: name.surname@domain.co.uk should be valid");
  }
  
  // Invalid email formats
  if (validateEmail("user@")) {
    console.error("Failed: user@ should be invalid");
  }
  
  if (validateEmail("@example.com")) {
    console.error("Failed: @example.com should be invalid");
  }
  
  if (validateEmail("user@example")) {
    console.error("Failed: user@example should be invalid");
  }
  
  if (validateEmail("user example.com")) {
    console.error("Failed: user example.com should be invalid");
  }
  
  console.log("Email validation tests completed");
}

testValidateEmail();
```

**Key characteristics of unit testing:**
- Tests one piece of code in isolation
- Should be fast to run
- Helps identify where exactly a problem is occurring
- Makes code more maintainable and easier to refactor

**Common mistakes in unit testing:**
1. Testing multiple things in one test
2. Writing tests that depend on external resources (like databases or APIs)
3. Not testing edge cases (empty strings, null values, etc.)
4. Writing tests that are too closely tied to implementation details

**Tools for unit testing in JavaScript:**
- Jest
- Mocha
- Jasmine
- QUnit

### Integration Testing

Integration testing verifies that different units or components work together correctly. While unit tests check individual pieces in isolation, integration tests check how they interact.

**Example**: Let's say you have a shopping cart module that depends on a product catalog module:

```javascript
// productCatalog.js
const productCatalog = {
  getProduct: function(id) {
    // In a real app, this might fetch from an API or database
    const products = {
      1: { id: 1, name: "Laptop", price: 999.99 },
      2: { id: 2, name: "Smartphone", price: 699.99 },
      3: { id: 3, name: "Headphones", price: 149.99 }
    };
    return products[id];
  }
};

// shoppingCart.js
const shoppingCart = {
  items: [],
  
  addItem: function(productId, quantity = 1) {
    const product = productCatalog.getProduct(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    
    this.items.push({
      product: product,
      quantity: quantity
    });
    
    return this.items;
  },
  
  getTotal: function() {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },
  
  clear: function() {
    this.items = [];
  }
};
```

An integration test might look like:

```javascript
function testShoppingCartIntegration() {
  console.log("Testing shopping cart integration...");
  
  // Clear the cart before testing
  shoppingCart.clear();
  
  // Test adding a product to the cart
  shoppingCart.addItem(1, 2); // Add 2 laptops
  
  // Check if the product was correctly added
  if (shoppingCart.items.length !== 1) {
    console.error("Failed: Cart should have 1 item type");
  }
  
  if (shoppingCart.items[0].product.name !== "Laptop") {
    console.error("Failed: Product name should be 'Laptop'");
  }
  
  if (shoppingCart.items[0].quantity !== 2) {
    console.error("Failed: Quantity should be 2");
  }
  
  // Test adding another product
  shoppingCart.addItem(3, 1); // Add 1 headphones
  
  // Check if the total is calculated correctly
  const expectedTotal = (999.99 * 2) + 149.99;
  const actualTotal = shoppingCart.getTotal();
  
  if (Math.abs(actualTotal - expectedTotal) > 0.001) {
    console.error(`Failed: Total should be ${expectedTotal}, got ${actualTotal}`);
  }
  
  // Test error handling
  try {
    shoppingCart.addItem(999); // Non-existent product ID
    console.error("Failed: Adding non-existent product should throw an error");
  } catch (error) {
    console.log("Passed: Error thrown for non-existent product");
  }
  
  console.log("Shopping cart integration tests completed");
}

testShoppingCartIntegration();
```

**Key characteristics of integration testing:**
- Tests how components work together
- May involve multiple modules or systems
- Can catch issues that unit tests miss, like incompatible interfaces
- Usually slower than unit tests

**Common integration testing challenges:**
1. Determining the scope of the integration (how many components to include)
2. Setting up test environments with all necessary dependencies
3. Handling external services (APIs, databases)
4. Debugging failures (which component caused the issue?)

### System Testing

System testing evaluates the complete, integrated system to verify that it meets the specified requirements. It tests the application as a whole, from end to end.

**Example**: For a web application, system testing might involve:
- Testing the entire user flow from registration to checkout
- Verifying that all pages load correctly
- Ensuring data is saved and retrieved properly
- Checking that emails are sent when expected

System testing for a web application often involves browser automation tools like Selenium, Cypress, or Puppeteer. Here's a simple example using Cypress (we'll cover Cypress in detail in our next session):

```javascript
// In a Cypress test file
describe('E-commerce Website', () => {
  it('should allow a user to add items to cart and checkout', () => {
    // Visit the homepage
    cy.visit('https://mywebshop.com');
    
    // Search for a product
    cy.get('#search').type('laptop');
    cy.get('#search-button').click();
    
    // Add the first product to the cart
    cy.get('.product-card').first().find('.add-to-cart').click();
    
    // Go to the cart
    cy.get('#cart-icon').click();
    
    // Verify the product is in the cart
    cy.get('.cart-item').should('have.length', 1);
    
    // Proceed to checkout
    cy.get('#checkout-button').click();
    
    // Fill in shipping information
    cy.get('#name').type('John Doe');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Anytown');
    cy.get('#zip').type('12345');
    cy.get('#email').type('john@example.com');
    
    // Submit the order
    cy.get('#place-order').click();
    
    // Verify order confirmation
    cy.get('.confirmation-message').should('contain', 'Thank you for your order');
  });
});
```

**Key characteristics of system testing:**
- Tests the entire application
- Verifies that all components work together correctly
- Focuses on the user's perspective
- Can catch integration issues and workflow problems

**Common system testing challenges:**
1. Setting up a complete test environment
2. Long execution times
3. Maintaining test data
4. Handling complex user flows
5. Dealing with asynchronous operations

### Acceptance Testing

Acceptance testing determines if the system satisfies the business requirements and if it's ready for delivery. This type of testing is often performed by end-users or clients.

**Example**: For a web application, acceptance criteria might include:
- Users can register and log in
- Users can search for products by name or category
- Users can add products to a shopping cart
- Users can check out and pay for their order
- Users can view their order history

Acceptance tests are often written in a more human-readable format, sometimes using frameworks like Cucumber that support Behavior-Driven Development (BDD):

```gherkin
Feature: Shopping Cart
  As a customer
  I want to add items to my cart
  So that I can purchase them

  Scenario: Add item to empty cart
    Given I am on the product page for "Laptop"
    When I click the "Add to Cart" button
    Then I should see "Item added to cart" message
    And the cart icon should show "1" item

  Scenario: Add multiple items to cart
    Given I have a "Laptop" in my cart
    When I add "Headphones" to my cart
    Then I should see "Item added to cart" message
    And the cart icon should show "2" items
```

**Key characteristics of acceptance testing:**
- Validates that the system meets business requirements
- Often involves end-users or stakeholders
- Focuses on user scenarios and workflows
- Can be manual or automated

**Common acceptance testing challenges:**
1. Getting stakeholder involvement
2. Defining clear acceptance criteria
3. Managing changing requirements
4. Balancing thoroughness with time constraints

## 2.2 Non-Functional Testing

While functional testing focuses on what the application does, non-functional testing focuses on how well it does it. This includes aspects like performance, security, usability, and compatibility.

### Performance Testing

Performance testing evaluates how a system performs under a particular workload. It helps identify bottlenecks, measure response times, and determine if the application meets performance requirements.

**Types of performance testing:**

1. **Load testing**: Tests how the system behaves under expected load
2. **Stress testing**: Tests how the system behaves under extreme load
3. **Endurance testing**: Tests how the system behaves over an extended period
4. **Spike testing**: Tests how the system responds to sudden increases in load

**Example**: Let's say you have an API endpoint that needs to handle 1000 requests per minute. You might use a tool like Apache JMeter or k6 to simulate this load:

```javascript
// Using k6 for load testing
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100, // 100 virtual users
  duration: '1m', // Test runs for 1 minute
};

export default function() {
  const res = http.get('https://api.mywebsite.com/products');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time  r.timings.duration  {
  const doc = getDocument(req.params.id);
  res.json(doc);
});

// Safer code
app.get('/api/documents/:id', (req, res) => {
  const userId = getUserIdFromSession(req);
  const doc = getDocument(req.params.id);
  
  if (doc.ownerId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  res.json(doc);
});
```

**Security testing approaches:**
- Static Application Security Testing (SAST): Analyzes source code for security vulnerabilities
- Dynamic Application Security Testing (DAST): Tests running applications for vulnerabilities
- Penetration Testing: Simulates attacks to identify vulnerabilities
- Security Code Review: Manual review of code for security issues

**Tools for security testing:**
- OWASP ZAP (Zed Attack Proxy)
- Burp Suite
- npm audit (for JavaScript projects)
- ESLint with security plugins

### Usability Testing

Usability testing evaluates how user-friendly an application is. It focuses on the user experience and helps identify issues that might frustrate or confuse users.

**Key aspects of usability testing:**
- Navigation: Can users find what they're looking for?
- Clarity: Are instructions and labels clear?
- Efficiency: Can users complete tasks quickly?
- Error handling: Are error messages helpful?
- Accessibility: Can all users, including those with disabilities, use the application?

**Example usability test scenario:**

Task: Ask a user to create an account and purchase a product on your e-commerce website.

Observations to make:
- Did the user struggle at any point?
- How long did it take to complete the task?
- Did the user make any errors?
- Did the user express frustration?
- Did the user need to ask for help?

**Usability testing methods:**
- Moderated testing: A facilitator guides users through tasks
- Unmoderated testing: Users complete tasks on their own
- A/B testing: Compare two versions of a design
- Heatmaps: Track where users click and how far they scroll

**Tools for usability testing:**
- Hotjar
- UserTesting
- Optimal Workshop
- Lookback

### Compatibility Testing

Compatibility testing ensures that your application works correctly across different environments, including different browsers, devices, operating systems, and screen sizes.

**Key aspects of compatibility testing:**
- Cross-browser compatibility
- Mobile responsiveness
- Operating system compatibility
- Different screen resolutions
- Different hardware configurations

**Example compatibility issues:**
- CSS properties that aren't supported in all browsers
- JavaScript APIs with varying browser support
- Different rendering engines interpreting CSS differently
- Touch interactions vs. mouse interactions
- Font rendering differences

**Strategies for compatibility testing:**
1. Define a browser/device support matrix
2. Use progressive enhancement
3. Test on real devices when possible
4. Use browser developer tools to simulate different devices
5. Use services like BrowserStack or Sauce Labs for access to multiple environments

**Example of feature detection for compatibility:**

```javascript
// Check if the Geolocation API is supported
if ('geolocation' in navigator) {
  // Geolocation is available
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log(`Location: ${lat}, ${lng}`);
  });
} else {
  // Geolocation is not available
  console.log('Geolocation is not supported by this browser');
  // Provide alternative functionality
}
```

## 2.3 Manual vs Automated Testing

Both manual and automated testing have their place in a comprehensive testing strategy. Let's explore the pros and cons of each approach and when to use them.

### Manual Testing

Manual testing involves human testers executing test cases without the use of automation tools.

**Pros of manual testing:**
1. **Flexibility**: Testers can adapt on the fly and explore unexpected paths
2. **Human intuition**: Testers can notice issues that automated tests might miss
3. **No coding required**: Anyone can perform manual testing
4. **Better for subjective evaluation**: Good for usability and visual testing
5. **Faster setup**: No need to write test scripts before testing

**Cons of manual testing:**
1. **Time-consuming**: Takes longer to execute tests manually
2. **Less repeatable**: Different testers might test differently
3. **Prone to human error**: Testers might miss steps or make mistakes
4. **Expensive for regression testing**: Repeating the same tests is inefficient
5. **Limited coverage**: Can only test so much in a given time

**When to use manual testing:**
- Exploratory testing (discovering unexpected issues)
- Usability testing (evaluating user experience)
- Visual testing (checking design and layout)
- Ad-hoc testing (quick tests without formal test cases)
- When automated testing would be too complex or time-consuming to set up

### Automated Testing

Automated testing uses scripts and tools to execute tests automatically.

**Pros of automated testing:**
1. **Efficiency**: Can run many tests quickly
2. **Repeatability**: Tests run the same way every time
3. **Regression testing**: Easy to rerun tests after changes
4. **Consistency**: No variation between test runs
5. **Coverage**: Can test more scenarios in less time
6. **Documentation**: Test scripts serve as documentation

**Cons of automated testing:**
1. **Initial investment**: Takes time to write and maintain test scripts
2. **Limited to what's programmed**: Only tests what it's told to test
3. **Technical skill required**: Requires programming knowledge
4. **Maintenance overhead**: Tests need updating when the application changes
5. **Can miss visual or UX issues**: Automated tests typically focus on functionality

**When to use automated testing:**
- Regression testing (ensuring existing functionality still works)
- Performance testing (testing under load)
- Repetitive tasks (login, form submission, etc.)
- Data-driven testing (testing with multiple data sets)
- Critical paths that must be tested frequently

### Finding the Right Balance

Most effective testing strategies combine both manual and automated testing. Here's a general approach:

1. **Automate the basics**: Login, navigation, form submission
2. **Automate repetitive tests**: Tests that run frequently
3. **Automate regression tests**: Ensure existing functionality continues to work
4. **Manual test new features**: Explore new functionality manually before automating
5. **Manual test user experience**: Evaluate usability, design, and overall experience

**Example testing matrix:**

| Test Type | Manual | Automated |
|-----------|--------|-----------|
| Unit Tests | ❌ | ✅ |
| Integration Tests | ❌ | ✅ |
| Functional Tests | ⚠️ (Initially) | ✅

