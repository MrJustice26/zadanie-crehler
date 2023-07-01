import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { Product, ProductsPriceOrder } from '@/types/stores'

export const useProductsStore = defineStore('products', () => {
    const sortOptions = [
        {
            value: 'asc',
            text: 'Najtańsze',
        },
        {
            value: 'desc',
            text: 'Najdroższe',
        },
    ]
    const sortBy = ref<ProductsPriceOrder>('asc')
    const productSearchKeyword = ref('')
    const products = ref<Product[]>([])

    const computedPriceOrder = computed(() => {
        return `price-${sortBy.value}`
    })

    const isProductsFetching = ref(false)

    const baseURL = import.meta.env.VITE_STORE_API_URL
    const headersConfig = {
        'sw-access-key': import.meta.env.VITE_SW_ACCESS_KEY,
        'Content-Type': 'application/json',
    }

    const setProductSearchKeyword = (searchTerm: string) => {
        productSearchKeyword.value = searchTerm
    }

    watch([sortBy, productSearchKeyword], () => {
        updateProductsList()
    })

    const getProductsByDefaultCategoryId = async () => {
        const defaultCategoryId = 'e435c9763b0d44fcab67ea1c0fdb3fa0'

        const bodyPayload = {
            order: computedPriceOrder.value,
        }

        const response = await fetch(`${baseURL}/product-listing/${defaultCategoryId}`, {
            headers: headersConfig,
            method: 'POST',
            body: JSON.stringify(bodyPayload),
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
            order: computedPriceOrder.value,
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

    const updateProductsList = async () => {
        let receivedProducts
        isProductsFetching.value = true
        if (!productSearchKeyword.value) {
            receivedProducts = await getProductsByDefaultCategoryId()
        } else {
            receivedProducts = await getProductsByKeyword(productSearchKeyword.value)
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
        setProductSearchKeyword,
        sortBy,
        sortOptions,
        products,
        isFetching: isProductsFetching,
        updateProductsList,
    }
})
