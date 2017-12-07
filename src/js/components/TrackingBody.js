const html = require('yo-yo')
const T = require('../lib/translator.js')
const statics = require('../lib/static')
const Checkpoint = require('./Checkpoint')
const MoreButton = require('./MoreButton')
const RerouteLink = require('./RerouteLink')
const FurtherInfos = require('./FurtherInfos')

const prepareCheckpoints = (checkpoints, query) => checkpoints.map((cp, i) => {
  const ts = cp.timestamp ? new Date(cp.timestamp) : null
  if (ts) cp.dateText = T.date(ts, i !== 0, query.lang.code)

  cp.transitStatus = statics.transitStates[cp.status]
  if (typeof cp.transitStatus === 'undefined')
    cp.transitStatus = statics.transitStates.default

  cp.transitStatusColor = cp.transitStatus.color
  cp.locationText = cp.location ? ' (' + cp.location + ')' : ''
  cp.alert = i === checkpoints.length - 1 ?
    'alert-' + (cp.transitStatus.alert ?
      cp.transitStatus.alert : 'info') : ''

  return cp
}).filter(cp => true && cp.shown).reverse()

const TrackingBody = ({ checkpoints, activeTracking, query, showAllCheckpoints, options }, emit) => {
  if (!checkpoints) return null
  const aceptedStatus = 'OutForDelivery DestinationDeliveryCenter'
  const tHeader = checkpoints.header[activeTracking]
  const tBody = checkpoints.body[tHeader.id]
  const rerouteLink = (options.rerouteButton &&options.rerouteButton === 'right') ? RerouteLink(tHeader) : null
  const furtherInfos = FurtherInfos(tHeader)
  
  let tCheckpoints = prepareCheckpoints(tBody, query)
  let moreButton = null

  if (tCheckpoints.length > 3 && !showAllCheckpoints) { // only show 3 checkpoints (if not more button clicked)
    moreButton = MoreButton(T.translate('more', query.lang.code), emit)
    tCheckpoints = tCheckpoints.slice(0, 3)
  }
    

  return html`
    <div class="parcel_lab_tracking" id="pl-t-${tHeader.id}">
      <div class="pl-box-body">

          <div class="pl-padded">
            ${ tCheckpoints.map(tCp => Checkpoint(tCp)) }
            ${ moreButton }
          </div>

        </div>
      <div class="pl-box-footer">
        ${ rerouteLink }
        ${ furtherInfos }
      </div>
    </div>
  `
}

module.exports = TrackingBody
