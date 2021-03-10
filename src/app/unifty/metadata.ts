export interface Nft {
    name:            string;
    description:     string;
    image:           string;
    animation_url:   string;
    audio_url:       string;
    interactive_url: string;
    external_link:   string;
    attributes:      Attribute[];
}

export interface Attribute {
    trait_type: string;
    value:      string;
}