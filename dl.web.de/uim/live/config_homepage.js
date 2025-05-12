AdService = window.AdService || [];
AdService.push(() => {
	AdService.on('initialize.end', () => {
		const obj = {
			configurations: {
				'visibility-lookahead': 250
			},
			refreshSlots: [],
			refreshConfig: {},
			passbackSlots: ['box_9', 'box_10', 'box_11'],
			exclusionRules: {
				// '_prio': 'prioad',
			},
			prebidRules: () => {
				AdService.setParam('configv', '250416');
				/* targeting */
				let pbTargeting = {};
				AdService.AdSlot('rectangle_layer').setConfig('auto-set-iframe-size', false);
				AdService.AdSlot('rectangle_layer').setSandboxAttributes({'allow-top-navigation-by-user-activation': true, 'allow-top-navigation': true});
				/* xandr id */
				const getCookieValue = (cookie) => {
					const val = document.cookie.match(`(^|;)\\s*${ cookie }\\s*=\\s*([^;]+)`);
					return val ? val.pop() : '';
				};
				/* params */
				const getPlacementName = (tagid, adtype, short) => {
					const separator = short == 2 ? '-' : '|';
					return AdService.getParam('portal') + separator + AdService.getParam('category') + (short == undefined ? separator + AdService.getParam('section') : '') + separator + tagid + separator + AdService.getParam('layoutclass') + (short == undefined ? separator + AdService.getParam('deviceclass') + separator + AdService.getParam('deviceclient') : '') + (adtype !== undefined ? separator + adtype : '');
				};
				/* prebid config */
				const isGmxDe = AdService.getParam('portal') == 'gmx';
				const domain = location.host.split('.').reverse();
				const isDev = location.host.indexOf('.server.lan') !== -1 || location.host.indexOf('dev.') !== -1 || location.host.indexOf('qa.') !== -1 || location.href.indexOf('prebiddebug=1') !== -1;
				// var runIt_simple = AdService.getParam('category') != 'advertorial' && AdService.info.abd().isBlocked != true && AdService.getParam('deviceclient') != 'browser_clean';
				// var runIt = runIt_simple && AdService.getParam('tcf_pur').indexOf(',1,') != -1 && AdService.getParam('tcf_pur').indexOf(',2,') != -1 && AdService.getParam('tcf_pur').indexOf(',3,') != -1 && AdService.getParam('tcf_pur').indexOf(',4,') != -1 && AdService.getParam('tcf_pur').indexOf(',7,') != -1 && AdService.getParam('tcf_pub').indexOf(',1,') != -1 && AdService.getParam('tcf_pub').indexOf(',2,') != -1 && AdService.getParam('tcf_pub').indexOf(',3,') != -1 && AdService.getParam('tcf_pub').indexOf(',4,') != -1 && AdService.getParam('tcf_pub').indexOf(',7,') != -1;
				const runIt = AdService.getParam('category') != 'advertorial' && AdService.getParam('category') != 'shopping' && AdService.info.abd().isBlocked != true && AdService.getParam('deviceclient') != 'browser_clean' && AdService.getParam('tcf_pur').indexOf(',1,2,3,4,5,6,7,8,9,10,') != -1 && AdService.getParam('tcf_pub').indexOf(',1,2,3,4,5,6,7,8,9,10,') != -1 && !!AdService.info._consent.tcString;
				const shb = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'middle', 'right', 'rectangle_layer', 'rectangle_layer_x'];
				if (AdService.getParam('portal') == 'gmx' || AdService.getParam('portal') == 'webde') {
					shb.push('recobox_1');
				}
				let ylId = '';
				let prebidUids;
				try {
					if (typeof(Storage) !== 'undefined') {
						window.addEventListener('message', (e) => {
							if (e.origin.indexOf(`.${domain[1]}.${domain[0]}`) !== -1 && typeof e.data === 'object' && e.data.hasOwnProperty('pbjsuids')) {
								localStorage.setItem('prebid_uids', JSON.stringify(e.data.pbjsuids));
							}
						});
						if (localStorage.getItem('prebid_uids') !== null && runIt) {
							prebidUids = JSON.parse(localStorage.getItem('prebid_uids'));
							let userids = ',';
							for (const uid in prebidUids) {
								if (uid !== 'ylid') {
									userids += `${uid},`;
								}
								if (uid !== 'neorypbjs' && /^[a-z0-9-]{1,20}(\.[a-z]{2,5})?$/g.test(uid) && /^[a-zA-Z0-9_*\-]{1,600}$/g.test(prebidUids[uid])) {
									for (const shbslot in shb) {
										AdService.AdSlot(shb[shbslot]).setParam('userids', userids);
										if (!prebidUids['netid.de']) {
											AdService.setDirectSlotParam(shb[shbslot], 'userid[netid.de]', undefined);
										}
										if (uid !== 'ylid') {
											AdService.setDirectSlotParam(shb[shbslot], `userid[${uid}]`, prebidUids[uid]);
										} else if (uid === 'ylid' && prebidUids.ylid !== '') {
											ylId = prebidUids.ylid != '' && prebidUids.ylid.split('_')[1] !== '' ? prebidUids.ylid.split('_')[1] : undefined;
											AdService.setSlotParam(shb[shbslot], 'ylid', (prebidUids.ylid.indexOf('_') !== -1 ? `_${prebidUids.ylid.split('_')[1]}` : '0'));
											if (prebidUids.ylid.split('_')[0] != '') {
												AdService.setDirectSlotParam(shb[shbslot], 'userid[ylid]', prebidUids.ylid.split('_')[0]);
											}
										}
									}
								}
							}
						}
					}
				} catch (e) {
					console.error(e);
				}
				if (runIt) {
					for (const shbslot in shb) {
						AdService.setDirectSlotParam(shb[shbslot], 'shb', '1');
					}
				}
				const pbConfig = {
					enabled: runIt && location.href.indexOf('disable_prebid=1') == -1 ? true : false,
					iframeUrl: `//dl.${domain[1]}.${domain[0]}/uim/${isDev ? 'dev' : 'live'}/logic_pbjs.html${isDev && document.cookie.indexOf('pbjsdebug=1') !== -1 ? '?pbjs_debug=true&apn_test=true'/* &tripleliftTest=true&tl_bid_tactic_id=701274'*/ : ''}`,
					initial: ['box_2', 'box_3', 'box_4', 'box_5'],
					slotSets: [['box_2', 'box_3', 'box_4', 'box_5'], 'box_2', 'box_3', 'box_4', 'box_5', 'middle', 'right', 'shopping_box_1', 'shopping_box_2', 'rectangle_layer', 'rectangle_layer_x'],
					timeout: !isDev ? (!isGmxDe ? {initial: 2000, slots: [900, 1000, 1200, 1500, 1800, 2100], auctionIframe: 3000} : {initial: 2100, slots: [1200, 1000, 1200, 1500, 1800, 2100], auctionIframe: 3000}) : {initial: 10000, slots: [10000, 10000, 10000, 10000, 10000, 10000], auctionIframe: 10000},
					passover: {
						timeout: !isDev ? (!isGmxDe ? {initial: {bidder: 1700, total: 1900}, slots: [{bidder: 900, total: 9000}, {bidder: 1000, total: 1000}, {bidder: 1200, total: 1200}, {bidder: 1500, total: 1500}, {bidder: 1800, total: 1800}, {bidder: 2100, total: 2100}], cmp: 7000} : {initial: {bidder: 1900, total: 1900}, slots: [{bidder: 1000, total: 9000}, {bidder: 1000, total: 1000}, {bidder: 1200, total: 1200}, {bidder: 1500, total: 1500}, {bidder: 1800, total: 1800}, {bidder: 2100, total: 2100}], cmp: 7000}) : {initial: {bidder: 10000, total: 12000}, slots: [{bidder: 10000, total: 12000}, {bidder: 10000, total: 12000}, {bidder: 10000, total: 12000}, {bidder: 10000, total: 12000}, {bidder: 10000, total: 12000}, {bidder: 10000, total: 12000}], cmp: 7000},
						slots: {},
						initial: ['box_2', 'box_3', 'box_4', 'box_5'],
						params: {consent: AdService.info.consent(), portal: AdService.getParam('portal'), category: AdService.getParam('category'), section: AdService.getParam('section'), layoutclass: AdService.getParam('layoutclass'), deviceclass: AdService.getParam('deviceclass'), deviceclient: AdService.getParam('deviceclient'), customdebug: AdService.getParam('customdebug'), amzn_debug_mode: AdService.getParam('amzn_debug_mode'), external_uid: AdService.getParam('external_uid'), forcetimeout: location.href.indexOf('forcetimeout=1') !== -1, targeting: {prebidtest: location.href.indexOf('prebidtest=1') !== -1 ? '1' : undefined}, testTargeting: {test_targeting: AdService.getParams().test_targeting}, cl: AdService.getParam('cl')}
					}
				};
				if (AdService.getParam('portal') == 'gmx' || AdService.getParam('portal') == 'webde') {
					pbConfig.passover.initial.push('recobox_1');
					pbConfig.initial.push('recobox_1');
					pbConfig.slotSets[0].push('recobox_1');
				}
				const googleSlot = (tagid) => `/139364342,22671916763/${AdService.getParam('portal')}/${AdService.getParam('category')}/${AdService.getParam('section')}/generic/${tagid}`;
				if (window.initialData && window.initialData.hasOwnProperty('serviceResponse') && window.initialData.serviceResponse.hasOwnProperty('response') && window.initialData.serviceResponse.response.hasOwnProperty('type')) {
					if (window.initialData.serviceResponse.response.type == 'billboard' && window.initialData.serviceResponse.response.hasOwnProperty('middle') && window.initialData.serviceResponse.response.middle.hasOwnProperty('ad') && window.initialData.serviceResponse.response.middle.ad.indexOf('<!-- prebid -->') == '0') {
						pbConfig.initial.push('middle');
						pbConfig.passover.initial.push('middle');
						pbConfig.slotSets[0].push('middle');
					} else if (window.initialData.serviceResponse.response.type == 'sitebar' && window.initialData.serviceResponse.response.hasOwnProperty('right') && window.initialData.serviceResponse.response.right.hasOwnProperty('ad') && window.initialData.serviceResponse.response.right.ad.indexOf('<!-- prebid -->') == '0') {
						pbConfig.initial.push('right');
						pbConfig.passover.initial.push('right');
						pbConfig.slotSets[0].push('right');
					}
				}
				const box1Enabled = (AdService.getParam('portal') == 'gmx' || AdService.getParam('portal') == 'webde') && window.PageConfig && window.PageConfig.hasOwnProperty('box1Enabled') && window.PageConfig.box1Enabled === true;
				if (box1Enabled) {
					pbConfig.initial.push('box_1');
					pbConfig.passover.initial.push('box_1');
					pbConfig.slotSets[0].push('box_1');
				}
				if (AdService.getParam('portal') == 'webde' || AdService.getParam('portal') == 'gmx') {
					pbConfig.initial.shift();
					pbConfig.passover.initial.shift();
					pbConfig.slotSets[0].shift();
					pbConfig.slotSets.splice(1, 1);
				}
				if (window.PageConfig && window.PageConfig.hasOwnProperty('shopping') && window.PageConfig.shopping == true) {
					pbConfig.initial.push('shopping_box_1');
					pbConfig.initial.push('shopping_box_2');
					pbConfig.passover.initial.push('shopping_box_1');
					pbConfig.passover.initial.push('shopping_box_2');
					pbConfig.slotSets[0].push('shopping_box_1');
					pbConfig.slotSets[0].push('shopping_box_2');
				}
				if (AdService.getParam('portal') == 'webde') {
					pbConfig.passover.slots = {
						box_1: [{
							code: 'box_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_1', adUnitPath: googleSlot('box_1')},
							bids: [
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_1')}},
								{bidder: 'yieldlab', params: {adslotId: '9941256', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '35265172', position: 'above', keywords: pbTargeting}}
							]
						}, {
							code: 'box_1|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_1', adUnitPath: googleSlot('box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '10741253', supplyId: '13216', targeting: pbTargeting}}
								// {bidder:"appnexus",params:{placementId:"12531092",allowSmallerSizes:true,position:"above",keywords:pbTargeting,video:{skippable:false,startdelay:0,playback_method:"auto_play_sound_off"}}},
								// {bidder:"rubicon",params:{accountId:"21240",siteId:"313612",zoneId:"2408398",video:{language:'en'}}}
							]
						}, {
							code: 'box_1|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_1', adUnitPath: googleSlot('box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '16379361', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '35265174', position: 'above', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}], /*
						/* 'box_1': [{
							code: "box_1|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
							bids: [
								{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
								{bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("box_1","sizeless",1)}},
								{bidder:"yieldlab",params:{adslotId:"9941256",supplyId:"13216",targeting:pbTargeting}},
								{bidder:"taboola",params:{publisherId:"1502998",tagId:getPlacementName("box_1","sizeless",1)}}
							]
						},{
							code: "box_1|outstream", mediaTypes: {video:{context:"outstream",plcmt:4,playerSize:[300,250],mimes:["video/mp4"],protocols: [1,2,3,4,5,6,7,8],api: [1,2,3,4,5],linearity: 1}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
							bids: [
								{bidder:"yieldlab",params:{adslotId:"10741253",supplyId:"13216",targeting:pbTargeting}},
								{bidder:"appnexus",params:{placementId:"12532527",allowSmallerSizes:true,position:"above",keywords:pbTargeting,video:{skippable:false,startdelay:0,playback_method:"auto_play_sound_off"}}},
								{bidder:"rubicon",params:{accountId:"21240",siteId:"313614",zoneId:"2408400",video:{language:'en'}}}
							]
						},{
							amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: [[300,250]]}
						}],
						'box_2': [{
							code: "box_2|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
							bids: [
								{bidder:"appnexus",params:{placementId:"11885893",position:"below",keywords:pbTargeting}},
								{bidder:"appnexus",params:{placementId:"22047052",position:"below",keywords:pbTargeting}},//PSP
								{bidder:"ix",params:{siteId:"461721"}},
								{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"2588137"}},
								{bidder:"rubicon",params:{accountId:"21240",siteId:"273288",zoneId:"1577948",position:"btf"}},
								{bidder:"yieldlab",params:{adslotId:"11175771",supplyId:"13216",targeting:pbTargeting}},
								{bidder:"adform",params:{mid:"930252"}},
								{bidder:"adform",params:{mid:"955423"}},
								{bidder:"taboola",params:{publisherId:"1502998",tagId:getPlacementName("box_2","sizeless",1)}}
							]
						},{
							code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:true}}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
							bids: [
								{bidder:"appnexus",params:{placementId:"12592369",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
								{bidder:"yieldlab",params:{adslotId:"11235777",supplyId:"13216",targeting:pbTargeting}}
							]
						},{
							amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: [[300,250]]}
						}],*/
						box_3: [{
							code: 'box_3|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								...(!box1Enabled ? [{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_3')}}] : []),
								{bidder: 'adform', params: {mid: '1619366'}},
								{bidder: 'adform', params: {mid: '1619368'}}, // PMP
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313614', zoneId: '2728776', position: 'btf'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '4892071'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('box_3', 'sizeless', 1)}},
								{bidder: 'appnexus', params: {placementId: '11885893', position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047052', position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'yieldlab', params: {adslotId: '11176116', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_3', 'medium_rectangle', 2)}},
								{bidder: 'taboola', params: {publisherId: '1502998', tagId: getPlacementName('box_3', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_3|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '12592369', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235817', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_3|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313614', zoneId: '2728774', video: {language: 'en'}}},
								{bidder: 'appnexus', params: {placementId: '12532527', allowSmallerSizes: true, position: 'above', keywords: pbTargeting, video: {skippable: false, startdelay: 0, playback_method: 'auto_play_sound_off'}}},
								{bidder: 'yieldlab', params: {adslotId: '14887705', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_3', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_4: [{
							code: 'box_4|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_4', 'medium_rectangle', 2)}},
								{bidder: 'appnexus', params: {placementId: '11885893', position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '14887721', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'ix', params: {siteId: '936091'}},
								{bidder: 'smart', params: {siteId: '290463', pageId: '1732981', formatId: '75978'}}/* ,
						{bidder:"taboola",params:{publisherId:"1502998",tagId:getPlacementName("box_4","medium_rectangle",1)}}*/
							]
						}, {
							code: 'box_4|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_4')}},
								{bidder: 'appnexus', params: {placementId: '12592369', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047873', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'yieldlab', params: {adslotId: '11235854', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_4|adf', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true, aspect_ratios: [{min_width: 300, min_height: 168, ratio_width: 16, ratio_height: 9}]}, title: {required: true, len: 40}, icon: {required: false, aspect_ratios: [{min_width: 10, min_height: 10, ratio_width: 1, ratio_height: 1}]}, body: {required: true}, sponsoredBy: {required: false}, clickUrl: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'adform', params: {mid: '1619377'}},
								{bidder: 'adform', params: {mid: '1619378'}} // PMP
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_4', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_5: [{
							code: 'box_5|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'improvedigital', params: {placementId: '22916422', publisherId: 1258}},
								{bidder: 'appnexus', params: {placementId: '11885893', position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '14887778', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'openx', params: {unit: '540973784', delDomain: 'united-internet-d.openx.net'}}/* ,
						{bidder:"taboola",params:{publisherId:"1502998",tagId:getPlacementName("box_5","medium_rectangle",1)}}*/
							]
						}, {
							code: 'box_5|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '12592369', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235897', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_5', 'sizeless'), sizes: [[300, 250]]}
						}],
						shopping_box_1: [{
							code: 'shopping_box_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385172', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'shopping_box_1|yield', mediaTypes: {banner: {sizes: [[1, 1]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385175', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						shopping_box_2: [{
							code: 'shopping_box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21618320', position: 'below', keywords: pbTargeting}}
							]
						}, {
							code: 'shopping_box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21618321', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						rectangle_layer: [{
							code: 'rectangle_layer|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'rectangle_layer', adUnitPath: googleSlot('rectangle_layer')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11885893', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '337052', supplyId: '9548', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('rectangle_layer')}},
								{bidder: 'ix', params: {siteId: '343268'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '1855061'}},
								{bidder: 'smart', params: {siteId: '290463', pageId: '1066217', formatId: '75979'}},
								{bidder: 'openx', params: {unit: '540696702', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('rectangle_layer', 'sizeless', 1)}},
								{bidder: 'improvedigital', params: {placementId: '22049073', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273288', zoneId: '1362756', position: 'atf'}},
								{bidder: 'adform', params: {mid: '930249'}},
								{bidder: 'adform', params: {mid: '955420'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('rectangle_layer', 'halfpage_ad', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('rectangle_layer', 'sizeless'), sizes: [[300, 600]]}
						}],
						right: [{
							code: 'right|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13894639', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '6338282', supplyId: '13216', extId: ylId, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('right')}},
								{bidder: 'ix', params: {siteId: '369807'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2094892'}},
								{bidder: 'smart', params: {siteId: '290463', pageId: '1092995', formatId: '75979'}},
								{bidder: 'openx', params: {unit: '540696702', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('right', 'sizeless', 1)}},
								{bidder: 'improvedigital', params: {placementId: '22049072', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313614', zoneId: '1597856', position: 'atf'}},
								{bidder: 'adform', params: {mid: '930250'}},
								{bidder: 'adform', params: {mid: '955421'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('right', 'halfpage_ad', 2)}}
							]
						}, {
							code: 'right|sitebar', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '8654525', supplyId: '13216'}},
								{bidder: 'appnexus', params: {placementId: '20229018', position: 'above', keywords: pbTargeting}},
								{bidder: 'adform', params: {mid: '975866'}},
								{bidder: 'adform', params: {mid: '975873'}},
								{bidder: 'smart', params: {siteId: '290463', pageId: '1997884', formatId: '125390'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('right', 'sizeless'), sizes: [[300, 600]]}
						}],
						middle: [{
							code: 'middle|all', mediaTypes: {banner: {sizes: [[970, 250], [800, 250]]}}, pubstack: {adUnitName: 'middle', adUnitPath: googleSlot('middle')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11885893', position: 'above', keywords: pbTargeting}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('middle')}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('middle', 'sizeless', 1)}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2574067'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273288', zoneId: '1362740', position: 'atf'}},
								{bidder: 'smart', params: {siteId: '290463', pageId: '1236234', formatId: '88173'}},
								{bidder: 'adform', params: {mid: '930308'}},
								{bidder: 'adform', params: {mid: '955441'}},
								{bidder: 'yieldlab', params: {adslotId: '465722', supplyId: '13216'}},
								{bidder: 'ix', params: {siteId: '341206'}},
								{bidder: 'openx', params: {unit: '540696699', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'improvedigital', params: {placementId: '22049070', publisherId: 1258}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('middle', 'billboard', 2)}}
								// {bidder:"taboola",params:{publisherId:"1502998",tagId:getPlacementName("middle","sizeless",1)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('middle', 'sizeless'), sizes: [[970, 250], [800, 250]]}
						}],
						recobox_1: [{
							code: 'recobox_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'recobox_1', adUnitPath: googleSlot('recobox_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '16379403', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'appnexus', params: {placementId: '35265165', position: 'above', keywords: pbTargeting}}
							]
						}, {
							code: 'recobox_1|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'recobox_1', adUnitPath: googleSlot('recobox_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '16379520', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '35265167', position: 'above', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}]
					};
					if (isDev && location.href.indexOf('showvideo=1')!==-1) {
						pbConfig.initial = ['box_1'];pbConfig.passover.initial = ['box_1'];pbConfig.slotSets = [['box_1']];
						pbConfig.passover.slots = {box_1: [{code: 'box_1|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250]}}, bids: [{bidder: 'appnexus', params: {placementId: '12532527', allowSmallerSizes: true, position: 'above', keywords: pbTargeting, video: {skippable: false, startdelay: 0, playback_method: 'auto_play_sound_off'}}}]}, {amazon: false}]};
						pbTargeting = Object.assign({salat: 'kartoffel'}, pbTargeting);
					}
					if (location.href.indexOf('neory=1')!==-1) {
						pbConfig.passover.slots.box_1[0].bids.push({bidder: 'neory', params: {zoneUid: '7j6wlzh4rhq4', domain: 'ad.ad-srv.net', mpid: {netId: 'beef1337'}}});
						pbConfig.passover.slots.box_2[1].bids.push({bidder: 'neory', params: {zoneUid: 'yywbguj6il1h', domain: 'd.c.cdnsrv.de', mpid: {netId: 'beef1337'}}});
					}
				} else if (AdService.getParam('portal') == 'gmx') {
					pbConfig.passover.slots = {
						box_1: [{
							code: 'box_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_1', adUnitPath: googleSlot('box_1')},
							bids: [
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_1')}},
								{bidder: 'yieldlab', params: {adslotId: '9941261', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '35265143', position: 'above', keywords: pbTargeting}}
							]
						}, {
							code: 'box_1|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_1', adUnitPath: googleSlot('box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '10741086', supplyId: '13216', targeting: pbTargeting}}
								// {bidder:"appnexus",params:{placementId:"12531092",allowSmallerSizes:true,position:"above",keywords:pbTargeting,video:{skippable:false,startdelay:0,playback_method:"auto_play_sound_off"}}},
								// {bidder:"rubicon",params:{accountId:"21240",siteId:"313612",zoneId:"2408398",video:{language:'en'}}}
							]
						}, {
							code: 'box_1|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_1', adUnitPath: googleSlot('box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '16175262', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '35265145', position: 'above', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}], /*
						'box_2': [{
							code: "box_2|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
							bids: [
								{bidder:"appnexus",params:{placementId:"11885759",position:"below",keywords:pbTargeting}},
								{bidder:"appnexus",params:{placementId:"22047042",position:"below",keywords:pbTargeting}},//PSP
								{bidder:"ix",params:{siteId:"461722"}},
								{bidder:"pubmatic",params:{publisherId:"157878",adSlot:"2588138"}},
								{bidder:"rubicon",params:{accountId:"21240",siteId:"273266",zoneId:"1577950",position:"btf"}},
								{bidder:"yieldlab",params:{adslotId:"11175831",supplyId:"13216",targeting:pbTargeting}},
								{bidder:"adform",params:{mid:"927817"}},
								{bidder:"adform",params:{mid:"955395"}}
							]
						},{
							code: "box_2|native", sizes: [[1,1]], mediaTypes: {native:{image:{required:true},title:{required:true},icon:{required:false},body:{required:true}}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
							bids: [
								{bidder:"appnexus",params:{placementId:"13715158",allowSmallerSizes:true,position:"below",keywords:pbTargeting}},
								{bidder:"yieldlab",params:{adslotId:"11235775",supplyId:"13216",targeting:pbTargeting}}
							]
						},{
							amazon: true, params: {slotID: getPlacementName("box_2","sizeless"), sizes: [[300,250]]}
						}],*/
						box_3: [{
							code: 'box_3|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								...(!box1Enabled ? [{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_3')}}] : []),
								{bidder: 'adform', params: {mid: '1619360'}},
								{bidder: 'adform', params: {mid: '1619362'}}, // PMP
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313612', zoneId: '2728772', position: 'btf'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '4892067'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('box_3', 'sizeless', 1)}},
								{bidder: 'yieldlab', params: {adslotId: '11176122', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'appnexus', params: {placementId: '11885759', position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047042', position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_3', 'medium_rectangle', 2)}},
								{bidder: 'taboola', params: {publisherId: '1503000', tagId: getPlacementName('box_3', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_3|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715158', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235823', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_3|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313612', zoneId: '2728770', video: {language: 'en'}}},
								{bidder: 'appnexus', params: {placementId: '12531092', allowSmallerSizes: true, position: 'above', keywords: pbTargeting, video: {skippable: false, startdelay: 0, playback_method: 'auto_play_sound_off'}}},
								{bidder: 'yieldlab', params: {adslotId: '14887713', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_3', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_4: [{
							code: 'box_4|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_4', 'medium_rectangle', 2)}},
								{bidder: 'appnexus', params: {placementId: '11885759', position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '14887763', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'ix', params: {siteId: '936090'}},
								{bidder: 'smart', params: {siteId: '290462', pageId: '1732978', formatId: '75978'}}/* ,
						{bidder:"taboola",params:{publisherId:"1503000",tagId:getPlacementName("box_4","medium_rectangle",1)}}*/
							]
						}, {
							code: 'box_4|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_4')}},
								{bidder: 'appnexus', params: {placementId: '13715158', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047868', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'yieldlab', params: {adslotId: '11235872', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_4|adf', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true, aspect_ratios: [{min_width: 300, min_height: 168, ratio_width: 16, ratio_height: 9}]}, title: {required: true, len: 40}, icon: {required: false, aspect_ratios: [{min_width: 10, min_height: 10, ratio_width: 1, ratio_height: 1}]}, body: {required: true}, sponsoredBy: {required: false}, clickUrl: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'adform', params: {mid: '1619371'}},
								{bidder: 'adform', params: {mid: '1619374'}} // PMP
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_4', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_5: [{
							code: 'box_5|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'improvedigital', params: {placementId: '22916421', publisherId: 1258}},
								{bidder: 'appnexus', params: {placementId: '11885759', position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '14887769', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'openx', params: {unit: '540973786', delDomain: 'united-internet-d.openx.net'}}/* ,
						{bidder:"taboola",params:{publisherId:"1503000",tagId:getPlacementName("box_5","medium_rectangle",1)}}*/
							]
						}, {
							code: 'box_5|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715158', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235903', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_5', 'sizeless'), sizes: [[300, 250]]}
						}],
						shopping_box_1: [{
							code: 'shopping_box_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12384855', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'shopping_box_1|yield', mediaTypes: {banner: {sizes: [[1, 1]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385164', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						shopping_box_2: [{
							code: 'shopping_box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21618258', position: 'below', keywords: pbTargeting}}
							]
						}, {
							code: 'shopping_box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21618261', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						rectangle_layer: [{
							code: 'rectangle_layer|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'rectangle_layer', adUnitPath: googleSlot('rectangle_layer')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11885759', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '337048', supplyId: '5', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('rectangle_layer')}},
								{bidder: 'ix', params: {siteId: '343251'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '1855043'}},
								{bidder: 'smart', params: {siteId: '290462', pageId: '1066205', formatId: '75979'}},
								{bidder: 'openx', params: {unit: '540696654', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('rectangle_layer', 'sizeless', 1)}},
								{bidder: 'improvedigital', params: {placementId: '22049055', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273266', zoneId: '1362566', position: 'atf'}},
								{bidder: 'adform', params: {mid: '927810'}},
								{bidder: 'adform', params: {mid: '955392'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('rectangle_layer', 'halfpage_ad', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('rectangle_layer', 'sizeless'), sizes: [[300, 600]]}
						}],
						right: [{
							code: 'right|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13894642', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '6338279', supplyId: '13216', extId: ylId, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('right')}},
								{bidder: 'ix', params: {siteId: '369806'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2094893'}},
								{bidder: 'smart', params: {siteId: '290462', pageId: '1691137', formatId: '88173'}},
								{bidder: 'openx', params: {unit: '540696654', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('right', 'sizeless', 1)}},
								{bidder: 'improvedigital', params: {placementId: '22049054', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313612', zoneId: '1597830', position: 'atf'}},
								{bidder: 'adform', params: {mid: '927808'}},
								{bidder: 'adform', params: {mid: '955391'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('right', 'halfpage_ad', 2)}}
							]
						}, {
							code: 'right|sitebar', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '8654531', supplyId: '13216'}},
								{bidder: 'appnexus', params: {placementId: '20229017', position: 'above', keywords: pbTargeting}},
								{bidder: 'adform', params: {mid: '975833'}},
								{bidder: 'adform', params: {mid: '975857'}},
								{bidder: 'smart', params: {siteId: '290462', pageId: '1997880', formatId: '125390'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('right', 'sizeless'), sizes: [[300, 600]]}
						}],
						middle: [{
							code: 'middle|all', mediaTypes: {banner: {sizes: [[970, 250], [800, 250]]}}, pubstack: {adUnitName: 'middle', adUnitPath: googleSlot('middle')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11885759', position: 'above', keywords: pbTargeting}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('middle')}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('middle', 'sizeless', 1)}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2574068'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273266', zoneId: '1362558', position: 'atf'}},
								{bidder: 'smart', params: {siteId: '290462', pageId: '1236229', formatId: '88173'}},
								{bidder: 'adform', params: {mid: '927828'}},
								{bidder: 'adform', params: {mid: '955400'}},
								{bidder: 'yieldlab', params: {adslotId: '424058', supplyId: '13216'}},
								{bidder: 'ix', params: {siteId: '341975'}},
								{bidder: 'openx', params: {unit: '540696651', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'improvedigital', params: {placementId: '22049052', publisherId: 1258}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('middle', 'billboard', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('middle', 'sizeless'), sizes: [[970, 250], [800, 250]]}
						}],
						recobox_1: [{
							code: 'recobox_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'recobox_1', adUnitPath: googleSlot('recobox_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '16252316', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'appnexus', params: {placementId: '35265036', position: 'above', keywords: pbTargeting}}
							]
						}, {
							code: 'recobox_1|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'recobox_1', adUnitPath: googleSlot('recobox_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '16252350', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '35265140', position: 'above', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}]
					};
				} else if (AdService.getParam('portal') == 'gmxat') {
					pbConfig.passover.slots = {
						/* 'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"criteo",params:{networkId:"1400",publisherSubId:getPlacementName("box_1")}},
						// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("box_1","sizeless",1)}},
						{bidder:"yieldlab",params:{adslotId:"9941264",supplyId:"13216",targeting:pbTargeting}}
					]
				},{
					code: "box_1|outstream", mediaTypes: {video:{context:"outstream",plcmt:4,playerSize:[300,250],mimes:["video/mp4"],protocols: [1,2,3,4,5,6,7,8],api: [1,2,3,4,5],linearity: 1}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"yieldlab",params:{adslotId:"10741528",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"appnexus",params:{placementId:"20871935",allowSmallerSizes:true,position:"above",keywords:pbTargeting,video:{skippable:false,startdelay:0,playback_method:"auto_play_sound_off"}}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"313608",zoneId:"2408394",video:{language:'en'}}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: [[300,250]]}
				}],*/
						box_2: [{
							code: 'box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945828', position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047034', position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'criteo', params: {networkId: '1400', publisherSubId: getPlacementName('box_2')}},
								{bidder: 'ix', params: {siteId: '461723'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2588139'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273332', zoneId: '1577952', position: 'btf'}},
								{bidder: 'yieldlab', params: {adslotId: '11175855', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'adform', params: {mid: '929726'}},
								{bidder: 'taboola', params: {publisherId: '1503006', tagId: getPlacementName('box_2', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715178', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235790', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_2|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313608', zoneId: '2728764', video: {language: 'en'}}},
								{bidder: 'appnexus', params: {placementId: '20871935', allowSmallerSizes: true, position: 'above', keywords: pbTargeting, video: {skippable: false, startdelay: 0, playback_method: 'auto_play_sound_off'}}},
								{bidder: 'yieldlab', params: {adslotId: '14887675', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_2', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_3: [{
							code: 'box_3|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945828', position: 'below', keywords: pbTargeting}},
								{bidder: 'improvedigital', params: {placementId: '22222946', publisherId: 1258}},
								{bidder: 'openx', params: {unit: '540973788', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'smart', params: {siteId: '288345', pageId: '1193045', formatId: '88173'}},
								{bidder: 'yieldlab', params: {adslotId: '11176141', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_3', 'medium_rectangle', 2)}},
								{bidder: 'taboola', params: {publisherId: '1503006', tagId: getPlacementName('box_3', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_3|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715178', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047863', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'criteo', params: {networkId: '1400', publisherSubId: getPlacementName('box_3')}},
								{bidder: 'yieldlab', params: {adslotId: '11235830', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_3|adf', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true, aspect_ratios: [{min_width: 300, min_height: 168, ratio_width: 16, ratio_height: 9}]}, title: {required: true, len: 40}, icon: {required: false, aspect_ratios: [{min_width: 10, min_height: 10, ratio_width: 1, ratio_height: 1}]}, body: {required: true}, sponsoredBy: {required: false}, clickUrl: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'adform', params: {mid: '1109187'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_3', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_4: [{
							code: 'box_4|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715178', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235879', supplyId: '13216', targeting: pbTargeting}}
							]
						}/* ,{
					code: "box_4|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"taboola",params:{publisherId:"1503006",tagId:getPlacementName("box_4","medium_rectangle",1)}}
					]
				}*/, {
							amazon: false
						}],
						box_5: [{
							code: 'box_5|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715178', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235910', supplyId: '13216', targeting: pbTargeting}}
							]
						}/* ,{
					code: "box_5|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"taboola",params:{publisherId:"1503006",tagId:getPlacementName("box_5","medium_rectangle",1)}}
					]
				}*/, {
							amazon: false
						}],
						shopping_box_1: [{
							code: 'shopping_box_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385205', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'shopping_box_1|yield', mediaTypes: {banner: {sizes: [[1, 1]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385211', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						shopping_box_2: [{
							code: 'shopping_box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21629754', position: 'below', keywords: pbTargeting}}
							]
						}, {
							code: 'shopping_box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21629786', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						rectangle_layer: [{
							code: 'rectangle_layer|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'rectangle_layer', adUnitPath: googleSlot('rectangle_layer')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945828', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '337056', supplyId: '2716', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '1400', publisherSubId: getPlacementName('rectangle_layer')}},
								{bidder: 'ix', params: {siteId: '343285'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '1855079'}},
								{bidder: 'smart', params: {siteId: '288345', pageId: '1065881', formatId: '75979'}},
								{bidder: 'openx', params: {unit: '540696463', delDomain: 'united-internet-d.openx.net'}},
								// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("rectangle_layer","sizeless",1)}},
								{bidder: 'improvedigital', params: {placementId: '22049090', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273332', zoneId: '1363468', position: 'atf'}},
								{bidder: 'adform', params: {mid: '929723'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('rectangle_layer', 'halfpage_ad', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('rectangle_layer', 'sizeless'), sizes: [[300, 600]]}
						}],
						right: [{
							code: 'right|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945828', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '10110585', supplyId: '13216'}},
								{bidder: 'criteo', params: {networkId: '1400', publisherSubId: getPlacementName('right')}},
								// {bidder:"ix",params:{siteId:"412107"}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2652793'}},
								{bidder: 'smart', params: {siteId: '288345', pageId: '1203076', formatId: '88173'}},
								{bidder: 'openx', params: {unit: '541001529', delDomain: 'united-internet-d.openx.net'}},
								// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("right","sizeless",1)}},
								{bidder: 'improvedigital', params: {placementId: '23051514', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273332', zoneId: '3114528', position: 'atf'}},
								{bidder: 'adform', params: {mid: '1811445'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('right', 'halfpage_ad', 2)}}
							]
						}, {
							code: 'right|sitebar', mediaTypes: {banner: {sizes: [[300, 600], [500, 1000]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '10269284', supplyId: '13216'}},
								{bidder: 'appnexus', params: {placementId: '20229014', position: 'above', keywords: pbTargeting}},
								{bidder: 'adform', params: {mid: '1811446'}},
								{bidder: 'smart', params: {siteId: '288345', pageId: '1906750', formatId: '125390'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('right', 'sizeless'), sizes: [[300, 600]]}
						}],
						middle: [{
							code: 'middle|all', mediaTypes: {banner: {sizes: [[970, 250], [800, 250]]}}, pubstack: {adUnitName: 'middle', adUnitPath: googleSlot('middle')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945828', position: 'above', keywords: pbTargeting}},
								{bidder: 'criteo', params: {networkId: '1400', publisherSubId: getPlacementName('middle')}},
								// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("middle","sizeless",1)}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2652791'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313608', zoneId: '1597798', position: 'atf'}},
								{bidder: 'smart', params: {siteId: '288345', pageId: '1203073', formatId: '88173'}},
								{bidder: 'adform', params: {mid: '929760'}},
								{bidder: 'yieldlab', params: {adslotId: '10110206', supplyId: '13216'}},
								{bidder: 'ix', params: {siteId: '341976'}},
								{bidder: 'openx', params: {unit: '541000473', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'improvedigital', params: {placementId: '22136243', publisherId: 1258}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('middle', 'billboard', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('middle', 'sizeless'), sizes: [[970, 250], [800, 250]]}
						}]
					};
				} else if (AdService.getParam('portal') == 'gmxch') {
					pbConfig.passover.slots = {
						/* 'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"criteo",params:{networkId:"1399",publisherSubId:getPlacementName("box_1")}},
						// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("box_1","sizeless",1)}},
						{bidder:"yieldlab",params:{adslotId:"9941268",supplyId:"13216",targeting:pbTargeting}}
					]
				},{
					code: "box_1|outstream", mediaTypes: {video:{context:"outstream",plcmt:4,playerSize:[300,250],mimes:["video/mp4"],protocols: [1,2,3,4,5,6,7,8],api: [1,2,3,4,5],linearity: 1}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"yieldlab",params:{adslotId:"10741534",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"appnexus",params:{placementId:"20871941",allowSmallerSizes:true,position:"above",keywords:pbTargeting,video:{skippable:false,startdelay:0,playback_method:"auto_play_sound_off"}}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"313610",zoneId:"2408396",video:{language:'en'}}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: [[300,250]]}
				}],*/
						box_2: [{
							code: 'box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945832', position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047037', position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'criteo', params: {networkId: '1399', publisherSubId: getPlacementName('box_2')}},
								{bidder: 'ix', params: {siteId: '461724'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2588140'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273334', zoneId: '1577954', position: 'btf'}},
								{bidder: 'yieldlab', params: {adslotId: '11175966', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'adform', params: {mid: '929775'}},
								{bidder: 'taboola', params: {publisherId: '1503008', tagId: getPlacementName('box_2', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715190', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235797', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_2|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313610', zoneId: '2728766', video: {language: 'en'}}},
								{bidder: 'appnexus', params: {placementId: '20871941', allowSmallerSizes: true, position: 'above', keywords: pbTargeting, video: {skippable: false, startdelay: 0, playback_method: 'auto_play_sound_off'}}},
								{bidder: 'yieldlab', params: {adslotId: '14887686', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_2', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_3: [{
							code: 'box_3|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945832', position: 'below', keywords: pbTargeting}},
								{bidder: 'improvedigital', params: {placementId: '22222947', publisherId: 1258}},
								{bidder: 'openx', params: {unit: '540973791', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'smart', params: {siteId: '290457', pageId: '1193046', formatId: '88173'}},
								{bidder: 'yieldlab', params: {adslotId: '11176145', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_3', 'medium_rectangle', 2)}},
								{bidder: 'taboola', params: {publisherId: '1503008', tagId: getPlacementName('box_3', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_3|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715190', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047865', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'criteo', params: {networkId: '1399', publisherSubId: getPlacementName('box_3')}},
								{bidder: 'yieldlab', params: {adslotId: '11235833', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_3|adf', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true, aspect_ratios: [{min_width: 300, min_height: 168, ratio_width: 16, ratio_height: 9}]}, title: {required: true, len: 40}, icon: {required: false, aspect_ratios: [{min_width: 10, min_height: 10, ratio_width: 1, ratio_height: 1}]}, body: {required: true}, sponsoredBy: {required: false}, clickUrl: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'adform', params: {mid: '1152841'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_3', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_4: [{
							code: 'box_4|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715190', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235884', supplyId: '13216', targeting: pbTargeting}}
							]
						}/* ,{
					code: "box_4|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"box_4",adUnitPath:googleSlot("box_4")},
					bids: [
						{bidder:"taboola",params:{publisherId:"1503008",tagId:getPlacementName("box_4","medium_rectangle",1)}}
					]
				}*/, {
							amazon: false
						}],
						box_5: [{
							code: 'box_5|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13715190', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235913', supplyId: '13216', targeting: pbTargeting}}
							]
						}/* ,{
					code: "box_5|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"box_5",adUnitPath:googleSlot("box_5")},
					bids: [
						{bidder:"taboola",params:{publisherId:"1503008",tagId:getPlacementName("box_5","medium_rectangle",1)}}
					]
				}*/, {
							amazon: false
						}],
						shopping_box_1: [{
							code: 'shopping_box_1|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385215', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'shopping_box_1|yield', mediaTypes: {banner: {sizes: [[1, 1]]}}, pubstack: {adUnitName: 'shopping_box_1', adUnitPath: googleSlot('shopping_box_1')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '12385218', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						shopping_box_2: [{
							code: 'shopping_box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21629979', position: 'below', keywords: pbTargeting}}
							]
						}, {
							code: 'shopping_box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'shopping_box_2', adUnitPath: googleSlot('shopping_box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '21630006', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}
							]
						}, {
							amazon: false
						}],
						rectangle_layer: [{
							code: 'rectangle_layer|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'rectangle_layer', adUnitPath: googleSlot('rectangle_layer')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945832', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '337060', supplyId: '7256', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '1399', publisherSubId: getPlacementName('rectangle_layer')}},
								{bidder: 'ix', params: {siteId: '343302'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '1855097'}},
								{bidder: 'smart', params: {siteId: '290457', pageId: '1066187', formatId: '75979'}},
								{bidder: 'openx', params: {unit: '540696495', delDomain: 'united-internet-d.openx.net'}},
								// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("rectangle_layer","sizeless",1)}},
								{bidder: 'improvedigital', params: {placementId: '22049107', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '273334', zoneId: '1363514', position: 'atf'}},
								{bidder: 'adform', params: {mid: '929772'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('rectangle_layer', 'halfpage_ad', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('rectangle_layer', 'sizeless'), sizes: [[300, 600]]}
						}],
						right: [{
							code: 'right|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945832', position: 'above', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '10110582', supplyId: '13216'}},
								{bidder: 'criteo', params: {networkId: '1399', publisherSubId: getPlacementName('right')}},
								{bidder: 'ix', params: {siteId: '412107'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2652794'}},
								{bidder: 'smart', params: {siteId: '290457', pageId: '1203076', formatId: '75979'}},
								{bidder: 'openx', params: {unit: '541001528', delDomain: 'united-internet-d.openx.net'}},
								// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("right","sizeless",1)}},
								{bidder: 'improvedigital', params: {placementId: '22239183', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313610', zoneId: '1597816', position: 'atf'}},
								{bidder: 'adform', params: {mid: '929773'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('right', 'halfpage_ad', 2)}}
							]
						}, {
							code: 'right|sitebar', mediaTypes: {banner: {sizes: [[300, 600], [500, 1000]]}}, pubstack: {adUnitName: 'right', adUnitPath: googleSlot('right')},
							bids: [
								{bidder: 'yieldlab', params: {adslotId: '10269287', supplyId: '13216'}},
								{bidder: 'appnexus', params: {placementId: '20229002', position: 'above', keywords: pbTargeting}},
								{bidder: 'adform', params: {mid: '975660'}},
								{bidder: 'improvedigital', params: {placementId: '23177638', publisherId: 1258}},
								{bidder: 'smart', params: {siteId: '290457', pageId: '1997876', formatId: '125390'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('right', 'sizeless'), sizes: [[300, 600]]}
						}],
						middle: [{
							code: 'middle|all', mediaTypes: {banner: {sizes: [[970, 250], [800, 250], [994, 250]]}}, pubstack: {adUnitName: 'middle', adUnitPath: googleSlot('middle')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '11945832', position: 'above', keywords: pbTargeting}},
								{bidder: 'criteo', params: {networkId: '1399', publisherSubId: getPlacementName('middle')}},
								// {bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("middle","sizeless",1)}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2652792'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313610', zoneId: '1597814', position: 'atf'}},
								{bidder: 'smart', params: {siteId: '290457', pageId: '1203075', formatId: '88173'}},
								{bidder: 'adform', params: {mid: '929825'}},
								{bidder: 'yieldlab', params: {adslotId: '10110212', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'ix', params: {siteId: '341977'}},
								{bidder: 'openx', params: {unit: '541001518', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'improvedigital', params: {placementId: '22136244', publisherId: 1258}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('middle', 'billboard', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('middle', 'sizeless'), sizes: [[970, 250], [800, 250], [994, 250]]}
						}]
					};
				} else if (AdService.getParam('portal') == '1und1') {
					pbConfig.passover.slots = {
						/* 'box_1': [{
					code: "box_1|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"criteo",params:{networkId:"2558",publisherSubId:getPlacementName("box_1")}},
						{bidder:"orbidder",params:{accountId:"uim",placementId:getPlacementName("box_1","sizeless",1)}},
						{bidder:"yieldlab",params:{adslotId:"9749278",supplyId:"13216",targeting:pbTargeting}}
					]
				},{
					code: "box_1|outstream", mediaTypes: {video:{context:"outstream",plcmt:4,playerSize:[300,250],mimes:["video/mp4"],protocols: [1,2,3,4,5,6,7,8],api: [1,2,3,4,5],linearity: 1}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"yieldlab",params:{adslotId:"11286115",supplyId:"13216",targeting:pbTargeting}},
						{bidder:"appnexus",params:{placementId:"20871930",allowSmallerSizes:true,position:"above",keywords:pbTargeting,video:{skippable:false,startdelay:0,playback_method:"auto_play_sound_off"}}},
						{bidder:"rubicon",params:{accountId:"21240",siteId:"313556",zoneId:"2408386",video:{language:'en'}}}
					]
				},{
					amazon: true, params: {slotID: getPlacementName("box_1","sizeless"), sizes: [[300,250]]}
				}],*/
						box_2: [{
							code: 'box_2|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13108294', position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047032', position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_2')}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('box_2', 'sizeless', 1)}},
								{bidder: 'ix', params: {siteId: '412367'}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2996765'}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313556', zoneId: '1763304', position: 'btf'}},
								{bidder: 'yieldlab', params: {adslotId: '11176032', supplyId: '13216', targeting: pbTargeting}},
								{bidder: 'adform', params: {mid: '929535'}},
								{bidder: 'taboola', params: {publisherId: '1503012', tagId: getPlacementName('box_2', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_2|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '19601867', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235785', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_2|outstream', mediaTypes: {video: {context: 'outstream', plcmt: 4, playerSize: [300, 250], mimes: ['video/mp4'], protocols: [1, 2, 3, 4, 5, 6, 7, 8], api: [1, 2, 3, 4, 5], linearity: 1}}, pubstack: {adUnitName: 'box_2', adUnitPath: googleSlot('box_2')},
							bids: [
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '313556', zoneId: '2728768', video: {language: 'en'}}},
								{bidder: 'appnexus', params: {placementId: '20871930', allowSmallerSizes: true, position: 'above', keywords: pbTargeting, video: {skippable: false, startdelay: 0, playback_method: 'auto_play_sound_off'}}},
								{bidder: 'yieldlab', params: {adslotId: '14887664', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_2', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_3: [{
							code: 'box_3|all', mediaTypes: {banner: {sizes: [[300, 250]]}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13108294', position: 'below', keywords: pbTargeting}},
								{bidder: 'improvedigital', params: {placementId: '22222940', publisherId: 1258}},
								{bidder: 'openx', params: {unit: '540973784', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'smart', params: {siteId: '290463', pageId: '1193048', formatId: '88173'}},
								{bidder: 'yieldlab', params: {adslotId: '11176149', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('box_3', 'medium_rectangle', 2)}},
								{bidder: 'taboola', params: {publisherId: '1503012', tagId: getPlacementName('box_3', 'medium_rectangle', 1)}}
							]
						}, {
							code: 'box_3|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '19601867', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'appnexus', params: {placementId: '22047859', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}}, // PSP
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('box_3')}},
								{bidder: 'yieldlab', params: {adslotId: '11235837', supplyId: '13216', targeting: pbTargeting}}
							]
						}, {
							code: 'box_3|adf', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true, aspect_ratios: [{min_width: 300, min_height: 168, ratio_width: 16, ratio_height: 9}]}, title: {required: true, len: 40}, icon: {required: false, aspect_ratios: [{min_width: 10, min_height: 10, ratio_width: 1, ratio_height: 1}]}, body: {required: true}, sponsoredBy: {required: false}, clickUrl: {required: true}}}, pubstack: {adUnitName: 'box_3', adUnitPath: googleSlot('box_3')},
							bids: [
								{bidder: 'adform', params: {mid: '1152424'}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('box_3', 'sizeless'), sizes: [[300, 250]]}
						}],
						box_4: [{
							code: 'box_4|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_4', adUnitPath: googleSlot('box_4')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '19601867', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235891', supplyId: '13216', targeting: pbTargeting}}
							]
						}/* ,{
					code: "box_4|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"taboola",params:{publisherId:"1503012",tagId:getPlacementName("box_4","medium_rectangle",1)}}
					]
				}*/, {
							amazon: false
						}],
						box_5: [{
							code: 'box_5|native', sizes: [[1, 1]], mediaTypes: {native: {image: {required: true}, title: {required: true}, icon: {required: false}, body: {required: true}}}, pubstack: {adUnitName: 'box_5', adUnitPath: googleSlot('box_5')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '19601867', allowSmallerSizes: true, position: 'below', keywords: pbTargeting}},
								{bidder: 'yieldlab', params: {adslotId: '11235907', supplyId: '13216', targeting: pbTargeting}}
							]
						}/* ,{
					code: "box_5|all", mediaTypes: {banner:{sizes: [[300,250]]}},pubstack:{adUnitName:"rectangle_box",adUnitPath:googleSlot("rectangle_box")},
					bids: [
						{bidder:"taboola",params:{publisherId:"1503012",tagId:getPlacementName("box_5","medium_rectangle",1)}}
					]
				}*/, {
							amazon: false
						}],
						rectangle_layer: [{
							code: 'rectangle_layer|all', mediaTypes: {banner: {sizes: [[300, 600]]}}, pubstack: {adUnitName: 'rectangle_layer', adUnitPath: googleSlot('rectangle_layer')},
							bids: [
								{bidder: 'appnexus', params: {placementId: '13108294', position: 'above'}},
								{bidder: 'yieldlab', params: {adslotId: '9749287', supplyId: '13216', extId: ylId, targeting: pbTargeting, customParams: {wi: AdService.getParam('wi')}}},
								{bidder: 'criteo', params: {networkId: '2558', publisherSubId: getPlacementName('rectangle_layer')}},
								{bidder: 'pubmatic', params: {publisherId: '157878', adSlot: '2362983'}},
								{bidder: 'smart', params: {siteId: '328465', pageId: '1158297', formatId: '75979'}},
								{bidder: 'ix', params: {siteId: '412303'}},
								{bidder: 'openx', params: {unit: '542528041', delDomain: 'united-internet-d.openx.net'}},
								{bidder: 'orbidder', params: {accountId: 'uim', placementId: getPlacementName('rectangle_layer', 'sizeless', 1)}},
								{bidder: 'improvedigital', params: {placementId: '22136242', publisherId: 1258}},
								{bidder: 'rubicon', params: {accountId: '21240', siteId: '285264', zoneId: '1437532', position: 'atf'}},
								{bidder: 'adform', params: {mid: '929521'}},
								{bidder: 'triplelift', params: {inventoryCode: getPlacementName('rectangle_layer', 'halfpage_ad', 2)}}
							]
						}, {
							amazon: true, params: {slotID: getPlacementName('rectangle_layer', 'sizeless'), sizes: [[300, 600]]}
						}]
					};
				}
				/* NEORY */
				if (window.location.href.indexOf('_dev') !== -1 || window.location.href.indexOf('/dev/') !== -1 || document.cookie.indexOf('pbjsdebug=1') !== -1 || (typeof prebidUids !== 'undefined' && prebidUids.neorypbjs?.includes('b') && !/^(saf|fir)$/.test(AdService.getParam('cl')))) {
					for (const neoryslot in pbConfig.passover.slots) {
						const neoryMapping = ({
							'webde|middle': 'og5qriggld43',
							'webde|box_3': 's0sxzgy1og7k',
							'webde|rectangle_layer': '71prulf0t1ze',
							'webde|right': 'k0kcejvr8g9z',
							'gmx|middle': 'nz5slszq8xs4',
							'gmx|box_3': 'yqg5vfb73pyl',
							'gmx|rectangle_layer': 'aka0fnc7bsdu',
							'gmx|right': 'fl2k7o6nsvu8',
							'gmxat|middle': 'l5gbzrxfzcok',
							'gmxat|box_2': 'aus7xbbu7c6s',
							'gmxat|rectangle_layer': 'uitdp28zpl5c'
							// 'gmxat|right':'sze3o2i05911',
							// 'gmxch|middle':'9k7p9c9vpag2',
							// 'gmxch|box_2':'3vnsn05bgxqk',
							// 'gmxch|rectangle_layer':'mk6j0nmw7zs3',
							// 'gmxch|right':'yj2w5hmkm0r2'
						}[`${AdService.getParam('portal')}|${neoryslot}`] || '');
						if (neoryMapping !== '') {
							pbConfig.passover.slots[neoryslot][0].bids.push({bidder: 'neory', params: {zoneUid: neoryMapping, domain: 'd.c.cdnsrv.de', mpid: {netId: 'w3zio6kudf2g'}}});
						}
					}
				}
				return pbConfig;
			}
		};
		if (location.href.indexOf('_ad.jenkins=1') == -1) {
			AdService.AdSlot('shopping_1').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('shopping_2').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('shopping_3').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('shopping_4').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('shopping_5').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('shopping_6').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('linklist').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('slider_1_1').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('slider_1_2').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('slider_1_3').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('slider_1_4').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('slider_1_5').setConfig('request-ad-only-if-visible', true);
			AdService.AdSlot('slider_1_3').setConfig('visibility-precheck', () => {
				return AdService.AdSlot('slider_1_3').getVisibleFraction() && !(AdService.AdSlot('slider_1_3').getDomNode() && window.getComputedStyle(AdService.AdSlot('slider_1_3').getDomNode()).display == 'none');
			});
			AdService.AdSlot('slider_1_4').setConfig('visibility-precheck', () => {
				return AdService.AdSlot('slider_1_4').getVisibleFraction() && !(AdService.AdSlot('slider_1_4').getDomNode() && window.getComputedStyle(AdService.AdSlot('slider_1_4').getDomNode()).display == 'none');
			});
		}
		const wiShopping = Math.random().toString().substr(2, 9);
		AdService.AdSlot('shopping_1').setParam('wi', wiShopping);
		AdService.AdSlot('shopping_2').setParam('wi', wiShopping);
		AdService.AdSlot('shopping_3').setParam('wi', wiShopping);
		AdService.AdSlot('shopping_4').setParam('wi', wiShopping);
		AdService.AdSlot('shopping_5').setParam('wi', wiShopping);
		AdService.AdSlot('shopping_6').setParam('wi', wiShopping);
		const wiLinklist = Math.random().toString().substr(2, 9);
		AdService.AdSlot('linklist').setParam('wi', wiLinklist);
		AdService.setConfig(obj.configurations);
		AdService.setExclusionRuleSet(obj.exclusionRules);
		AdService.setAuctionConfig(obj.prebidRules);
		try {
			if (AdService.AdSlot('shopping_4').getDomNode() && window.getComputedStyle(AdService.AdSlot('shopping_4').getDomNode()).display == 'none') {
				AdService.AdSlot('shopping_4').disable();
			}
			if (AdService.AdSlot('shopping_5').getDomNode() && window.getComputedStyle(AdService.AdSlot('shopping_5').getDomNode()).display == 'none') {
				AdService.AdSlot('shopping_5').disable();
			}
			if (AdService.AdSlot('shopping_6').getDomNode() && window.getComputedStyle(AdService.AdSlot('shopping_6').getDomNode()).display == 'none') {
				AdService.AdSlot('shopping_6').disable();
			}
		} catch (e) {
			console.error(e);
		}
		const allSlots = ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6', 'box_7', 'box_8', 'box_9', 'box_10', 'box_11', 'right', 'middle', 'recobox_1', 'recobox_2'];
		for (const slot in allSlots) {
			if (obj.refreshSlots.indexOf(allSlots[slot]) === -1) {
				AdService.AdSlot(allSlots[slot]).setConfig('disableTagid_x', true);
			}
		}
	});
});