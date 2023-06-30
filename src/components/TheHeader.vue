<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#">Shopware listing</a>
            <BaseDropdown :options="dropdownOptions" @select="setSelectedSortOption" />
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseDropdown from './BaseDropdown.vue'

const selectedSortOption = ref<string | null>(null)
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
    selectedSortOption.value = value
}
</script>
