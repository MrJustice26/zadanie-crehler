<template>
    <TheHeader class="mb-5" />
    <main>
        <section>
            <div class="container d-flex justify-content-center">
                <ProductSearchbar v-model="inputText" class="mb-5 w-sm-100 w-50" />
            </div>
        </section>
        <section class="bg-light">
            <div class="container py-5">
                <ul v-if="!productsStore.isFetching && productsStore.products.length > 0" class="row gy-4">
                    <li
                        v-for="(product, index) in productsStore.products"
                        :key="index"
                        class="col-12 col-md-6 col-lg-4"
                    >
                        <ProductCard :title="product.title" :text="product.description" :price="product.price" />
                    </li>
                </ul>
                <div v-else-if="!productsStore.isFetching && productsStore.products.length === 0" class="text-center">
                    <h2>Niestety, nie znaleźliśmy żadnych produktów :(</h2>
                    <p>Spróbuj wpisać inną nazwę</p>
                </div>
                <BaseGrowSpinner v-else class="text-center" />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import TheHeader from '@/components/TheHeader.vue'
import ProductSearchbar from '@/components/ProductSearchbar.vue'
import ProductCard from '@/components/ProductCard.vue'
import BaseGrowSpinner from '@/components/BaseGrowSpinner.vue'
import { debounce } from '@/utils'

const productsStore = useProductsStore()
const inputText = ref('')

watch(
    inputText,
    debounce(() => {
        productsStore.setProductSearchKeyword(inputText.value)
    }, 300)
)

onMounted(() => {
    productsStore.updateProductsList()
})
</script>
