export const formatDate = () => {
    var d = new Date(),
        seconds = d.getSeconds(),
        minutes = d.getMinutes(),
        hours = d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day, hours, minutes, seconds].join('')
}

export const hasNumber = (string: string) => {
    return /\d/.test(string)
}
