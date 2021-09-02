<template>
  <section class="text-gray-600 px-4 body-font">
    <div class="w-full md:w-full px-3 mb-6 md:mb-0">
      <div class="relative">
        <div class="grid grid-cols-3 grid-flow-col gap-4">
          <select v-model="filter.genre" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option v-for="genre in genres" :key="genre">{{genre["genre"]}}</option>
          </select>
          <select v-model="filter.year" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option v-for="year in years" :key="year">{{year}}</option>
          </select>
          <button class="bg-purple-700 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded" @click="getFilterData">Filter</button>
        </div>
      </div>
    </div>
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full" v-for="product in productData" :key="product.id">
          <a class="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" class="object-cover object-center w-full h-full block" :src="product.image">
          </a>
          <div class="mt-4">
            <h2 class="text-gray-900 title-font text-lg font-medium">{{product["name "]}}</h2>
            <p class="mt-1"> RS. {{product.price}}</p>
            <p>
              {{ $moment(product.published_date).format("DD-MM-YYYY") }}
            </p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" @click="addToCart(product)" :disabled="product.stock_data===0?true:false">Add To Cart</button>
          </div>
        </div>
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
    return{
      filter:{
        genre:'Comedy',
        year:'2020'
      },
      years:["2017","2018","2019","2020","2021"],
      productData:[],
    }
  },
  computed: {
    filteredData () {
      return this.$store.getters["products/productData"]
    },
    genres(){
      return this.$store.getters["products/genres"]
    }
  },
  created() {
    this.getApiData()
  },
  watch:{
    "filteredData":{
      handler: function (val){
        if(val){
          this.productData =this.filteredData
        }
      },
      immediate:true
    }
  },
  methods: {
    async addToCart(cartItem){
      if(await this.$store.dispatch("cart/addToCart",cartItem)){
        this.$notify({type: "error", text:"Cant be added more than 5 books at a time"});
      }else{
        this.$notify({type: "success", text:"Item Added to cart"});
      }
    },
    getFilterData() {
      this.productData = this.filteredData.filter(response => {
          if(this.filter.genre || this.filter.year){
            return response.genre === this.filter.genre && this.$moment(response.published_date).format("YYYY") === this.filter.year
          }
        return response
      })
    },
    async getApiData() {
      this.$notify({type: "success", text:"Welcome To Book Market"});
      if(this.$store.getters["products/productData"].length === 0){
        await this.$store.dispatch("products/productData")
      }
    }
  }
}
</script>
