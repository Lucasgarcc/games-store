const BearerToken = `9333xcilsoxkqi23rhd45vpeko9vgg82xm57ozjvnn7s7g7uvj7np4wpdc1dns3n`

fetch('https://console.neon.tech/api/v2/',
 'Accept: application/json', 
  "Authorization: Bearer ${NEON_API_KEY}", 
 'Content-Type: application/json',
)