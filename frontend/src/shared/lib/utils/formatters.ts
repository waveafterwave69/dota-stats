export const secondsToHMS = (seconds: number | undefined): string => {
    if (seconds === undefined || seconds < 0) return '00:00'

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    const pad = (num: number) => String(num).padStart(2, '0')

    const hoursStr = hours > 0 ? `${hours}:` : ''
    const minutesStr = hours > 0 ? `${pad(minutes)}:` : `${minutes}:`
    const secondsStr = pad(remainingSeconds)

    return `${hoursStr}${minutesStr}${secondsStr}`
}

export const formatLastPlayed = (
    lastPlayedTimestamp: number | undefined,
): string => {
    if (!lastPlayedTimestamp) return 'Ни разу'

    const lastPlayedDate = new Date(lastPlayedTimestamp * 1000)
    const now = new Date()

    const diffMs = now.getTime() - lastPlayedDate.getTime()

    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const getPlural = (value: number, words: [string, string, string]) => {
        const num = Math.abs(value) % 100
        const num1 = num % 10
        if (num > 10 && num < 20) return words[2]
        if (num1 > 1 && num1 < 5) return words[1]
        if (num1 === 1) return words[0]
        return words[2]
    }

    if (diffHours < 1) {
        if (diffMinutes <= 0) return 'Только что'
        return `${diffMinutes} ${getPlural(diffMinutes, ['минуту', 'минуты', 'минут'])} назад`
    }

    if (diffHours < 24) {
        return `${diffHours} ${getPlural(diffHours, ['час', 'часа', 'часов'])} назад`
    }

    if (diffDays < 30) {
        return `${diffDays} ${getPlural(diffDays, ['день', 'дня', 'дней'])} назад`
    }

    let diffMonths =
        (now.getFullYear() - lastPlayedDate.getFullYear()) * 12 +
        (now.getMonth() - lastPlayedDate.getMonth())
    if (now.getDate() < lastPlayedDate.getDate()) {
        diffMonths--
    }

    if (diffMonths >= 1 && diffMonths < 12) {
        return `${diffMonths} ${getPlural(diffMonths, ['месяц', 'месяца', 'месяцев'])} назад`
    }

    const day = String(lastPlayedDate.getDate()).padStart(2, '0')
    const month = String(lastPlayedDate.getMonth() + 1).padStart(2, '0')
    const year = lastPlayedDate.getFullYear()

    return `${day}.${month}.${year}`
}
