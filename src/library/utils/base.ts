function log(message: string, severity: string) {
    console.log(`${formatDate(new Date(), 'yyyy/MM/dd HH:mm:ss')} | ${(severity).padEnd(6)}:  ${message}`);
}

function formatDate(date: Date, format: string) {
    return format
        .replace('yyyy', date.getFullYear().toString().padStart(4, '0'))
        .replace('yy', date.getFullYear().toString().padStart(4, '0').substring(2, 2))
        .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace('dd', date.getDate().toString().padStart(2, '0'))
        .replace('hh', (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()).toString().padStart(2, '0'))
        .replace('HH', date.getHours().toString().padStart(2, '0'))
        .replace('mm', date.getMinutes().toString().padStart(2, '0'))
        .replace('ss', date.getSeconds().toString().padStart(2, '0'))
        .replace('tt', date.getHours() >= 12 ? 'PM' : 'AM');
}

export default { log, formatDate };