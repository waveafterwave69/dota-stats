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
