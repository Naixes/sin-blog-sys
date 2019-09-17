let url = ''
// 开发环境
if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8081/'
}

export const baseUrl = url