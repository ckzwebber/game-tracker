const STEAM_CDN = 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps'

export const steamImages = (appid: number) => ({
  capsule: `${STEAM_CDN}/${appid}/library_600x900.jpg`,
  header: `${STEAM_CDN}/${appid}/header.jpg`,
  hero: `${STEAM_CDN}/${appid}/library_hero.jpg`,
  logo: `${STEAM_CDN}/${appid}/logo.png`,
})
