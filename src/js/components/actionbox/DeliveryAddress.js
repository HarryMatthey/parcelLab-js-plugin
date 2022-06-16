const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator.js')

const Address = (deliveryInfo, lang) => {
  const translatedDestinationCountryName = translate('countryName', lang)[deliveryInfo.destination_country_iso3]

  const regionCode = (deliveryInfo.region && deliveryInfo.region.indexOf('-') > -1) ? deliveryInfo.region.split('-')[1] : 'REGION_CODE'
  const regex = new RegExp(`(^|[^a-zA-Z])${regionCode}([^a-zA-Z]|$)`, 'g')
          ${deliveryInfo.zip_code}
        `
      : (deliveryInfo.destination_country_iso3 && (deliveryInfo.destination_country_iso3 === 'USA')) // Format for USA
      ? html`
        ${raw(deliveryInfo.city)}${(deliveryInfo.region && deliveryInfo.region.indexOf('-') > -1) ? `, ${deliveryInfo.region.split('-')[1]}`: ''} ${deliveryInfo.zip_code.substring(0, 5)}
      `
      : html`${deliveryInfo.zip_code} ${raw(deliveryInfo.city)}` // Otherwise format

    return html`
      <address>
        ${deliveryInfo.recipient
          ? html`
              <p>${deliveryInfo.recipient}</p>
            `
          : ''}
        <p>${raw(deliveryInfo.street)}</p>
        <p>
          ${cityLine}
        </p>
          ${(deliveryInfo.destination_country_iso3 && (deliveryInfo.destination_country_iso3 === 'USA'))
          ? '' 
          : translatedDestinationCountryName ? translatedDestinationCountryName : deliveryInfo.destination_country_iso3}
      </address>
    `
}

module.exports = function DeliveryAddress (tHeader, lang, options) {
  const { delivery_info: deliveryInfo } = tHeader
  if (
    deliveryInfo &&
    deliveryInfo.street &&
    deliveryInfo.zip_code &&
    deliveryInfo.city
  ) {
    const address = Address(deliveryInfo, lang.name)

    const icon = Icon('map', 0, '18')
    icon.style.display = 'inline-block'
    icon.style.opacity = '.7'
    icon.style.verticalAlign = 'middle'

    return html`
      <div class="pl-box pl-action-box pl-box-address pl-space-top">
        <div class="pl-box-body">
          <p class="pl-box-address-caption">
            ${icon} ${translate('deliveryAddress', lang.name)}
          </p>
          ${address}
        </div>
      </div>
    `
  } else {
    return ''
  }
}