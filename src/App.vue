<template>
    <TheHeader class="mb-5" />
    <main>
        <section>
            <div class="container d-flex justify-content-center">
                <ProductSearchbar v-model="inputText" class="mb-5 w-100 w-lg-50" />
            </div>
        </section>
        <section class="bg-light">
            <div class="container py-5">
                <ProductCardList
                    v-if="!productsStore.isFetching && productsStore.products.length > 0"
                    :products="productsStore.products"
                    class="row gy-4"
                />
                <ProductListIsEmptyFeedback
                    v-else-if="!productsStore.isFetching && productsStore.products.length === 0"
                    class="text-center"
                />
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
import ProductCardList from '@/components/ProductCardList.vue'
import BaseGrowSpinner from '@/components/BaseGrowSpinner.vue'
import ProductListIsEmptyFeedback from './components/ProductListIsEmptyFeedback.vue'
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
