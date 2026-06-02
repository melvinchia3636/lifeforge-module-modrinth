export const contract = {
  "projects": {
    "ProjectDetailsSchema": {
      "def": {
        "type": "object",
        "shape": {
          "client_side": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "server_side": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "game_versions": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "string"
                },
                "type": "string",
                "format": null,
                "minLength": null,
                "maxLength": null
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "string"
              },
              "type": "string",
              "format": null,
              "minLength": null,
              "maxLength": null
            }
          },
          "id": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "slug": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "project_type": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "team": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "organization": {
            "def": {
              "type": "nullable",
              "innerType": {
                "def": {
                  "type": "string"
                },
                "type": "string",
                "format": null,
                "minLength": null,
                "maxLength": null
              }
            },
            "type": "nullable"
          },
          "title": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "description": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "body": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "body_url": {
            "def": {
              "type": "null"
            },
            "type": "null"
          },
          "published": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "updated": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "approved": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "queued": {
            "def": {
              "type": "null"
            },
            "type": "null"
          },
          "status": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "requested_status": {
            "def": {
              "type": "null"
            },
            "type": "null"
          },
          "moderator_message": {
            "def": {
              "type": "null"
            },
            "type": "null"
          },
          "license": {
            "def": {
              "type": "object",
              "shape": {
                "id": {
                  "def": {
                    "type": "string"
                  },
                  "type": "string",
                  "format": null,
                  "minLength": null,
                  "maxLength": null
                },
                "name": {
                  "def": {
                    "type": "string"
                  },
                  "type": "string",
                  "format": null,
                  "minLength": null,
                  "maxLength": null
                },
                "url": {
                  "def": {
                    "type": "nullable",
                    "innerType": {
                      "def": {
                        "type": "string"
                      },
                      "type": "string",
                      "format": null,
                      "minLength": null,
                      "maxLength": null
                    }
                  },
                  "type": "nullable"
                }
              }
            },
            "type": "object"
          },
          "downloads": {
            "def": {
              "type": "number",
              "checks": {}
            },
            "type": "number",
            "minValue": null,
            "maxValue": null,
            "isInt": false,
            "isFinite": true,
            "format": null
          },
          "followers": {
            "def": {
              "type": "number",
              "checks": {}
            },
            "type": "number",
            "minValue": null,
            "maxValue": null,
            "isInt": false,
            "isFinite": true,
            "format": null
          },
          "categories": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "string"
                },
                "type": "string",
                "format": null,
                "minLength": null,
                "maxLength": null
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "string"
              },
              "type": "string",
              "format": null,
              "minLength": null,
              "maxLength": null
            }
          },
          "additional_categories": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "unknown"
                },
                "type": "unknown"
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "unknown"
              },
              "type": "unknown"
            }
          },
          "loaders": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "string"
                },
                "type": "string",
                "format": null,
                "minLength": null,
                "maxLength": null
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "string"
              },
              "type": "string",
              "format": null,
              "minLength": null,
              "maxLength": null
            }
          },
          "versions": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "string"
                },
                "type": "string",
                "format": null,
                "minLength": null,
                "maxLength": null
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "string"
              },
              "type": "string",
              "format": null,
              "minLength": null,
              "maxLength": null
            }
          },
          "icon_url": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "issues_url": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "source_url": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "wiki_url": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "discord_url": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "donation_urls": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "unknown"
                },
                "type": "unknown"
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "unknown"
              },
              "type": "unknown"
            }
          },
          "gallery": {
            "def": {
              "type": "array",
              "element": {
                "def": {
                  "type": "object",
                  "shape": {
                    "url": {
                      "def": {
                        "type": "string"
                      },
                      "type": "string",
                      "format": null,
                      "minLength": null,
                      "maxLength": null
                    },
                    "raw_url": {
                      "def": {
                        "type": "string"
                      },
                      "type": "string",
                      "format": null,
                      "minLength": null,
                      "maxLength": null
                    },
                    "featured": {
                      "def": {
                        "type": "boolean"
                      },
                      "type": "boolean"
                    },
                    "title": {
                      "def": {
                        "type": "nullable",
                        "innerType": {
                          "def": {
                            "type": "string"
                          },
                          "type": "string",
                          "format": null,
                          "minLength": null,
                          "maxLength": null
                        }
                      },
                      "type": "nullable"
                    },
                    "description": {
                      "def": {
                        "type": "null"
                      },
                      "type": "null"
                    },
                    "created": {
                      "def": {
                        "type": "string"
                      },
                      "type": "string",
                      "format": null,
                      "minLength": null,
                      "maxLength": null
                    },
                    "ordering": {
                      "def": {
                        "type": "number",
                        "checks": {}
                      },
                      "type": "number",
                      "minValue": null,
                      "maxValue": null,
                      "isInt": false,
                      "isFinite": true,
                      "format": null
                    }
                  }
                },
                "type": "object"
              }
            },
            "type": "array",
            "element": {
              "def": {
                "type": "object",
                "shape": {
                  "url": {
                    "def": {
                      "type": "string"
                    },
                    "type": "string",
                    "format": null,
                    "minLength": null,
                    "maxLength": null
                  },
                  "raw_url": {
                    "def": {
                      "type": "string"
                    },
                    "type": "string",
                    "format": null,
                    "minLength": null,
                    "maxLength": null
                  },
                  "featured": {
                    "def": {
                      "type": "boolean"
                    },
                    "type": "boolean"
                  },
                  "title": {
                    "def": {
                      "type": "nullable",
                      "innerType": {
                        "def": {
                          "type": "string"
                        },
                        "type": "string",
                        "format": null,
                        "minLength": null,
                        "maxLength": null
                      }
                    },
                    "type": "nullable"
                  },
                  "description": {
                    "def": {
                      "type": "null"
                    },
                    "type": "null"
                  },
                  "created": {
                    "def": {
                      "type": "string"
                    },
                    "type": "string",
                    "format": null,
                    "minLength": null,
                    "maxLength": null
                  },
                  "ordering": {
                    "def": {
                      "type": "number",
                      "checks": {}
                    },
                    "type": "number",
                    "minValue": null,
                    "maxValue": null,
                    "isInt": false,
                    "isFinite": true,
                    "format": null
                  }
                }
              },
              "type": "object"
            }
          },
          "color": {
            "def": {
              "type": "number",
              "checks": {}
            },
            "type": "number",
            "minValue": null,
            "maxValue": null,
            "isInt": false,
            "isFinite": true,
            "format": null
          },
          "thread_id": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          },
          "monetization_status": {
            "def": {
              "type": "string"
            },
            "type": "string",
            "format": null,
            "minLength": null,
            "maxLength": null
          }
        }
      },
      "type": "object"
    },
    "getDetails": {
      "method": "get",
      "description": "Get Modrinth project details",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "client_side": {
              "type": "string"
            },
            "server_side": {
              "type": "string"
            },
            "game_versions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "id": {
              "type": "string"
            },
            "slug": {
              "type": "string"
            },
            "project_type": {
              "type": "string"
            },
            "team": {
              "type": "string"
            },
            "organization": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ]
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "body": {
              "type": "string"
            },
            "body_url": {
              "type": "null"
            },
            "published": {
              "type": "string"
            },
            "updated": {
              "type": "string"
            },
            "approved": {
              "type": "string"
            },
            "queued": {
              "type": "null"
            },
            "status": {
              "type": "string"
            },
            "requested_status": {
              "type": "null"
            },
            "moderator_message": {
              "type": "null"
            },
            "license": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "url": {
                  "anyOf": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "null"
                    }
                  ]
                }
              },
              "required": [
                "id",
                "name",
                "url"
              ],
              "additionalProperties": false
            },
            "downloads": {
              "type": "number"
            },
            "followers": {
              "type": "number"
            },
            "categories": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "additional_categories": {
              "type": "array",
              "items": {}
            },
            "loaders": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "versions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "icon_url": {
              "type": "string"
            },
            "issues_url": {
              "type": "string"
            },
            "source_url": {
              "type": "string"
            },
            "wiki_url": {
              "type": "string"
            },
            "discord_url": {
              "type": "string"
            },
            "donation_urls": {
              "type": "array",
              "items": {}
            },
            "gallery": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "url": {
                    "type": "string"
                  },
                  "raw_url": {
                    "type": "string"
                  },
                  "featured": {
                    "type": "boolean"
                  },
                  "title": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "description": {
                    "type": "null"
                  },
                  "created": {
                    "type": "string"
                  },
                  "ordering": {
                    "type": "number"
                  }
                },
                "required": [
                  "url",
                  "raw_url",
                  "featured",
                  "title",
                  "description",
                  "created",
                  "ordering"
                ],
                "additionalProperties": false
              }
            },
            "color": {
              "type": "number"
            },
            "thread_id": {
              "type": "string"
            },
            "monetization_status": {
              "type": "string"
            }
          },
          "required": [
            "client_side",
            "server_side",
            "game_versions",
            "id",
            "slug",
            "project_type",
            "team",
            "organization",
            "title",
            "description",
            "body",
            "body_url",
            "published",
            "updated",
            "approved",
            "queued",
            "status",
            "requested_status",
            "moderator_message",
            "license",
            "downloads",
            "followers",
            "categories",
            "additional_categories",
            "loaders",
            "versions",
            "icon_url",
            "issues_url",
            "source_url",
            "wiki_url",
            "discord_url",
            "donation_urls",
            "gallery",
            "color",
            "thread_id",
            "monetization_status"
          ],
          "additionalProperties": false
        }
      }
    },
    "getOrganization": {
      "method": "get",
      "description": "Get the organization of a Modrinth project",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "slug": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            },
            "color": {
              "type": "number"
            }
          },
          "required": [
            "slug",
            "name",
            "icon",
            "color"
          ],
          "additionalProperties": false
        }
      }
    },
    "getVersions": {
      "method": "get",
      "description": "List all versions for a Modrinth project",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "game_versions": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "loaders": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "id": {
                "type": "string"
              },
              "project_id": {
                "type": "string"
              },
              "author_id": {
                "type": "string"
              },
              "featured": {
                "type": "boolean"
              },
              "name": {
                "type": "string"
              },
              "version_number": {
                "type": "string"
              },
              "changelog": {
                "type": "string"
              },
              "changelog_url": {
                "type": "null"
              },
              "date_published": {
                "type": "string"
              },
              "downloads": {
                "type": "number"
              },
              "version_type": {
                "type": "string",
                "enum": [
                  "release",
                  "beta",
                  "alpha"
                ]
              },
              "status": {
                "type": "string"
              },
              "requested_status": {
                "type": "null"
              },
              "files": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "hashes": {
                      "type": "object",
                      "properties": {
                        "sha512": {
                          "type": "string"
                        },
                        "sha1": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "sha512",
                        "sha1"
                      ],
                      "additionalProperties": false
                    },
                    "url": {
                      "type": "string"
                    },
                    "filename": {
                      "type": "string"
                    },
                    "primary": {
                      "type": "boolean"
                    },
                    "size": {
                      "type": "number"
                    },
                    "file_type": {
                      "type": "null"
                    }
                  },
                  "required": [
                    "hashes",
                    "url",
                    "filename",
                    "primary",
                    "size",
                    "file_type"
                  ],
                  "additionalProperties": false
                }
              },
              "dependencies": {
                "type": "array",
                "items": {}
              }
            },
            "required": [
              "game_versions",
              "loaders",
              "id",
              "project_id",
              "author_id",
              "featured",
              "name",
              "version_number",
              "changelog",
              "changelog_url",
              "date_published",
              "downloads",
              "version_type",
              "status",
              "requested_status",
              "files",
              "dependencies"
            ],
            "additionalProperties": false
          }
        }
      }
    },
    "list": {
      "method": "get",
      "description": "List all Modrinth entries",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "page": {
              "default": "1",
              "type": "string"
            },
            "sort": {
              "default": "relevance",
              "type": "string",
              "enum": [
                "relevance",
                "downloads",
                "follows",
                "newest",
                "updated"
              ]
            },
            "query": {
              "type": "string"
            },
            "version": {
              "type": "string"
            },
            "categories": {
              "type": "string"
            },
            "environments": {
              "type": "string"
            },
            "projectType": {
              "default": "mod",
              "type": "string",
              "enum": [
                "mod",
                "modpack",
                "resourcepack",
                "shader",
                "datapack",
                "plugin"
              ]
            },
            "facets": {
              "type": "string"
            }
          },
          "required": [
            "page",
            "sort",
            "projectType"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "project_id": {
                    "type": "string"
                  },
                  "project_type": {
                    "type": "string"
                  },
                  "slug": {
                    "type": "string"
                  },
                  "author": {
                    "type": "string"
                  },
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "categories": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "display_categories": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "versions": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "downloads": {
                    "type": "number"
                  },
                  "follows": {
                    "type": "number"
                  },
                  "icon_url": {
                    "type": "string"
                  },
                  "date_created": {
                    "type": "string"
                  },
                  "date_modified": {
                    "type": "string"
                  },
                  "newest_version": {
                    "type": "string"
                  },
                  "license": {
                    "type": "string"
                  },
                  "client_side": {
                    "type": "string",
                    "enum": [
                      "optional",
                      "required",
                      "unsupported",
                      "unknown"
                    ]
                  },
                  "server_side": {
                    "type": "string",
                    "enum": [
                      "optional",
                      "required",
                      "unsupported",
                      "unknown"
                    ]
                  },
                  "gallery": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "featured_gallery": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "color": {
                    "anyOf": [
                      {
                        "type": "number"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  }
                },
                "required": [
                  "project_id",
                  "project_type",
                  "slug",
                  "author",
                  "title",
                  "description",
                  "categories",
                  "display_categories",
                  "versions",
                  "downloads",
                  "follows",
                  "icon_url",
                  "date_created",
                  "date_modified",
                  "newest_version",
                  "license",
                  "client_side",
                  "server_side",
                  "gallery",
                  "featured_gallery",
                  "color"
                ],
                "additionalProperties": false
              }
            },
            "total": {
              "type": "number"
            }
          },
          "required": [
            "items",
            "total"
          ],
          "additionalProperties": false
        }
      }
    },
    "listMembers": {
      "method": "get",
      "description": "List all members of a Modrinth project team",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "role": {
                "type": "string"
              },
              "team_id": {
                "type": "string"
              },
              "user": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "username": {
                    "type": "string"
                  },
                  "avatar_url": {
                    "type": "string"
                  },
                  "bio": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "created": {
                    "type": "string"
                  },
                  "role": {
                    "type": "string"
                  },
                  "badges": {
                    "type": "number"
                  },
                  "auth_providers": {
                    "type": "null"
                  },
                  "email": {
                    "type": "null"
                  },
                  "email_verified": {
                    "type": "null"
                  },
                  "has_password": {
                    "type": "null"
                  },
                  "has_totp": {
                    "type": "null"
                  },
                  "payout_data": {
                    "type": "null"
                  },
                  "stripe_customer_id": {
                    "type": "null"
                  },
                  "allow_friend_requests": {
                    "type": "null"
                  },
                  "github_id": {
                    "type": "null"
                  }
                },
                "required": [
                  "id",
                  "username",
                  "avatar_url",
                  "bio",
                  "created",
                  "role",
                  "badges",
                  "auth_providers",
                  "email",
                  "email_verified",
                  "has_password",
                  "has_totp",
                  "payout_data",
                  "stripe_customer_id",
                  "allow_friend_requests",
                  "github_id"
                ],
                "additionalProperties": false
              },
              "permissions": {
                "type": "null"
              },
              "accepted": {
                "type": "boolean"
              },
              "payouts_split": {
                "type": "null"
              },
              "ordering": {
                "type": "number"
              }
            },
            "required": [
              "role",
              "team_id",
              "user",
              "permissions",
              "accepted",
              "payouts_split",
              "ordering"
            ],
            "additionalProperties": false
          }
        }
      }
    }
  },
  "gameVersions": {
    "list": {
      "method": "get",
      "description": "List all versions for Minecraft",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {},
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  },
  "favourites": {
    "addItem": {
      "method": "post",
      "description": "Add a favourite project",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "client_side": {
                "type": "string"
              },
              "server_side": {
                "type": "string"
              },
              "game_versions": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "id": {
                "type": "string"
              },
              "slug": {
                "type": "string"
              },
              "project_type": {
                "type": "string"
              },
              "team": {
                "type": "string"
              },
              "organization": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "title": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "body": {
                "type": "string"
              },
              "body_url": {
                "type": "null"
              },
              "published": {
                "type": "string"
              },
              "updated": {
                "type": "string"
              },
              "approved": {
                "type": "string"
              },
              "queued": {
                "type": "null"
              },
              "status": {
                "type": "string"
              },
              "requested_status": {
                "type": "null"
              },
              "moderator_message": {
                "type": "null"
              },
              "license": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "url": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  }
                },
                "required": [
                  "id",
                  "name",
                  "url"
                ],
                "additionalProperties": false
              },
              "downloads": {
                "type": "number"
              },
              "followers": {
                "type": "number"
              },
              "categories": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "additional_categories": {
                "type": "array",
                "items": {}
              },
              "loaders": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "versions": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "icon_url": {
                "type": "string"
              },
              "issues_url": {
                "type": "string"
              },
              "source_url": {
                "type": "string"
              },
              "wiki_url": {
                "type": "string"
              },
              "discord_url": {
                "type": "string"
              },
              "donation_urls": {
                "type": "array",
                "items": {}
              },
              "gallery": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string"
                    },
                    "raw_url": {
                      "type": "string"
                    },
                    "featured": {
                      "type": "boolean"
                    },
                    "title": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "description": {
                      "type": "null"
                    },
                    "created": {
                      "type": "string"
                    },
                    "ordering": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "url",
                    "raw_url",
                    "featured",
                    "title",
                    "description",
                    "created",
                    "ordering"
                  ],
                  "additionalProperties": false
                }
              },
              "color": {
                "type": "number"
              },
              "thread_id": {
                "type": "string"
              },
              "monetization_status": {
                "type": "string"
              }
            },
            "required": [
              "client_side",
              "server_side",
              "game_versions",
              "id",
              "slug",
              "project_type",
              "team",
              "organization",
              "title",
              "description",
              "body",
              "body_url",
              "published",
              "updated",
              "approved",
              "queued",
              "status",
              "requested_status",
              "moderator_message",
              "license",
              "downloads",
              "followers",
              "categories",
              "additional_categories",
              "loaders",
              "versions",
              "icon_url",
              "issues_url",
              "source_url",
              "wiki_url",
              "discord_url",
              "donation_urls",
              "gallery",
              "color",
              "thread_id",
              "monetization_status"
            ],
            "additionalProperties": false
          }
        },
        "CONFLICT": true
      }
    },
    "checkItem": {
      "method": "get",
      "description": "Check if a project is in favourites",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "boolean"
        }
      }
    },
    "listItemIds": {
      "method": "get",
      "description": "List all favourite project IDs",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectType": {
              "type": "string",
              "enum": [
                "mod",
                "modpack",
                "resourcepack",
                "shader",
                "datapack",
                "plugin"
              ]
            }
          },
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "listItems": {
      "method": "get",
      "description": "List all favourite projects",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "query": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectType": {
              "type": "string",
              "enum": [
                "mod",
                "modpack",
                "resourcepack",
                "shader",
                "datapack",
                "plugin"
              ]
            },
            "query": {
              "type": "string"
            },
            "page": {
              "type": "string"
            }
          },
          "required": [
            "projectType"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "client_side": {
                    "type": "string"
                  },
                  "server_side": {
                    "type": "string"
                  },
                  "game_versions": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "id": {
                    "type": "string"
                  },
                  "slug": {
                    "type": "string"
                  },
                  "project_type": {
                    "type": "string"
                  },
                  "team": {
                    "type": "string"
                  },
                  "organization": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  },
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "body": {
                    "type": "string"
                  },
                  "body_url": {
                    "type": "null"
                  },
                  "published": {
                    "type": "string"
                  },
                  "updated": {
                    "type": "string"
                  },
                  "approved": {
                    "type": "string"
                  },
                  "queued": {
                    "type": "null"
                  },
                  "status": {
                    "type": "string"
                  },
                  "requested_status": {
                    "type": "null"
                  },
                  "moderator_message": {
                    "type": "null"
                  },
                  "license": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "url": {
                        "anyOf": [
                          {
                            "type": "string"
                          },
                          {
                            "type": "null"
                          }
                        ]
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "url"
                    ],
                    "additionalProperties": false
                  },
                  "downloads": {
                    "type": "number"
                  },
                  "followers": {
                    "type": "number"
                  },
                  "categories": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "additional_categories": {
                    "type": "array",
                    "items": {}
                  },
                  "loaders": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "versions": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "icon_url": {
                    "type": "string"
                  },
                  "issues_url": {
                    "type": "string"
                  },
                  "source_url": {
                    "type": "string"
                  },
                  "wiki_url": {
                    "type": "string"
                  },
                  "discord_url": {
                    "type": "string"
                  },
                  "donation_urls": {
                    "type": "array",
                    "items": {}
                  },
                  "gallery": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "url": {
                          "type": "string"
                        },
                        "raw_url": {
                          "type": "string"
                        },
                        "featured": {
                          "type": "boolean"
                        },
                        "title": {
                          "anyOf": [
                            {
                              "type": "string"
                            },
                            {
                              "type": "null"
                            }
                          ]
                        },
                        "description": {
                          "type": "null"
                        },
                        "created": {
                          "type": "string"
                        },
                        "ordering": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "url",
                        "raw_url",
                        "featured",
                        "title",
                        "description",
                        "created",
                        "ordering"
                      ],
                      "additionalProperties": false
                    }
                  },
                  "color": {
                    "type": "number"
                  },
                  "thread_id": {
                    "type": "string"
                  },
                  "monetization_status": {
                    "type": "string"
                  }
                },
                "required": [
                  "client_side",
                  "server_side",
                  "game_versions",
                  "id",
                  "slug",
                  "project_type",
                  "team",
                  "organization",
                  "title",
                  "description",
                  "body",
                  "body_url",
                  "published",
                  "updated",
                  "approved",
                  "queued",
                  "status",
                  "requested_status",
                  "moderator_message",
                  "license",
                  "downloads",
                  "followers",
                  "categories",
                  "additional_categories",
                  "loaders",
                  "versions",
                  "icon_url",
                  "issues_url",
                  "source_url",
                  "wiki_url",
                  "discord_url",
                  "donation_urls",
                  "gallery",
                  "color",
                  "thread_id",
                  "monetization_status"
                ],
                "additionalProperties": false
              }
            },
            "total": {
              "type": "number"
            }
          },
          "required": [
            "items",
            "total"
          ],
          "additionalProperties": false
        }
      }
    },
    "removeItem": {
      "method": "post",
      "description": "Remove a favourite project",
      "noAuth": false,
      "encrypted": true,
      "isDownloadable": false,
      "media": null,
      "input": {
        "body": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "object",
          "properties": {
            "projectId": {
              "type": "string"
            }
          },
          "required": [
            "projectId"
          ],
          "additionalProperties": false
        }
      },
      "output": {
        "OK": {
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "client_side": {
                "type": "string"
              },
              "server_side": {
                "type": "string"
              },
              "game_versions": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "id": {
                "type": "string"
              },
              "slug": {
                "type": "string"
              },
              "project_type": {
                "type": "string"
              },
              "team": {
                "type": "string"
              },
              "organization": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "null"
                  }
                ]
              },
              "title": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "body": {
                "type": "string"
              },
              "body_url": {
                "type": "null"
              },
              "published": {
                "type": "string"
              },
              "updated": {
                "type": "string"
              },
              "approved": {
                "type": "string"
              },
              "queued": {
                "type": "null"
              },
              "status": {
                "type": "string"
              },
              "requested_status": {
                "type": "null"
              },
              "moderator_message": {
                "type": "null"
              },
              "license": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "url": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ]
                  }
                },
                "required": [
                  "id",
                  "name",
                  "url"
                ],
                "additionalProperties": false
              },
              "downloads": {
                "type": "number"
              },
              "followers": {
                "type": "number"
              },
              "categories": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "additional_categories": {
                "type": "array",
                "items": {}
              },
              "loaders": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "versions": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "icon_url": {
                "type": "string"
              },
              "issues_url": {
                "type": "string"
              },
              "source_url": {
                "type": "string"
              },
              "wiki_url": {
                "type": "string"
              },
              "discord_url": {
                "type": "string"
              },
              "donation_urls": {
                "type": "array",
                "items": {}
              },
              "gallery": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string"
                    },
                    "raw_url": {
                      "type": "string"
                    },
                    "featured": {
                      "type": "boolean"
                    },
                    "title": {
                      "anyOf": [
                        {
                          "type": "string"
                        },
                        {
                          "type": "null"
                        }
                      ]
                    },
                    "description": {
                      "type": "null"
                    },
                    "created": {
                      "type": "string"
                    },
                    "ordering": {
                      "type": "number"
                    }
                  },
                  "required": [
                    "url",
                    "raw_url",
                    "featured",
                    "title",
                    "description",
                    "created",
                    "ordering"
                  ],
                  "additionalProperties": false
                }
              },
              "color": {
                "type": "number"
              },
              "thread_id": {
                "type": "string"
              },
              "monetization_status": {
                "type": "string"
              }
            },
            "required": [
              "client_side",
              "server_side",
              "game_versions",
              "id",
              "slug",
              "project_type",
              "team",
              "organization",
              "title",
              "description",
              "body",
              "body_url",
              "published",
              "updated",
              "approved",
              "queued",
              "status",
              "requested_status",
              "moderator_message",
              "license",
              "downloads",
              "followers",
              "categories",
              "additional_categories",
              "loaders",
              "versions",
              "icon_url",
              "issues_url",
              "source_url",
              "wiki_url",
              "discord_url",
              "donation_urls",
              "gallery",
              "color",
              "thread_id",
              "monetization_status"
            ],
            "additionalProperties": false
          }
        }
      }
    }
  }
} as const

export default contract
