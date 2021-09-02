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
            if(state.cartData.length >= 5){
                return true
            }
            cartItem.quantity = quantity
            cartItem.stock_data = cartItem.stock - cartItem.quantity
            commit('setCartData', cartItem)
            dispatch('products/stockDecrement',cartItem,{root:true})
        }else{
            state.cartData.map(res=>{
                if(res.id===cartItem.id) {
                    res.quantity += quantity
                    res.stock_data = res.stock - res.quantity
                }
            })
            console.log(cartItem)
            commit('updateCartData', state.cartData)
            dispatch('products/stockDecrement',cartItem,{root:true})
        }
        dispatch('calcualteCart')
         },
    calcualteCart({state,commit}){
        let totalQuantity =0
        let totalAmount = 0
        state.cartData.forEach(response=>{
            totalQuantity +=response.quantity
            totalAmount += parseFloat(response.price) * response.quantity
        })
        commit('setCartCount',totalQuantity)
        commit('setCartAmount',totalAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
    },
    updateCart({state,commit,dispatch},cartItem){
        if(cartItem.stock < cartItem.quantity){
           return true
        }else{
            state.cartData.map(res=>{
                if(res.id===cartItem.id) {
                    res.stock_data = res.stock - cartItem.quantity
                    res.quantity = cartItem.quantity
                }
            })
            commit('updateCartData', state.cartData)
            dispatch('products/stockDecrement',cartItem,{root:true})
            dispatch('calcualteCart')
        }

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}



