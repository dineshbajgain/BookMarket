const state = () => ({
    cartCount: 0,
    cartTotalAmount: 0,
    wishlistCount: 0,
    cartData: []
})

// getters
const getters = {
    getTotalCartCount (state) {
        return state.cartCount
    },
    getCartData (state) {
        return state.cartData
    },
    getCartTotalAmount (state) {
        return state.cartTotalAmount
    }
}

// mutations
const mutations = {
    setCartData (state, cartItem) {
        state.cartData.push(cartItem)
    },
    updateCartData (state, cartItem) {
        state.cartData = cartItem
    },
    setCartCount (state, cartCount) {
        state.cartCount = cartCount
    },
    setCartAmount (state, totalAmount) {
        state.cartTotalAmount = totalAmount
    },
}

// actions
const actions = {
    addToCart({commit,state,dispatch},cartItem,quantity=1) {
        if(!state.cartData.find(res=>res.id===cartItem.id)){
            cartItem.quantity = quantity
            cartItem.stock -= quantity
            commit('setCartData', cartItem)
            dispatch('products/stockDecrement',quantity,{root:true})
        }else{
            state.cartData.map(res=>{
                if(res.id===cartItem.id) {
                    res.stock -= quantity
                    res.quantity += quantity
                }
            })
            commit('updateCartData', state.cartData)
            dispatch('products/stockDecrement',cartItem,{root:true})
        }
        let totalQuantity =0
        let totalAmount = 0
        state.cartData.forEach(response=>{
            totalQuantity +=response.quantity
            totalAmount += parseFloat(response.price) * response.quantity
        })
        commit('setCartCount',totalQuantity)
        commit('setCartAmount',totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}