<template>
    <select
        class="form-select"
        aria-label="Default select example"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)"
    >
        <option v-for="iteratedOption in options" :key="iteratedOption.value" :value="iteratedOption.value">
            {{ iteratedOption.text }}
        </option>
    </select>
</template>

<script setup lang="ts">
import { Select } from '@/types/components/BaseSelect'

defineProps<Select>()
defineEmits(['update:modelValue'])
</script>
