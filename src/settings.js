module.exports = {
  base_url: 'https://api.parcellab.com/',
  icon_url: 'https://icon.parcellab.com/',
  checkpoints_endpoint: 'v2/checkpoints',
  vote_endpoint: 'v2/vote-courier/',
  vote_communication_endpoint: 'v2/vote-communication/',
  pickup_location_endpoint: 'pickup-location',
  prediction_endpoint: 'prediction/parcel',
  shop_prediction_endpoint: 'prediction',
  user_activity_endpoint: 'user-activity/click',
  courier_deeplink_endpoint: 'deeplink-fallback',
  static_map_endpoint: 'staticmap/livetracking',
  article_list_endpoint: 'article-list',
  default_root_node: '#parcelLab-trace-wrapper',
  instagram_api_url: 'https://instagrapi.parcellab.com/prod/',
  google_api_key: require('./GOOGLE_API_KEY').key,
  mapShortenAddressForCouriers: ['ups-express', 'ups'],
  defualt_opts: {
    styles: true,
    show_searchForm: false,
    show_zipCodeInput: false,
    userId: null,
    show_note: null,
    rerouteButton: 'left'
  },
  default_styles: {
    borderColor: '#eeeeee',
    borderRadius: '4px',
    iconColor: '#000',
    buttonColor: '#333',
    buttonBackground: '#e6e6e6',
    margin: '0px',
    margin_mobile: '0px'
  }
}
