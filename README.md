# book_market

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Features 
➔ Products should display in a grid.
➔ Each book should show the image, name, price, stock, created date, author, genre, and
button to add to the cart.
◆ The created date should display in DD-MM-YYYY format.
◆ When the book is out of stock, add to cart button should be disabled.
◆ Price should be displayed in Rupee formatted, Rs.5,300
➔ Give the user the option to filter by a book’s genre and created year.
➔ The user can add up to 5 different books to the cart, but they can add the quantity of a
book until it runs out of stock.
◆ If the user tries to add more than 5 different books then it should show an alert.
◆ The cart should display on the right side of the screen.
◆ The cart should be in tabular form.
◆ The cart should contain the list of selected books, total amount, and total price
◆ Users can increase or decrease the number of books inside of cart section
◆ The total amount should be the total amount of the selected books
◆ The total price should be in Rupee formatted, Rs.5,300
Please use this api ‘ https://book-set-task.herokuapp.com/api/list_books ’ to fetch
the book list.
