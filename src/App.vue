<template>
    <TheHeader class="mb-5" />
    <main>
        <section>
            <div class="container d-flex justify-content-center">
                <SearchBar v-model="inputText" class="mb-5 w-sm-100 w-50" />
            </div>
        </section>
        <section>
            <div class="container mb-5">
                <ul v-if="!isDataFetching && products.length > 0" class="row gy-4">
                    <li v-for="(product, index) in products" :key="index" class="col-12 col-md-6 col-lg-4">
                        <ProductCard :title="product.title" :text="product.description" :price="product.price" />
                    </li>
                </ul>
                <div v-else-if="!isDataFetching && products.length === 0" class="text-center">
                    <h2>Niestety, nie znaleźliśmy żadnych produktów :(</h2>
                    <p>Spróbuj wpisać inne słowa</p>
                </div>
                <div v-else class="text-center">
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import SearchBar from './components/SearchBar.vue'
import ProductCard from './components/ProductCard.vue'
import { ref, watch, onMounted } from 'vue'
import { debounce } from '@/utils'
import { fetchService } from '@/services'

const inputText = ref('')
const isDataFetching = ref(false)

type Product = {
    title: string
    description: string
    price: number
}

const products = ref<Product[]>([])

watch(
    inputText,
    debounce(() => {
        updateProductsList()
    }, 300)
)

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
    isDataFetching.value = true
    if (!inputText.value) {
        receivedProducts = await fetchService.getProducts()
    } else {
        receivedProducts = await fetchService.getProductsByKeyword(inputText.value)
    }

    if (!receivedProducts) return

    if (!receivedProducts?.elements) {
        console.log('There are no elements to receive, wrapping up...')
        products.value = []
        return
    }
    const adaptedProducts = adaptReceivedProducts(receivedProducts.elements)

    products.value = adaptedProducts
    isDataFetching.value = false
}

onMounted(() => {
    updateProductsList()
})
</script>
