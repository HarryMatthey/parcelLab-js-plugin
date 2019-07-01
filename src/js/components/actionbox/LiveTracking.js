const html = require('nanohtml')
// const GOOGLE_API_KEY = require('../../../settings').google_api_key
const Icon = require('../Icon')
const { translate } = require('../../lib/translator')

// const generateMapSrc = address => `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(address)}&zoom=11`

const generateTruckIconSrc = userId => `http://cdn.parcellab.com/img/mail/_/truckonmap/${userId}.png`

//////////////
// time box //
//////////////

const checkTimeFormat = function (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const generatePrettyTime = timeString => {
  if (!timeString) return null  
  const date = new Date(timeString)
  const hours = checkTimeFormat(date.getHours())
  const mins = checkTimeFormat(date.getMinutes())
  return `${hours}:${mins}`
}

const TimeBox = (startTime, endTime, timeCaption) => {
  const icon = Icon('clock', '#000', '25')
  icon.classList.add('pl-space-right')
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'bottom'
  icon.style.marginBottom = '3px'

  return html`
    <div class="pl-box pl-box-time">
      <div class="pl-box-body">
        <div class="pl-time-data">
          ${ icon} ${generatePrettyTime(startTime)} ${endTime ? ' - ' + generatePrettyTime(endTime) : ''}
        </div>
        ${ timeCaption ? html`
        <small class="pl-time-caption">${timeCaption}</small>` : ''}
      </div>
    </div>
    `
}

////////
// map//
////////

/*<iframe src="${generateMapSrc(`${actionBox.info.city},${actionBox.info.destination_country_iso3}`)}" frameborder="0" style="width:100%;height:100%;border:0px;z-index:2""></iframe>*/

const Map = (id, actionBox, courier, query, animated=false) => {
  const elem = html`
    <div id="pl-live-location-map" data-tid="${id}">      
      <a href="${courier.trackingurl}" target="_blank">
        <div id="pl-map-overlay" style="background-image: url(https://s3.eu-central-1.amazonaws.com/static-map-cache/749605187_40060018.png);background-position: center;background-size: cover;">
          <img id="pl-truck-icon" class="${ animated ? 'pl-truck-animated' : '' }" src="${generateTruckIconSrc(query.userId || 1612164)}" alt="" />
          <div id="pl-live-delivery-btn-container">
            <div class="pl-button pl-is-fullwidth">${translate('liveDelivery', query.lang.name)}</div>
          </div>
        </div>
      </a>
    </div>
  `

  elem.isSameNode = function (target) {
    // dont rerender map if it is still the same tid
    return id === target.dataset['tid']
  }

  return elem
}

const LiveTracking = ({ id, actionBox, courier, last_delivery_status }, query, animated=false) => {
  if (!actionBox.info || !actionBox.info.city) return null
  const mapBox = html`
    <div class="pl-box pl-action-box pl-box-location">
      <div class="pl-box-heading pl-box-location-heading">
          ${ actionBox.label || last_delivery_status.status}
      </div>
      <div class="pl-box-body pl-box-location-body">
        ${Map(id, actionBox, courier, query, animated)}
      </div>
      <div class="pl-box-footer">
        ${ actionBox.caption || last_delivery_status.status_details }
      </div>
    </div>
  `
  const scheduled = actionBox.info.scheduled
  const timeBox = (scheduled && scheduled.startTime) 
    ? TimeBox(scheduled.startTime, scheduled.endTime, scheduled.timeCaption) 
    : null

  return html`
    <div class="pl-spaced-list">
      ${ mapBox }    
      ${ timeBox }
    </div>
  `
}

module.exports = LiveTracking
