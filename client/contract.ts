export type EndpointProjectsGetVersions_OutputOK = {
  game_versions: string[];
  loaders: string[];
  id: string;
  project_id: string;
  author_id: string;
  featured: boolean;
  name: string;
  version_number: string;
  changelog: string;
  changelog_url: null;
  date_published: string;
  downloads: number;
  version_type: "release" | "beta" | "alpha";
  status: string;
  requested_status: null;
  files: {
    hashes: {
      sha512: string;
      sha1: string;
    };
    url: string;
    filename: string;
    primary: boolean;
    size: number;
    file_type: null;
  }[];
  dependencies: unknown[];
}[];
export type EndpointProjectsListMembers_OutputOK = {
  role: string;
  team_id: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    bio: string | null;
    created: string;
    role: string;
    badges: number;
    auth_providers: null;
    email: null;
    email_verified: null;
    has_password: null;
    has_totp: null;
    payout_data: null;
    stripe_customer_id: null;
    allow_friend_requests: null;
    github_id: null;
  };
  permissions: null;
  accepted: boolean;
  payouts_split: null;
  ordering: number;
}[];
export type EndpointGameVersionsList_OutputOK = {
  version: string;
  version_type: string;
  date: string;
  major: boolean;
}[];
export type EndpointFavouritesAddItem_OutputOK = {
  client_side: string;
  server_side: string;
  game_versions: string[];
  id: string;
  slug: string;
  project_type: string;
  team: string;
  organization: string | null;
  title: string;
  description: string;
  body: string;
  body_url: null;
  published: string;
  updated: string;
  approved: string;
  queued: null;
  status: string;
  requested_status: null;
  moderator_message: null;
  license: {
    id: string;
    name: string;
    url: string | null;
  };
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories: unknown[];
  loaders: string[];
  versions: string[];
  icon_url: string;
  issues_url: string;
  source_url: string;
  wiki_url: string;
  discord_url: string;
  donation_urls: unknown[];
  gallery: {
    url: string;
    raw_url: string;
    featured: boolean;
    title: string | null;
    description: null;
    created: string;
    ordering: number;
  }[];
  color: number;
  thread_id: string;
  monetization_status: string;
}[];
export type EndpointFavouritesCheckItem_OutputOK = boolean;
export type EndpointFavouritesListItemIds_OutputOK = string[];
export type EndpointFavouritesRemoveItem_OutputOK = {
  client_side: string;
  server_side: string;
  game_versions: string[];
  id: string;
  slug: string;
  project_type: string;
  team: string;
  organization: string | null;
  title: string;
  description: string;
  body: string;
  body_url: null;
  published: string;
  updated: string;
  approved: string;
  queued: null;
  status: string;
  requested_status: null;
  moderator_message: null;
  license: {
    id: string;
    name: string;
    url: string | null;
  };
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories: unknown[];
  loaders: string[];
  versions: string[];
  icon_url: string;
  issues_url: string;
  source_url: string;
  wiki_url: string;
  discord_url: string;
  donation_urls: unknown[];
  gallery: {
    url: string;
    raw_url: string;
    featured: boolean;
    title: string | null;
    description: null;
    created: string;
    ordering: number;
  }[];
  color: number;
  thread_id: string;
  monetization_status: string;
}[];

export interface Contract {
  projects: {
    getDetails: EndpointProjectsGetDetails;
    getOrganization: EndpointProjectsGetOrganization;
    getVersions: EndpointProjectsGetVersions;
    list: EndpointProjectsList;
    listMembers: EndpointProjectsListMembers;
  };
  gameVersions: {
    list: EndpointGameVersionsList;
  };
  favourites: {
    addItem: EndpointFavouritesAddItem;
    checkItem: EndpointFavouritesCheckItem;
    listItemIds: EndpointFavouritesListItemIds;
    listItems: EndpointFavouritesListItems;
    removeItem: EndpointFavouritesRemoveItem;
  };
}
export interface EndpointProjectsGetDetails {
  method: "get";
  input: {
    query?: EndpointProjectsGetDetails_InputQuery;
  };
  output: {
    OK: EndpointProjectsGetDetails_OutputOK;
  };
  media: null;
}
export interface EndpointProjectsGetDetails_InputQuery {
  projectId: string;
}
export interface EndpointProjectsGetDetails_OutputOK {
  client_side: string;
  server_side: string;
  game_versions: string[];
  id: string;
  slug: string;
  project_type: string;
  team: string;
  organization: string | null;
  title: string;
  description: string;
  body: string;
  body_url: null;
  published: string;
  updated: string;
  approved: string;
  queued: null;
  status: string;
  requested_status: null;
  moderator_message: null;
  license: {
    id: string;
    name: string;
    url: string | null;
  };
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories: unknown[];
  loaders: string[];
  versions: string[];
  icon_url: string;
  issues_url: string;
  source_url: string;
  wiki_url: string;
  discord_url: string;
  donation_urls: unknown[];
  gallery: {
    url: string;
    raw_url: string;
    featured: boolean;
    title: string | null;
    description: null;
    created: string;
    ordering: number;
  }[];
  color: number;
  thread_id: string;
  monetization_status: string;
}
export interface EndpointProjectsGetOrganization {
  method: "get";
  input: {
    query?: EndpointProjectsGetOrganization_InputQuery;
  };
  output: {
    OK: EndpointProjectsGetOrganization_OutputOK;
  };
  media: null;
}
export interface EndpointProjectsGetOrganization_InputQuery {
  projectId: string;
}
export interface EndpointProjectsGetOrganization_OutputOK {
  slug: string;
  name: string;
  icon: string;
  color: number;
}
export interface EndpointProjectsGetVersions {
  method: "get";
  input: {
    query?: EndpointProjectsGetVersions_InputQuery;
  };
  output: {
    OK: EndpointProjectsGetVersions_OutputOK;
  };
  media: null;
}
export interface EndpointProjectsGetVersions_InputQuery {
  projectId: string;
}
export interface EndpointProjectsList {
  method: "get";
  input: {
    query?: EndpointProjectsList_InputQuery;
  };
  output: {
    OK: EndpointProjectsList_OutputOK;
  };
  media: null;
}
export interface EndpointProjectsList_InputQuery {
  page: string;
  sort: "relevance" | "downloads" | "follows" | "newest" | "updated";
  query?: string;
  version?: string;
  categories?: string;
  environments?: string;
  projectType: "mod" | "modpack" | "resourcepack" | "shader" | "datapack" | "plugin";
}
export interface EndpointProjectsList_OutputOK {
  items: {
    project_id: string;
    project_type: string;
    slug: string;
    author: string;
    title: string;
    description: string;
    categories: string[];
    display_categories: string[];
    versions: string[];
    downloads: number;
    follows: number;
    icon_url: string;
    date_created: string;
    date_modified: string;
    newest_version: string;
    license: string;
    client_side: "optional" | "required" | "unsupported" | "unknown";
    server_side: "optional" | "required" | "unsupported" | "unknown";
    gallery: string[];
    featured_gallery: string | null;
    color: number | null;
  }[];
  total: number;
}
export interface EndpointProjectsListMembers {
  method: "get";
  input: {
    query?: EndpointProjectsListMembers_InputQuery;
  };
  output: {
    OK: EndpointProjectsListMembers_OutputOK;
  };
  media: null;
}
export interface EndpointProjectsListMembers_InputQuery {
  projectId: string;
}
export interface EndpointGameVersionsList {
  method: "get";
  input: {};
  output: {
    OK: EndpointGameVersionsList_OutputOK;
  };
  media: null;
}
export interface EndpointFavouritesAddItem {
  method: "post";
  input: {
    body?: EndpointFavouritesAddItem_InputBody;
  };
  output: {
    OK: EndpointFavouritesAddItem_OutputOK;
  };
  media: null;
}
export interface EndpointFavouritesAddItem_InputBody {
  projectId: string;
}
export interface EndpointFavouritesCheckItem {
  method: "get";
  input: {
    query?: EndpointFavouritesCheckItem_InputQuery;
  };
  output: {
    OK: EndpointFavouritesCheckItem_OutputOK;
  };
  media: null;
}
export interface EndpointFavouritesCheckItem_InputQuery {
  projectId: string;
}
export interface EndpointFavouritesListItemIds {
  method: "get";
  input: {
    query?: EndpointFavouritesListItemIds_InputQuery;
  };
  output: {
    OK: EndpointFavouritesListItemIds_OutputOK;
  };
  media: null;
}
export interface EndpointFavouritesListItemIds_InputQuery {
  projectType?: "mod" | "modpack" | "resourcepack" | "shader" | "datapack" | "plugin";
}
export interface EndpointFavouritesListItems {
  method: "get";
  input: {
    query?: EndpointFavouritesListItems_InputQuery;
  };
  output: {
    OK: EndpointFavouritesListItems_OutputOK;
  };
  media: null;
}
export interface EndpointFavouritesListItems_InputQuery {
  projectType: "mod" | "modpack" | "resourcepack" | "shader" | "datapack" | "plugin";
  query?: string;
  page?: string;
}
export interface EndpointFavouritesListItems_OutputOK {
  items: {
    client_side: string;
    server_side: string;
    game_versions: string[];
    id: string;
    slug: string;
    project_type: string;
    team: string;
    organization: string | null;
    title: string;
    description: string;
    body: string;
    body_url: null;
    published: string;
    updated: string;
    approved: string;
    queued: null;
    status: string;
    requested_status: null;
    moderator_message: null;
    license: {
      id: string;
      name: string;
      url: string | null;
    };
    downloads: number;
    followers: number;
    categories: string[];
    additional_categories: unknown[];
    loaders: string[];
    versions: string[];
    icon_url: string;
    issues_url: string;
    source_url: string;
    wiki_url: string;
    discord_url: string;
    donation_urls: unknown[];
    gallery: {
      url: string;
      raw_url: string;
      featured: boolean;
      title: string | null;
      description: null;
      created: string;
      ordering: number;
    }[];
    color: number;
    thread_id: string;
    monetization_status: string;
  }[];
  total: number;
}
export interface EndpointFavouritesRemoveItem {
  method: "post";
  input: {
    body?: EndpointFavouritesRemoveItem_InputBody;
  };
  output: {
    OK: EndpointFavouritesRemoveItem_OutputOK;
  };
  media: null;
}
export interface EndpointFavouritesRemoveItem_InputBody {
  projectId: string;
}
