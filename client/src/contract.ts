export const contract = {
  "projects": {
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
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
          "$schema": "https://json-schema.org/draft/2020-12/schema"
        }
      }
    }
  }
} as const

export default contract
