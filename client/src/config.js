let url = ''
// 开发环境
if(process.env.NODE_ENV === 'development') {
    url = 'http://localhost:8000/'
}

export const baseUrl = url