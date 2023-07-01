<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <h5 class="navbar-brand fw-bold mb-2 mb-md-0">Shopware listing</h5>
            <BaseSelect
                v-model="productsStore.sortBy"
                class="w-100 w-sm-25 bg-dark text-white"
                :options="productsStore.sortOptions"
            />
        </div>
    </nav>
</template>

<script setup lang="ts">
import BaseSelect from './BaseSelect.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
</script>
