export interface Doc {
    title: string;
    description?: string;
    group: string;
    order: number;
    tags?: string[];
    content: string;
    slug: string;
}

export interface Group {
    group: string;
    docs: Doc[];
}