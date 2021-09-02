import axios from "axios";

const state = () => ({
    productData:[],
    genres:[]
})

// getters
const getters = {
    productData(state){
        return state.productData
    },
    genres(state){
        return state.genres
    }
}

// mutations
const mutations = {
    setProducts(state,products){
        return state.productData = products
    },
    setGenres(state,genres){
        return state.genres = genres
    }
}
// actions
const actions = {
    productData({commit}){
        axios.get("https://book-set-task.herokuapp.com/api/list_books").then(response=> {
            let genres = []
            response.data.forEach(responseData=>{
                responseData.price = responseData.price.replace("$",'')
                responseData.price = parseFloat(responseData.price * 116).toFixed(2)
                genres.push((({ genre }) => ({ genre }))(responseData));
            })
            localStorage.setItem('products', JSON.stringify(response.data))
            commit('setProducts',response.data)
            commit('setGenres',[...new Set(genres.map(item => item.genre))])
        })
        },
        stockDecrement({state,commit},product){
            let data = state.productData.map(res=>{
                if(product.id===res.id){
                    res.stock_data=product.stock_data
                }
                return res
            })
            commit('setProducts',data)
        }
    }
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}