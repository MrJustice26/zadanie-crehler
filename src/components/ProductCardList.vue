<template>
    <ul class="row gy-4">
        <li v-for="(product, index) in products" :key="index" class="col-12 col-md-6 col-lg-4">
            <ProductCard :title="product.title" :description="product.description" :price="product.price" />
        </li>
    </ul>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import { ProductCardList } from '@/types/components'
defineProps<ProductCardList>()
</script>
