export const convertSteam64ToDotaID = (steamId64: string): number => {
    return Number(BigInt(steamId64) - BigInt(76561197960265728))
}
