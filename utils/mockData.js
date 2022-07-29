const data = [
    {
        key: 'projectsReferences',
        data: {
            projectsReferences: [
                {
                    projectId: "b3fb3fee-ed9f-5872-a202-55d7014c5af0",
                    projectName: "Mon api"
                },
            ]
        }
    },
    {
        key: 'projects',
        data: [
            {
                _id: "b3fb3fee-ed9f-5872-a202-55d7014c5af0",
                name: "Mon api",
                projectEndpointsListId: "b7b2236f-4d82-5fee-9491-fe1bee6b087d",
                testSuitesReferences: [
                    {
                        testSuiteId: "85b81255-403e-5bb8-96ed-8d3ecc507b62",
                        testSuiteName: "User tests"
                    },
                    {
                        testSuiteId: "d9db0aa3-980a-5bf5-a088-1d625d71ca07",
                        testSuiteName: "Article tests"
                    },
                ]
            }
        ],
    },
    {
        key: 'testSuites',
        data: [
            {
                _id: "85b81255-403e-5bb8-96ed-8d3ecc507b62",
                name: "User tests",
                testActionsList: [
                    "5a2b5705-c972-59bb-a353-7b64e4782a71"
                ]
            },
            {
                _id: "d9db0aa3-980a-5bf5-a088-1d625d71ca07",
                name: "Article tests",
                testActionsList: [
                    "5a2b5705-c972-59bb-a353-7b64e4782a71"
                ]
            },
        ]
    },
    {
        key: 'testSuites.testActions',
        data: [
            {
                _id: "5a2b5705-c972-59bb-a353-7b64e4782a71",
                endpointId: "230170b3-6515-48f9-b1b4-77af2ac02fdf",
                summary: "Creates a database instance.",
                path: "/v1.0/{accountId}/instances/{instanceId}",
                method: "POST",
                parametersList: [
                    {
                        name: "accountId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "The account ID of the owner of the specified instance.\n",
                        value: "accountId666"
                    },
                    {
                        name: "instanceId",
                        in: "path",
                        required: true,
                        type: "string",
                        description: "The instance ID of the truc of the specified instance.\n",
                        value: "accountId666"
                    }
                ],
                expected: {
                    type: [
                        "application/json"
                    ],
                    httpCode: "200",
                    response: {
                        expectedProperty: "expectedValue",
                        secondProperty: "secondValue",
                        "array" : [
                            "yay",
                            "yo"    
                        ]
                    }
                },
                suggested: {
                    type: [
                        "application/json"
                    ],
                    httpCode: "200",
                    response: {
                        expectedProperty: "expectedValue",
                        secondProperty: "secondValue",
                        "array" : [
                            "yay",
                            "yo"    
                        ]
                    }
                }
            }
        ]
    },
    {
        key: 'projectEndpointsList',
        data: [
            {
                _id: "b7b2236f-4d82-5fee-9491-fe1bee6b087d",
                endpointsListId: "b7b2236f-4d82-5fee-9491-fe1bee6b087d",
                endpointsList: [
                    {
                        endpointId: "230170b3-6515-48f9-b1b4-77af2ac02fdf",
                    }
                ]
            }
        ],
    }
]

const get = (key) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = data.find(item => item.key === key)
            resolve(res)
        }, 1000)
    })
}

const getById = (key, id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = data.find(item => item.key === key)
            const item = res.data.find(item => item._id === id)
            resolve(item)
        }, 1000)
    })
}

export default {
    data,
    get,
    getById
}