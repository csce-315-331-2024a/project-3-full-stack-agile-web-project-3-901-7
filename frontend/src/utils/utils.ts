export function toTitleCase(str : string) {
    return str.split(' ').map(word => 
        word[0].toUpperCase() + word.substring(1).toLowerCase()
    );
}

export function canonImport(iconPath : string) {
    if (iconPath[0] === '/')
        return window.location.origin + iconPath;
    else
        return window.location.origin + '/' + iconPath;
}