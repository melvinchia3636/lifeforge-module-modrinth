export interface Hit {
  project_id: string
  project_type: string
  slug: string
  author: string
  title: string
  description: string
  categories: string[]
  display_categories: string[]
  versions: string[]
  downloads: number
  follows: number
  icon_url: string
  date_created: Date
  date_modified: Date
  latest_version: string
  license: string
  client_side: 'optional' | 'required' | 'unsupported' | 'unknown'
  server_side: 'optional' | 'required' | 'unsupported' | 'unknown'
  gallery: string[]
  featured_gallery: null | string
  color: number | null
}

export interface ProjectDetails {
  client_side: string
  server_side: string
  game_versions: string[]
  id: string
  slug: string
  project_type: string
  team: string
  organization: string | null
  title: string
  description: string
  body: string
  body_url: null
  published: Date
  updated: Date
  approved: Date
  queued: null
  status: string
  requested_status: null
  moderator_message: null
  license: License
  downloads: number
  followers: number
  categories: string[]
  additional_categories: any[]
  loaders: string[]
  versions: string[]
  icon_url: string
  issues_url: string
  source_url: string
  wiki_url: string
  discord_url: string
  donation_urls: any[]
  gallery: Gallery[]
  color: number
  thread_id: string
  monetization_status: string
}

export interface Gallery {
  url: string
  raw_url: string
  featured: boolean
  title: null | string
  description: null
  created: Date
  ordering: number
}

export interface License {
  id: string
  name: string
  url: string | null
}

export interface ProjectMember {
  role: string
  team_id: string
  user: User
  permissions: null
  accepted: boolean
  payouts_split: null
  ordering: number
}

export interface Organization {
  id: string
  slug: string
  name: string
  team_id: string
  description: string
  icon_url: string
  color: number
  members: Member[]
}

export interface Member {
  team_id: string
  user: User
  role: string
  is_owner: boolean
  permissions: null
  organization_permissions: null
  accepted: boolean
  payouts_split: null
  ordering: number
}

export interface User {
  id: string
  username: string
  avatar_url: string
  bio: string | null
  created: Date
  role: string
  badges: number
  auth_providers: null
  email: null
  email_verified: null
  has_password: null
  has_totp: null
  payout_data: null
  stripe_customer_id: null
  allow_friend_requests: null
  github_id: null
}

export interface ProjectVersion {
  game_versions: string[]
  loaders: string[]
  id: string
  project_id: string
  author_id: string
  featured: boolean
  name: string
  version_number: string
  changelog: string
  changelog_url: null
  date_published: Date
  downloads: number
  version_type: 'release' | 'beta' | 'alpha'
  status: string
  requested_status: null
  files: File[]
  dependencies: any[]
}

export interface File {
  hashes: Hashes
  url: string
  filename: string
  primary: boolean
  size: number
  file_type: null
}

export interface Hashes {
  sha512: string
  sha1: string
}
