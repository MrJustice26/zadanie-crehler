import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Product, ProductsPriceOrder } from '@/types/stores'

export const useProductsStore = defineStore('products', () => {
    const sortBy = ref<null | ProductsPriceOrder>(null)
    const products = ref<Product[]>([])

    const isProductsFetching = ref(false)

    const baseURL = import.meta.env.VITE_STORE_API_URL
    const headersConfig = {
        'sw-access-key': import.meta.env.VITE_SW_ACCESS_KEY,
        'Content-Type': 'application/json',
    }

    const setSortBy = (desiredSortBy: ProductsPriceOrder) => {
        sortBy.value = desiredSortBy
    }

    const sortedProducts = computed(() => {
        if (!sortBy.value) return products.value

        switch (sortBy.value) {
            case 'ascending':
                return products.value.sort((productA, productB) => productA.price - productB.price)

            case 'descending':
                return products.value.sort((productA, productB) => productB.price - productA.price)

            default:
                return products.value
        }
    })

    const getProducts = async () => {
        const defaultCategoryId = 'e435c9763b0d44fcab67ea1c0fdb3fa0'

        const response = await fetch(`${baseURL}/product-listing/${defaultCategoryId}`, {
            headers: headersConfig,
            method: 'POST',
            body: JSON.stringify({}),
        })

        if (!response?.ok) {
            console.error('Error on getting default products')
        }

        const data = await response.json()
        return data
    }

    const getProductsByKeyword = async (keyword: string) => {
        const bodyPayload = {
            search: keyword,
        }

        const response = await fetch(`${baseURL}/search`, {
            headers: headersConfig,
            method: 'POST',
            body: JSON.stringify(bodyPayload),
        })

        if (!response?.ok) {
            console.error('Error on getting products by keyword')
        }

        const data = await response.json()
        return data
    }

    const adaptReceivedProducts = (productsArray: any[]) => {
        return productsArray.map((product: any) => {
            return {
                price: parseFloat(product?.calculatedPrice?.unitPrice),
                title: product?.translated?.name,
                description: product?.translated?.description,
            }
        })
    }

    const updateProductsList = async (inputText: string) => {
        let receivedProducts
        isProductsFetching.value = true
        if (!inputText) {
            receivedProducts = await getProducts()
        } else {
            receivedProducts = await getProductsByKeyword(inputText)
        }

        if (!receivedProducts) return

        if (!receivedProducts?.elements) {
            console.log('There are no elements to receive, wrapping up...')
            products.value = []
            return
        }
        const adaptedProducts = adaptReceivedProducts(receivedProducts.elements)

        products.value = adaptedProducts
        isProductsFetching.value = false
    }

    return {
        updateProductsList,
        products: sortedProducts,
        setSortBy,
        isFetching: isProductsFetching,
    }
})
