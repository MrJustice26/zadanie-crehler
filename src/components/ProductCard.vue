<template>
    <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column justify-content-between">
            <div class="mb-2">
                <h5 class="card-title fw-bold">{{ title }}</h5>
                <p class="card-text">
                    {{ description }}
                </p>
            </div>
            <p class="mb-0"><b>Cena</b> {{ formatPrice }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ProductCard } from '@/types/components'
import { currencyFormat } from '@/utils'

const props = defineProps<ProductCard>()

const formatPrice = computed(() => {
    return currencyFormat(props.price)
})
</script>
