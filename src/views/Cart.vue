<template>
    <section class="text-gray-600 body-font">
      <div class="container px-5 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Cart</h1>
        </div>
        <div class="lg:w-2/3 w-full mx-auto overflow-auto">
          <table class="table-auto w-full text-left whitespace-no-wrap border">
            <thead>
            <tr>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product</th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity</th>
              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in cartData" :key="product.id">
              <td class="border px-4 py-3">
                <img alt="ecommerce" class="object-cover object-center w-40 h-40 block" :src="product.image">
              </td>
              <td class="border px-4 py-3">{{product ["name "]}}</td>
              <td class="border px-4 py-3">
                <input min="1" type="number" @input="updateCart(product)" v-model="product.quantity" class="shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                </td>
              <td class="border px-4 py-3 text-lg text-gray-900">RS. {{(product.quantity * product.price).toFixed(2)}}</td>
            </tr>
            <tr >
              <td class=" border px-4 py-3"></td>
              <td class=" border px-4 py-3 text-lg text-gray-900">Total</td>
              <td class=" border px-4 py-3 text-lg text-gray-900">{{cartCount}}</td>
              <td class=" border px-4 py-3 text-lg text-gray-900">RS. {{getCartTotalAmount}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="flex pl-4 mt-4 lg:w-2/3   w-full mx-auto">
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Continue</button>
        </div>
      </div>
    </section>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      cartData:this.$store.getters["cart/getCartData"]
    }
  },
  computed: {
    cartCount(){
      return this.$store.getters["cart/getTotalCartCount"]
    },
    getCartTotalAmount(){
      return this.$store.getters["cart/getCartTotalAmount"]
    }
  },

  methods: {
    async updateCart(cartItem){
      if(cartItem.stock < cartItem.quantity) {
        cartItem.quantity = cartItem.stock
        this.$notify({type: "error", text:"Out of stock."});
      }else{
        await this.$store.dispatch("cart/updateCart",cartItem)
        this.$notify({type: "success", text:"Item Updated to cart"});

      }
    }
  }
}
</script>