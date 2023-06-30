class FetchService {
    baseURL = 'https://demo.crehler.dev/store-api'
    headersConfig = {
        'sw-access-key': 'SWSCMDV3N2DIOUNZTKNNCTBBCW',
        'Content-Type': 'application/json',
    }

    constructor() {}

    async getProducts() {
        const response = await fetch(`${this.baseURL}/product-listing/e435c9763b0d44fcab67ea1c0fdb3fa0`, {
            headers: this.headersConfig,
            method: 'POST',
            body: JSON.stringify({}),
        })

        if (!response?.ok) {
            console.error('Error on getting products by keyword')
        }

        const data = await response.json()
        return data
    }

    async getProductsByKeyword(keyword: string) {
        const bodyPayload = {
            search: keyword,
        }

        const response = await fetch(`${this.baseURL}/search`, {
            headers: this.headersConfig,
            method: 'POST',
            body: JSON.stringify(bodyPayload),
        })

        if (!response?.ok) {
            console.error('Error on getting products by keyword')
        }

        const data = await response.json()
        return data
    }
}

export default new FetchService()
