<template>
    <BaseDropdown :options="dropdownOptions" @select="setSelectedSortOption" />
</template>

<script setup lang="ts">
import BaseDropdown from './BaseDropdown.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const dropdownOptions = [
    {
        value: 'ascending',
        text: 'Najtańsze',
    },
    {
        value: 'descending',
        text: 'Najdroższe',
    },
]
const setSelectedSortOption = (value: string) => {
    switch (value) {
        case 'descending':
            productsStore.setSortBy(value)
            break

        case 'ascending':
            productsStore.setSortBy(value)
            break

        default:
            console.warn('Unknown value in selectedSortOption', value)
            break
    }
}
</script>
