<template>
    <BaseDropdown :options="dropdownOptions" @select="setSelectedSortOption" />
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import BaseDropdown from '@/components/BaseDropdown.vue'

const productsStore = useProductsStore()

const dropdownOptions = [
    {
        value: 'asc',
        text: 'Najtańsze',
    },
    {
        value: 'desc',
        text: 'Najdroższe',
    },
]
const setSelectedSortOption = (value: string) => {
    switch (value) {
        case 'desc':
            productsStore.setSortBy(value)
            break

        case 'asc':
            productsStore.setSortBy(value)
            break

        default:
            console.warn('Unknown value in selectedSortOption', value)
            break
    }
}
</script>
