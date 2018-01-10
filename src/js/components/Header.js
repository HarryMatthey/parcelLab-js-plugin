const html = require('bel')
const { translate } = require('../../js/lib/translator.js')
const Tabs = require('./Tabs')

const OrderStats = header => {
  if (header) {
    const orderStats = {}
    header.filter(h => h.last_delivery_status).forEach(({ last_delivery_status }) => {
      if (orderStats[last_delivery_status.status]) orderStats[last_delivery_status.status] + 1
      else orderStats[last_delivery_status.status] = 1
    })

    if (Object.keys(orderStats).length > 0) {
      return Object.keys(orderStats).map(stat => `${ orderStats[stat] } ${ stat }`).join(', ')
    }
  } else return null
}

const Header = (state, emit) => {
  const tabs = Tabs(state, emit)
  const { query } = state
  if (tabs && query.orderNo) {
    const { header } = state.checkpoints
    const orderStatsText = OrderStats(header)

    return html`
    <div class="pl-header">
      <div class="pl-col-row">
        <div class="pl-order-no">
          ${ translate('orderNo', query.lang.code) } ${ query.orderNo }
        </div>

          <div class="pl-order-sub">
            ${ translate('containsOf', query.lang.code)} ${header.length} ${translate('deliveries', query.lang.code) }

            ${ orderStatsText ? `(${ orderStatsText })` : null }
          </div>


      </div>
      <div class="pl-col-row">${ tabs }</div>
    </div>
    `
  } else return null
}

module.exports = Header