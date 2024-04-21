export function toTitleCase(str : string | undefined) {
    return (str || '')
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => 
            (word[0].toUpperCase() + word.substring(1).toLowerCase()).trim()
        )
        .join(' ')
        .trim();
}

export function canonImport(iconPath : string) {
    if (iconPath[0] === '/')
        return window.location.origin + iconPath;
    else
        return window.location.origin + '/' + iconPath;
}