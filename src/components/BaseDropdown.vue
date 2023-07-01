<template>
    <div class="dropdown">
        <a
            id="dropdownMenuLink"
            class="btn btn-dark border dropdown-toggle text-start"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {{ selectedOptionText }}
        </a>

        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuLink">
            <li v-for="iteratedOption in options" :key="iteratedOption.value">
                <button class="dropdown-item" @click="selectOption(iteratedOption.value)">
                    {{ iteratedOption.text }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { Dropdown, DropdownOption } from '@/types/components'

const props = defineProps<Dropdown>()
const emit = defineEmits<{
    (e: 'select', value: string): void
}>()

const selectedOption = ref<string | null>(null)
const selectedOptionText = computed(() => {
    if (!selectedOption.value) return 'Wybierz opcję'

    const findedOption = props.options.find((option: DropdownOption) => option.value === selectedOption.value)
    if (!findedOption) {
        console.warn(`Undefined option ${selectedOption.value}`)
        return 'Wybierz opcję'
    }

    return findedOption.text
})

const selectOption = (desiredOption: string) => {
    selectedOption.value = desiredOption
    emit('select', desiredOption)
}
</script>
