export default async function(form) {
    let formData = new FormData(form)
    return await fetch(form.action, {
        method: form.method,
        body: formData
    }).then(res => {
        res.json()
    })
}