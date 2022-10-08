import { mockProjectsJson, mockTestsJson, mockEndpointsJson, mockTestSuitesJson } from '~/utils'

export default function useMockData() {
    const mockData = [
        {
            key: 'projects',
            data: mockProjectsJson,
        },
        {
            key: 'endpoints',
            data: mockEndpointsJson,
        },
        {
            key: 'tests',
            data: mockTestsJson,
        },
        {
            key: 'testSuites',
            data: mockTestSuitesJson,
        }
    ]
    
    async function getMockData(key) {
        try {
            const res = mockData.find(item => item.key === key)

            if (res) {
                return res.data
            } else {
                return undefined
            }
        } catch (e) {
            console.error('[hooks/useMockData/getMockData]', e)
            throw new Error('Error reading data')
        }
    }

    return { mockData, getMockData }
}