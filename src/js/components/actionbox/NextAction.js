const html = require('bel')
const Icon = require('../Icon')

const NextAction = ({ actionBox }) => {
  if (!actionBox.label) return null

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">

      <div class="pl-box-heading">
        ${ actionBox.label }        
      </div>

      <div class="pl-box-body">
        ${ Icon('error', null, '80') }
      </div>

      <div class="pl-box-footer">
        <div>${ actionBox.caption }</div>
      </div>
    </div>
  `
}

module.exports = NextAction