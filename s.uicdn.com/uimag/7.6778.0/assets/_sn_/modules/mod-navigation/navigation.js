import{a as b}from"../../chunk-WV5O54QD.js";import"../../chunk-EGRHWZRV.js";import{a as f,b as d,c as r,d as s,e as h}from"../../chunk-624ANEJ4.js";import{a as g,d as o,i as _}from"../../chunk-56DI6H62.js";import{a as c}from"../../chunk-XG4FNACR.js";import{b as m}from"../../chunk-3PCOBUZ4.js";import{b as l,e as p}from"../../chunk-MRANB4J3.js";import{b as n}from"../../chunk-EDKSZH7L.js";var u=g`
  :host(.open) {
    display: block !important;
  }

  :host {
    display: none;
    transition: height 0.25s;
    flex-direction: column;
    width: 100%;
    height: var(--header-height);
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--header-z-index) + 10);
    box-shadow: 8px 0 8px -8px rgba(0, 0, 0, 0.5);
    background: var(--white);
  }

  .nav {
    height: 100%;
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
}

  .nav li a {
    color: var(--text-highVisibility);
    font-weight: inherit;
    font-size: 1.8rem;
  }

  .nav li.lvlone__item a:hover {
    color: var(--system-hyperlink);
  }

  .nav li.lvltwo__item a:hover {
    text-decoration: underline;
    color: inherit;
  }

  .nav li a::selection {
    background-color: transparent;
  }

  .nav .nav__header {
    height: var(--header-height);
    display: flex;
    flex: 0 0 var(--header-height);
    border-top: var(--nav-header-border-top);
  }

  .nav .navi {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    position: relative;
    padding-top: 1.6rem;
    transition: padding-top 0.3s 0.25s;
    height: calc(100% - var(--header-height) * 1.6);
  }

  .nav .navi li {
    list-style: none;
  }

  .nav .lvlone__list {
    opacity: 0;
    transition: opacity 0.3s 0.25s;
  }

  .nav .lvlone__list.attop .lvlone__item.topline {
    visibility: hidden;
  }

  .nav .lvlone__item {
    margin: 0 5rem;
  }

  .nav .lvlone__item::after {
    content: '';
    margin: 0 auto;
    width: 10%;
    height: 1px;
    background-color: var(--separator-default);
    display: block;
    transition: width 0.4s 0.4s;
  }

  .nav .lvlone__item.topline {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .nav .lvlone__item:last-child::after {
    display: none;
  }

  .nav .lvlone__item a {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    min-width: 0;
  }

  .nav .lvlone__item--haslist .lvltwo__header .icon-arrow-down {
    display: inline-block;
  }

  .nav .lvlone__item--show {
    border-bottom: 0;
  }

  .nav .lvlone__item--show .lvltwo__list {
    display: block;
  }

  .nav .lvlone__item--show .lvltwo__header .icon-arrow-down {
    transform: rotate(180deg);
  }

  .nav .lvltwo__list {
    display: none;
    margin: 1.5rem 0;
    padding: 0;
  }

  .nav .lvltwo__item .icon {
    display: none;
  }

  .nav .lvltwo__item--haslist .icon-arrow-down {
    display: inline-block;
  }

  .nav .lvltwo__item--haslist .lvlthree__list {
    display: none;
  }

  .nav .lvltwo__item--show .lvlthree__list {
    display: block;
  }

  .nav .lvltwo__item--show .lvlthree__header .icon-arrow-down {
    transform: rotate(180deg);
  }

  .nav .lvltwo__item a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .nav .lvltwo__header {
    font-weight: bold;
    min-width: 0;
    padding: 1rem 0;
    display: flex;
    width: 100%;
    height: 4rem;
    box-sizing: border-box;
  }

  .nav .header-spacer {
    flex: 1;
    line-height: 2rem;
  }

  .nav .icon-arrow-down {
    display: none;
    padding: 0.5rem;
    transition: transform 0.2s;
    font-size: 1.5rem;
    color: var(--text-lowVisibility);
    cursor: pointer;
    align-self: center;
  }

  .nav .lvlthree__header {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    height: 4rem;
    box-sizing: border-box;
  }

  .nav .lvlthree__list {
    width: 100%;
    margin: 1rem 0;
  }

  .nav .lvlthree__item {
    width: 100%;
    margin-left: 2rem;
    padding: 1rem 0;
  }

  .nav .lvlthree__item a:hover {
    background: none;
  }

  .nav .lvlthree__item--partneroffers {
    color: var(--cp-grey-light-6);
    cursor: default;
  }

  :host footer {
    display: none;
    color: var(--separator-default);
    font-size: 1.2rem;
    line-height: 1.6rem;
    padding: 0 0 0.8rem 1rem;
  }

  :host footer a {
    color: var(--text-lowVisibility);
  }

  :host footer a:hover {
    color: var(--system-hyperlink);
  }

  :host(.nav-ani) {
    height: 100%;
  }

  :host(.nav-ani) footer {
    display: block;
    position: relative;
    overflow: visible;
  }

  :host(.nav-ani) footer::before {
    content: '';
    position: absolute;
    top: calc(var(--gap) * -1);
    left: 0;
    width: 100%;
    height: var(--gap);
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  :host(.nav-ani) .navi {
    padding-top: 0;
  }

  :host(.nav-ani) .lvlone__list {
    opacity: 1;
  }

  :host(.nav-ani) .lvlone__item::after {
    width: 100%;
  }

  @media (min-width: ${768}px) {
    :host {
      width: 33.6rem;
    }
  }

  @media (min-width: ${1024}px) {
    :host .nav li a {
      font-size: 1.6rem;
    }
  }

  .icon {
    font-family: icons;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    font-size: 3.2rem;
    line-height: 100%;
  }

  .icon-arrow-down::before {
    content: '\\e607';
  }

  .new-header__logo {
    display: flex;
    flex: 0 0;
    flex-basis: 3.2rem;
  }

  .new-header__hamburger {
    flex: 0 0 5rem;
  }

  .new-header__navtrigger {
    display: flex;
    float: none;
    line-height: 0;
    width: 100%;
    height: 100%;
    outline: 0;
    cursor: pointer;
  }

  :host(.open) .burger-icon::before {
    top: 0;
    opacity: 0;
    transition: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
  }

  :host(.open) .burger-icon {
    transform: rotate(225deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  :host(.open) .burger-icon::after {
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .burger-icon {
    display: block;
    position: relative;
    margin: auto 16px;
    width: 18px;
    height: 2px;
    transition-property: transform;
    transition-duration: 0.22s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    background-color: var(--burger-icon-bg)
  }

  .burger-icon::after {
    bottom: -6px;
    transition: bottom 0.1s 0.25s ease-in,
    transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }


  .burger-icon::before {
    top: -6px;
    transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
  }


  .burger-icon::before,
  .burger-icon::after {
    content: '';
    position: absolute;
    display: block;
    width: 18px;
    height: 2px;
    background-color: var(--burger-icon-bg);
  }

  .new-header__logo {
    display: flex;
    flex: 0 0;
    flex-basis: var(--navigationLogoFlexBasis);
  }

  .new-header__logo .logo-link {
    display: block;
    width: 100%;
  }

  .new-header__logo .logo-image {
    display: block;
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-image: var(--navigationLogoUrl);
    background-size: var(--navigationLogoSize);
    width: 100%;
    height: 100%;
  }
`;var i=class extends _{constructor(){super(...arguments);this.navigation="/img/navigation.json";this.navItemsLoaded=!1;this.navLayerShown=!1}static get styles(){return[b,u]}connectedCallback(){super.connectedCallback(),c.bindTrackingExposeHandler(this),this.addEventListener("transitionend",this.handleTransitionEnd),l.subscribe("newnav:closeNavi",()=>{this.closeNavigationLayer(),this.navLayerTrigger.focus()}),l.subscribe("article:bodyClicked",()=>{this.closeNavigationLayer()}),l.subscribe("nav:opening",()=>{this.handleNavOpening()})}disconnectedCallback(){this.removeEventListener("transitionend",this.handleTransitionEnd)}async handleNavOpening(){if(!this.navItemsLoaded){await this.getNavigationJson();let e=this.nav.querySelectorAll("[data-component-path]");c.bindTrackingClickHandler(e)}document.body.classList.add("nav-open"),document.documentElement.classList.add("nav-open"),this.classList.add("open"),this.setupScrollHandlingWithIntersectionObserver(),this.scrollToFocusElementOnDesktop(),setTimeout(()=>{this.classList.add("nav-ani"),this.navLayerShown=!0},50)}handleTransitionEnd(e){e.propertyName==="height"&&this.duplicateFooter()}onExpandSecondLevel(){let e="lvlone__item--show";[...this.levelOneNavList].forEach(t=>{t.addEventListener("click",a=>{a.target&&!a.target.classList.contains("lvlone__icon")||(t.classList.contains(e)?t.classList.remove(e):(this.collapseAllElementsOfLevel(1),t.classList.add(e)))})})}onExpandThirdLevel(){let e="lvltwo__item--show";[...this.levelTwoNavList].forEach(t=>{t.addEventListener("click",a=>{a.target&&!a.target.classList.contains("lvltwo__icon")||(t.classList.contains(e)?t.classList.remove(e):(this.collapseAllElementsOfLevel(2),t.classList.add(e)))})})}duplicateFooter(){if(this.footer){console.log("footer already exists");return}let e=document.querySelector(".left-col footer");if(e){let t=e.cloneNode(!0);this.nav.appendChild(t)}}closeNavigationLayer(){this.navLayerShown&&(this.classList.remove("nav-ani"),this.classList.remove("open"),l.publish("newnav:closeNavLayer",{}))}async getNavigationJson(){this.navData=await p.getJSON(this.navigation),await this.updateComplete,this.onExpandSecondLevel(),this.onExpandThirdLevel(),l.publish("navigation:ready",this.navList),this.navItemsLoaded=!0}setupScrollHandlingWithIntersectionObserver(){let e="attop",t=this.navi.getElementsByClassName("lvlone__item")[1],a={root:this.navi};"IntersectionObserver"in window&&new IntersectionObserver(v=>{v[0].isIntersecting?v[0].intersectionRatio<.5&&this.navList.classList.add(e):this.navList.classList.remove(e)},a).observe(t)}scrollToFocusElementOnDesktop(){let e=!0;if(m.isDesktop()||document.body.classList.contains("homepage")&&(e=!1),e){let t=this.navi.getElementsByClassName("lvlone__item--show")[0];t&&(this.navi.scrollTop=t.offsetTop-17)}}collapseAllElementsOfLevel(e){let t=e==1?"lvlone__item--show":"lvltwo__item--show",a=this.navi.getElementsByClassName(t)[0];a&&a.classList.remove(t)}trackBrainZone(e,t){l.publish("navigation:brainZone",{destination:e,brainData:t})}get componentPath(){return this.getAttribute("data-component-path")??""}render(){return o`
      <!-- Navigation Layer -->
      <nav class="nav">
        <div class="nav__header">
          <div class="new-header__hamburger">
            <label class="new-header__navtrigger" tabindex="0" @click=${this.closeNavigationLayer}>
              <span class="burger-icon"></span>
            </label>
          </div>
          <div class="new-header__logo" id="organization" itemprop="publisher">
            <a
              class="logo-link"
              aria-label="Zurück zur web.de Startseite"
              href="/"
              data-brain-zone="${this.brainZone}"
              data-component-path="${this.componentPath}"
              tabindex="0"
            >
              <span class="logo-image"></span>
            </a>
          </div>
        </div>

        <div class="navi">
          <ul class="lvlone__list innernav">
            <li class="lvlone__item topline"></li>
            ${this.navData?.navlist.map(e=>o`
                <li class="lvlone__item
                    ${e.navlist?"lvlone__item--haslist":null}
                    ${e.focus?"lvlone__item--show":null}"
                >
                  <div class="lvltwo__header">
                    <span class="header-spacer">
                      <a
                        href="${e.href}"
                        tabindex="0"
                        data-brain-zone="${e.dataBrainZone}"
                        data-component-path="${e.componentPath}"
                      >${e.name}</a
                      >
                    </span>
                    <span class="lvlone__icon icon icon-arrow-down"></span>
                  </div>
                  ${e.navlist?o`
                    <ul class="lvltwo__list">
                      ${e.navlist.map(t=>o`
                        <li
                          class="lvltwo__item ${t.navlist?"lvltwo__item--haslist":null}"
                        >
                          <div class="lvlthree__header">
                            <span class="header-spacer">
                              <a
                                href="${t.href}"
                                tabindex="0"
                                data-brain-zone="${t.dataBrainZone}"
                                data-component-path="${t.componentPath}"
                              >
                                ${t.name}
                              </a>
                            </span>
                            <span
                              class="lvltwo__icon icon icon-arrow-down"
                            ></span>
                          </div>
                          ${t.navlist?o`
                            <ul class="lvlthree__list">
                              ${t.navlist.map(a=>o`
                                <li class="lvlthree__item">
                                  <span class="header-spacer">
                                    <a
                                      href="${a.href}"
                                      tabindex="0"
                                      data-brain-zone="${a.dataBrainZone}"
                                      data-component-path="${a.componentPath}"

                                    >${a.name}</a
                                    >
                                  </span>
                                </li>
                              `)}
                              ${t.partneroffers?o`
                                <li
                                  class="lvlthree__item lvlthree__item--partneroffers"
                                >
                                  Partnerangebote
                                </li>
                                ${t.partneroffers.map(a=>o`
                                  <li
                                    class="lvlthree__item"
                                  >
                                    <span class="header-spacer">
                                      <a
                                        href="${a.href}"
                                        tabindex="0"
                                        data-brain-zone="${a.dataBrainZone}"
                                        data-component-path="${a.componentPath}"
                                      >${a.name}</a
                                      >
                                    </span>
                                  </li>`)}
                              `:null}
                            </ul>`:null}
                        </li>
                      `)}
                    </ul>`:null}
                </li>
              `)}
          </ul>
        </div>
      </nav>
    `}};n([d({reflect:!0})],i.prototype,"navigation",2),n([d({attribute:"brain-zone"})],i.prototype,"brainZone",2),n([r()],i.prototype,"navItemsLoaded",2),n([r()],i.prototype,"navLayerShown",2),n([r()],i.prototype,"navData",2),n([h(".lvlone__item--haslist")],i.prototype,"levelOneNavList",2),n([h(".lvltwo__item--haslist")],i.prototype,"levelTwoNavList",2),n([s(".nav")],i.prototype,"nav",2),n([s(".navi")],i.prototype,"navi",2),n([s(".new-header__navtrigger")],i.prototype,"navLayerTrigger",2),n([s("footer")],i.prototype,"footer",2),n([s(".lvlone__list")],i.prototype,"navList",2),i=n([f("ui-navigation")],i);export{i as Navigation};
//# sourceMappingURL=navigation.js.map
