<template>
    <div class="input-group">
        <input
            class="form-control border"
            type="text"
            placeholder="Szukaj..."
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string
}>()

defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>
