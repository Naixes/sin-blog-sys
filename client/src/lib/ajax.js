export default async function(form) {
    let formData = new FormData(form)
    // 有，但是打印不出来
    // console.log(formData)
    return await fetch(form.action, {
        method: form.method,
        body: formData
    }).then(res => {
        res.json()
    })
}