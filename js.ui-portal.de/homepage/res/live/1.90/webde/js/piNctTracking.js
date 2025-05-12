if (!window.SiteInfo) {
  window.SiteInfo = {}
}

window.SiteInfo.TrackLibPageId = Math.random()
  .toString(36)
  .substring(2, 11)

let updatePixelSent = false
let initDone = false
const site = window.PageConfig.site === 'hp' ? 'homepage' : 'logout'

const getMeta = (metaName) => document.querySelector(`meta[name=${metaName}]`)?.getAttribute('content') || ''

window.PageConfig.softwareVersion = getMeta('applicationVersion')

const getDomainName = (hostName) => {
  return hostName.substring(hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1).replace('.', '')
}

const getBrand = () => {
  const brand = window.location.hostname.split('.').reverse()?.[1]
  return brand === 'web' ? 'webde' : brand
}

const updateTrackLibPixel = (detail) => {
  if (!updatePixelSent) {
    const trackObject = {
      section: `${site}.update`,
      trackingtype: 'ev',
      cont_page_id: window.SiteInfo.TrackLibPageId,
      cont_reco: '',
      visit_calc: 1,
      sett_privatemode: !window.availableResponse,
      soft_name: 'hpll',
      soft_version: window.PageConfig.softwareVersion,
      soft_variant: document.querySelector('html').getAttribute('data-variant-name'),
      brand: trackingBrand,
      cont_a_format: window.initialData?.serviceResponse?.response?.type || detail?.type || 'PRIOAD_SERVER_EXCEPTION',
      cont_a_variant: window.initialData?.serviceResponse?.response?.variant || detail?.variant || 'PRIOAD_SERVER_EXCEPTION',
      cont_mode: window.SiteInfo.stickyLogin ? 'sticky' : ''
    }

    getPiTrackingData(trackObject)
    this.tracker.track(trackObject)
    updatePixelSent = true
  }
}

const trackMe = (trackObject, event) => {
  if (!window.trackingQueue) {
    window.trackingQueue = []
  }

  if (!window.TrackLib) {
    if (trackObject) {
      window.trackingQueue.push([trackObject, event])
    }
  } else {
    while (window.trackingQueue.length) {
      const element = window.trackingQueue.shift()
      const trackingInfo = element[0]
      const originalEvent = element[1]

      getPiTrackingData(trackingInfo, originalEvent)
      this.tracker.track(trackingInfo)
    }

    if (trackObject) {
      getPiTrackingData(trackObject, event)
      this.tracker.track(trackObject)
    }
  }
}

window.piTracking = {}
window.piTracking.trackMe = trackMe

const getCookieValue = (cookieName) => {
  const findMe = '(?:^|; )' + cookieName + '=([^;]*)'
  return (document.cookie.match(findMe) || [0, ''])[1]
}

const getPiTrackingData = (trackObject, event) => {
  const consentLevel = +getCookieValue('consentLevel') || 0

  if (window.PageConfig.reco === undefined && window.location.hostname.includes('1und1')) {
    window.PageConfig.reco = 'control'
  }

  trackObject.resu_error = 'none' // TODO: get error message (doesnt exist yet)
  trackObject.sett_consentlevel = consentLevel
  trackObject.cont_tb_bbrowser = '' // TODO: get branded browser (I don't know where from yet but the values are 0 and 1)
  trackObject.cont_category = window.PageConfig.cont_category
  trackObject.cont_lvts = '' + (window.PageConfig.brain || {}).lvts
  trackObject.cont_segment = '' + (window.PageConfig.brain || {}).segment
  trackObject.cont_reco = '' + window.PageConfig.reco
  trackObject.cont_page_id = window.SiteInfo.TrackLibPageId
  trackObject.visit_calc = 1

  if (initDone) {
    trackObject.cont_pagelayout = getComputedStyle(document.documentElement).getPropertyValue('--col-count') + 'col'
  } else {
    document.addEventListener(
      'colCountChanged',
      () => {
        initDone = true
      },
      {
        once: true
      }
    )
  }

  if (window.availableResponse !== undefined) {
    trackObject.sett_privatemode = !window.availableResponse
  } else {
    if (!window.SiteInfo.waitingForUpdatePixel) {
      window.SiteInfo.waitingForUpdatePixel = true

      document.addEventListener('pageVisible', (event) => { updateTrackLibPixel(event.detail) })
    }
  }

  getAndSetClickParams(trackObject)

  if (event) {
    const blockNumber = getBlockNumber(event.target)

    if (blockNumber) {
      const element = document.querySelector('[data-content]')

      for (const child of element.children) {
        if (child.getAttribute('data-content-login') !== null) {
          trackObject.cont_block_name = 'layer'
          break
        }
      }
      trackObject.posi_block = blockNumber
    }
  }
}

const getAndSetClickParams = (trackObject) => {
  let clickParams = []
  let clickParamsRaw

  try {
    clickParamsRaw = getCookie('trace') || (localStorage ? localStorage.getItem('trace') : clickParamsRaw)
  } catch (e) {}

  if (typeof clickParamsRaw === 'string') {
    try {
      let clickParamsObject = JSON.parse(clickParamsRaw)
      if (typeof clickParamsObject.brainZone === 'string') {
        clickParams = clickParamsObject.brainZone.split('.')
      }
    } catch (e) {}
  }

  deleteCookie('trace')

  try {
    localStorage.removeItem('trace')
  } catch (e) {}

  trackObject.cont_src_site = clickParams[1]
  trackObject.cont_src_comp = clickParams[2]
  trackObject.cont_src_title = clickParams[3]
  trackObject.cont_src_posi = clickParams[4]
}

const getCookie = (key) => {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + key + '=')

  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift()
  }
}

const deleteCookie = (key) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

const getBlockNumber = (element) => {
  return getDataAttrValue(element, 'data-block-number')
}

const getDataAttrValue = (element, dataAttribute) => {
  if (element === document.body || element === document) {
    return
  }

  if (element.hasAttribute(dataAttribute)) {
    return element.getAttribute(dataAttribute)
  } else {
    return getDataAttrValue(element.parentElement, dataAttribute)
  }
}

let trackingBrand = getDomainName(window.location.hostname).toLowerCase()

if (trackingBrand === '1und1de') {
  trackingBrand = '1and1access'
}
if (trackingBrand === 'gmxnet') {
  trackingBrand = 'gmxde'
}

const preset = {
  lib: {
    properties: {
      lib: {
        stage: window.PageConfig.stage.includes('qa') ? 'qa' : window.PageConfig.stage
      }
    },
    parameter: {
      soft_name: 'hpll',
      soft_version: window.PageConfig.softwareVersion,
      soft_variant: document.querySelector('html').getAttribute('data-variant-name'), // name des tickets + variantentestname aus sitespect
      brand: trackingBrand // 1and1access, gmx, webde
    }
  }
}

// using a promise cause tracklib isnt ready right away
const trackLibReady = new Promise((resolve) => {
  (function waitForIt () {
    if (window.TrackLib) {
      return resolve()
    }

    setTimeout(waitForIt, 30)
  })()
})

trackLibReady.then(
  () => {
    this.tracker = new window.TrackLib(preset)

    const trackObject = {
      section: `${site}.view`,
      trackingtype: 'pi',
      cont_page_id: window.SiteInfo.TrackLibPageId,
      cont_reco: '',
      visit_calc: 1,
      cont_tcflayer: window.PageConfig.cont_tcflayer || '',
      referrer: window.PageConfig.referrer
    }

    getPiTrackingData(trackObject)
    this.tracker.track(trackObject) // first thing to track (pi)
    // TODO: no js pi pixel is still missing

    // queue abarbeiten
    trackMe() // empty just to trigger the queue process. At this point in time the TrackLib is available
  },
  (error) => {
    console.log(error) // we don't have TrackLib... but should never happen
  }
)
