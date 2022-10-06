const mockEndpointsJson = JSON.parse(`[{
	"request": {
		"path": "/",
		"parameters": null,
		"method": "GET"
	},
	"description": "List versions",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"versions": [{
				"status": "CURRENT",
				"updated": "2012-01-01T00:00:00Z",
				"id": "v1.0",
				"links": [{
					"href": "https://openstack.example.com/v1.0/",
					"rel": "self"
				}]
			}]
		}
	}]
}, {
	"request": {
		"path": "/v1.0",
		"parameters": null,
		"method": "GET"
	},
	"description": "Show version details",
	"suggested_responses": [{
		"status_code": 202,
		"json": {
			"versions": [{
				"status": "CURRENT",
				"updated": "2012-08-01T00:00:00Z",
				"id": "v1.0",
				"links": [{
					"href": "http://23.253.228.211:8779/v1.0/",
					"rel": "self"
				}]
			}]
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}],
		"method": "POST"
	},
	"description": "Create database instance",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"instance": {
				"status": "BUILD",
				"updated": "2012-01-25T21:53:10Z",
				"name": "json_rack_instance",
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/instances/dea5a2f7-3ec7-4496-adab-0abb5a42d635",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/instances/dea5a2f7-3ec7-4496-adab-0abb5a42d635",
					"rel": "bookmark"
				}],
				"created": "2012-01-25T21:53:09Z",
				"hostname": "e09ad9a3f73309469cf1f43d11e79549caf9acf2.rackspaceclouddb.com",
				"volume": {
					"size": 2
				},
				"flavor": {
					"id": "1",
					"links": [{
						"href": "https://openstack.example.com/v1.0/1234/flavors/1",
						"rel": "self"
					}, {
						"href": "https://openstack.example.com/flavors/1",
						"rel": "bookmark"
					}]
				},
				"id": "dea5a2f7-3ec7-4496-adab-0abb5a42d635"
			}
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}],
		"method": "GET"
	},
	"description": "List database instances",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"instances": [{
				"status": "ACTIVE",
				"name": "json_rack_instance",
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/instances/28d1b8f3-172a-4f6d-983d-36021508444a",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/instances/28d1b8f3-172a-4f6d-983d-36021508444a",
					"rel": "bookmark"
				}],
				"volume": {
					"size": 2
				},
				"flavor": {
					"id": "1",
					"links": [{
						"href": "https://openstack.example.com/v1.0/1234/flavors/1",
						"rel": "self"
					}, {
						"href": "https://openstack.example.com/flavors/1",
						"rel": "bookmark"
					}]
				},
				"id": "28d1b8f3-172a-4f6d-983d-36021508444a"
			}, {
				"status": "ACTIVE",
				"name": "xml_rack_instance",
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/instances/8fb081af-f237-44f5-80cc-b46be1840ca9",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/instances/8fb081af-f237-44f5-80cc-b46be1840ca9",
					"rel": "bookmark"
				}],
				"volume": {
					"size": 2
				},
				"flavor": {
					"id": "1",
					"links": [{
						"href": "https://openstack.example.com/v1.0/1234/flavors/1",
						"rel": "self"
					}, {
						"href": "https://openstack.example.com/flavors/1",
						"rel": "bookmark"
					}]
				},
				"id": "8fb081af-f237-44f5-80cc-b46be1840ca9"
			}]
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "GET"
	},
	"description": "Show database instance details",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"instance": {
				"status": "ACTIVE",
				"updated": "2012-03-28T21:34:25Z",
				"name": "xml_rack_instance",
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/instances/2450c73f-7805-4afe-a42c-4094ab42666b",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/instances/2450c73f-7805-4afe-a42c-4094ab42666b",
					"rel": "bookmark"
				}],
				"created": "2012-03-28T21:31:02Z",
				"hostname": "e09ad9a3f73309469cf1f43d11e79549caf9acf2.rackspaceclouddb.com",
				"volume": {
					"used": 0.124542236328125,
					"size": 2
				},
				"flavor": {
					"id": "1",
					"links": [{
						"href": "https://openstack.example.com/v1.0/1234/flavors/1",
						"rel": "self"
					}, {
						"href": "https://openstack.example.com/flavors/1",
						"rel": "bookmark"
					}]
				},
				"id": "2450c73f-7805-4afe-a42c-4094ab42666b"
			}
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "DELETE"
	},
	"description": "Delete database instance",
	"suggested_responses": [{
		"status_code": 202,
		"json": null
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/action",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "POST"
	},
	"description": "Restart instance",
	"suggested_responses": [{
		"status_code": 202,
		"json": null
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/databases",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "POST"
	},
	"description": "Create database",
	"suggested_responses": [{
		"status_code": 202,
		"json": null
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/databases",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "GET"
	},
	"description": "List instance databases",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"databases": [{
				"name": "anotherexampledb"
			}, {
				"name": "exampledb"
			}, {
				"name": "nextround"
			}, {
				"name": "sampledb"
			}, {
				"name": "testingdb"
			}]
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/databases/{databaseName}",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}, {
			"Name": "databaseName",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The name for the specified database."
		}],
		"method": "DELETE"
	},
	"description": "Delete database",
	"suggested_responses": [{
		"status_code": 202,
		"json": null
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/users",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "POST"
	},
	"description": "Create user",
	"suggested_responses": [{
		"status_code": 202,
		"json": null
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/users",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "GET"
	},
	"description": "List database instance users",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"users": [{
				"name": "dbuser3",
				"databases": [{
					"name": "databaseA"
				}]
			}, {
				"name": "dbuser4",
				"databases": [{
					"name": "databaseB"
				}, {
					"name": "databaseC"
				}]
			}]
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/users/{name}",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}, {
			"Name": "name",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The name for the specified user."
		}],
		"method": "DELETE"
	},
	"description": "Delete user",
	"suggested_responses": [{
		"status_code": 202,
		"json": null
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/root",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "POST"
	},
	"description": "Enable root user",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"user": {
				"password": "secretsecret",
				"name": "root"
			}
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/instances/{instanceId}/root",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "instanceId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The instance ID for the specified database instance."
		}],
		"method": "GET"
	},
	"description": "Show root-enabled status for database instance",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"rootEnabled": true
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/flavors",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}],
		"method": "GET"
	},
	"description": "List flavors",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"flavors": [{
				"ram": 512,
				"id": 1,
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/flavors/1",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/flavors/1",
					"rel": "bookmark"
				}],
				"name": "m1.tiny"
			}, {
				"ram": 1024,
				"id": 2,
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/flavors/2",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/flavors/2",
					"rel": "bookmark"
				}],
				"name": "m1.small"
			}, {
				"ram": 2048,
				"id": 3,
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/flavors/3",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/flavors/3",
					"rel": "bookmark"
				}],
				"name": "m1.medium"
			}, {
				"ram": 4096,
				"id": 4,
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/flavors/4",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/flavors/4",
					"rel": "bookmark"
				}],
				"name": "m1.large"
			}]
		}
	}]
}, {
	"request": {
		"path": "/v1.0/{accountId}/flavors/{flavorId}",
		"parameters": [{
			"Name": "accountId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The account ID of the owner of the specified instance."
		}, {
			"Name": "flavorId",
			"Required": true,
			"In": "path",
			"Type": "string",
			"Description": "The flavor ID for the specified flavor."
		}],
		"method": "GET"
	},
	"description": "Show flavor details",
	"suggested_responses": [{
		"status_code": 200,
		"json": {
			"flavor": {
				"ram": 512,
				"id": 1,
				"links": [{
					"href": "https://openstack.example.com/v1.0/1234/flavors/1",
					"rel": "self"
				}, {
					"href": "https://openstack.example.com/flavors/1",
					"rel": "bookmark"
				}],
				"name": "m1.tiny"
			}
		}
	}]
}]`)

export default mockEndpointsJson