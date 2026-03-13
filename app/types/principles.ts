export interface PrincipleItem {
    tag: string;
    desc: string;
}

export interface PrincipleCategory {
    id: number;
    category: string;
    subtitle: string;
    icon: string;
    items: PrincipleItem[];
}