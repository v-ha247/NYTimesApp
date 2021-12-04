export interface MostPopular {
    status:      string;
    copyright:   string;
    num_results: number;
    results:     Result[];
}

export interface Result {
    uri:            string;
    url:            string;
    id:             number;
    asset_id:       number;
    source:         string; //Source
    published_date: Date;
    updated:        Date;
    section:        string;
    subsection:     string;
    nytdsection:    string;
    adx_keywords:   string;
    column:         string | null;
    byline:         string;
    type:           string; //ResultType
    title:          string;
    abstract:       string;
    des_facet:      string[];
    org_facet:      string[];
    per_facet:      string[];
    geo_facet:      string[];
    media:          Media[];
    eta_id:         number;
}

export interface Media {
    type:                     string; //MediaType
    subtype:                  string; //sybtype
    caption:                  string;
    copyright:                string;
    approved_for_syndication: boolean;
    'media-metadata':         MediaMetadata[];
}

export interface MediaMetadata {
    url:    string;
    format: string; //Format
    height: number;
    width:  number;
}

