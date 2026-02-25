export namespace Menu {
    export interface Type {
        id: string
        title: string
        url: string
        img_url: string
        contents: string[]
    }

    export function create(
        partial: Omit<Type, "id"> & { id?: string }
    ): Type {
        return {
            id: partial.id ?? crypto.randomUUID(),
            title: partial.title,
            url: partial.url,
            img_url: partial.img_url,
            contents: partial.contents
        }
    }
}

