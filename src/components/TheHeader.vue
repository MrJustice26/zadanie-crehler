<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <h5 class="navbar-brand fw-bold mb-0">Shopware listing</h5>
            <ProductSortDropdown />
        </div>
    </nav>
</template>

<script setup lang="ts">
import ProductSortDropdown from '@/components/ProductSortDropdown.vue'
</script>
