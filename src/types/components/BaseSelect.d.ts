type SelectOption = {
    value: string
    text: string
}

type Select = {
    options: SelectOption[]
    modelValue: string
}

export { Select, SelectOption }
