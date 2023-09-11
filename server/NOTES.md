## TODO
1. Nodemailer
2. Cloudinary account
3. Paystack
4. Google account

##
1. Register user
2. Login
3. Reset password
4. Oauth (Google)


4. Get tyres(all)
5. Add new product(tyre) ---admin role
6. Get tyre(by id)   ------admin role
7. update tyre       ------admin role
8. delete tyre       ------admin role

9. Place an order(POST)
10. Get all Orders of current user ---- by user
11. Get orders summary ---- admin role
12. Get OrderInfo ------ 
13. Delete Order ------
14. Update Order
15. Make payment (paystack)

// export const payOrderEmailTemplate = (order) => {
//   return `<h1>Thanks for shopping with us</h1>
//   <p>
//   Hi ${order.user.name},</p>
//   <p>We have finished processing your order.</p>
//   <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
//   <table>
//   <thead>
//   <tr>
//   <td><strong>Product</strong></td>
//   <td><strong>Quantity</strong></td>
//   <td><strong align="right">Price</strong></td>
//   </thead>
//   <tbody>
//   ${order.orderItems
//     .map(
//       (item) => `

//       <tr>
//     <td>${item.name}</td>
//     <td align="center">${item.quantity}</td>
//     <td align="right"> $${item.price.toFixed(2)}</td>
//     </tr>
//   `
//     )
//     .join('\n')}
//   </tbody>
//   <tfoot>
//   <tr>
//   <td colspan="2">Items Price:</td>
//   <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
//   </tr>
//   <tr>
//   <td colspan="2">Shipping Price:</td>
//   <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
//   </tr>
//   <tr>
//   <td colspan="2"><strong>Total Price:</strong></td>
//   <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
//   </tr>
//   <tr>
//   <td colspan="2">Payment Method:</td>
//   <td align="right">${order.paymentMethod}</td>
//   </tr>
//   </table>
//   <h2>Shipping address</h2>
//   ${order.shippingAddress.fullName},<br/>
//   ${order.shippingAddress.address},<br/>
//   ${order.shippingAddress.city},<br/>
//   ${order.shippingAddress.country},<br/>
//   ${order.shippingAddress.postalCode}<br/>
//   </p>
//   <hr/>
//   <p>
//   Thanks for shopping with us.
//   </p>
//   `;
// };




Use later for github actions


# # The name of the workflow. GitHub displays the names of your workflows under your repository's "Actions" tab. If you omit `name`, GitHub displays the workflow file path relative to the root of the repository.
# name: Node.js CI

# on:
#   push:
#     branches: [ master ]
#   pull_request:
#     branches: [ master ]

# #
# jobs:
#   build:

#     runs-on: ubuntu-latest

#     strategy:
#       matrix:
#         node-version: [14.x, 16.x, 18.x, 20.x]
# #
#     steps:
#       # This step uses the `actions/checkout` action to download a copy of your repository on the runner.
#       - uses: actions/checkout@v3
#       # This step uses the `actions/setup-node` action to set up Node.js for each version indicated by the `matrix.node-version` key above.
#       - name: Use Node.js ${{ matrix.node-version }}
#         uses: actions/setup-node@v3
#         with:
#           node-version: ${{ matrix.node-version }}
#       # This step runs `npm i` to install any dependencies listed in your `package.json` file.
#       - run: npm i
#       # This step runs the `build` script if there is one specified under the `scripts` key in your `package.json` file.
#       - run: npm run build --if-present
#       # This step runs the `test` script that is specified under the `scripts` key in your `package.json` file.
#       # - run: npm test
