import{a as w}from"../../chunk-U7CBGTU3.js";import"../../chunk-EGRHWZRV.js";import"../../chunk-U7CVUIZ2.js";import{a as m,b as n,c as o,d as b}from"../../chunk-624ANEJ4.js";import"../../chunk-HXT67TO7.js";import{a as d,d as r,i as g}from"../../chunk-56DI6H62.js";import{a as p,b as l}from"../../chunk-MRANB4J3.js";import{b as s}from"../../chunk-EDKSZH7L.js";var f=d`
  :host {
    --padding-lg: 12px;
    --padding-sm: 8px;
    --margin-lg: 12px;
    --margin-sm: 8px;
    contain: content;
    text-align: left;
    display: block;
    position: relative;
    max-width: 14rem;
    margin-left: auto;
  }

  :host(.fullscreen) {
    position: fixed;
    top: 0;
    left: 0;
    max-width: none;
    width: 100%;
    height: 100%;
    background: white;
  }

  :host(.fullscreen) .dropdown__positioner {
    margin: var(--margin-sm);
    border-top: 1px solid #c2c2c2;
  }

  .form__wrapper.hidden {
    display: none;
  }
  .form__wrapper.fullscreen {
    padding: 0.8rem 1rem 0;
    background: white;
  }

  form {
    display: flex;
    align-items: center;
  }

  .hover__wrapper {
    border: 1px solid var(--form-element-default-border);
    border-radius: 4px;
    width: 100%;
    display: flex;
    overflow: hidden;
  }

  .hover__wrapper.border {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 0;
  }

  .hover__wrapper:hover,
  .hover__wrapper:focus {
    border-color: var(--form-element-hover-focus-border);
  }

  .hover__wrapper.fullscreen {
    border: 0;
  }

  .register-search__wrapper {
    display: flex;
  }
  .register__button {
    flex-grow: 1;
    color: var(--button-media-default-label);
    height: 3rem;
    background: transparent;
    border-radius: 0.4rem;
    border: 0.1rem solid var(--button-media-default-label);
  }
  .register__button:active {
    background-color: var(--button-media-active-background);
    color: var(--button-media-active-label);
  }

  .single__icon {
    color: var(--header-icon-color);
    margin-top: 0.1rem;
    margin-left: 1rem;
    padding-left: 1rem;
    background: transparent;
  }

  .input__control {
    margin: 0;
    border: 0;
    border-radius: 0;
    height: 2.8rem;
    font-size: 1.6rem;
    line-height: 3rem;
    flex: 1;
    padding: 0 0.8rem;
    min-width: 4rem;
    width: 4rem;
    color: var(--form-element-default-text);
    background-color: var(--page-background);
    outline: 0;
    -webkit-appearance: none;
  }

  .input__control::placeholder {
    font-style: normal;
    color: var(--text-lowVisibility);
  }
  .input__control:focus::placeholder {
    color: var(--text-lowVisibility);
  }

  .input__control.fullscreen {
    border: 0;
    border-radius: 0;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__submit.fullscreen {
    display: none;
  }

  button {
    background: white;
    border: 0;
    width: 3.2rem;
    height: 2.8rem;
    text-align: center;
    margin: 0;
    position: relative;
  }

  button span {
    width: 3.4rem;
    height: 2.8rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    top: 0;
    left: -2px;
    color: var(--form-icon-default);
  }

  button span:hover {
    cursor: pointer;
  }

  .back-icon {
    background-image: var(--bg-search-back);
  }

  .clear-icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iRWJlbmVfNCIgZGF0YS1uYW1lPSJFYmVuZSA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3MTcxNzE7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIyLjg0LDguMjRsLS45My0uOTNhLjU0LjU0LDAsMCwwLS43NiwwTDE1LDEzLjQ1LDguODUsNy4yOWEuNTQuNTQsMCwwLDAtLjc2LDBsLS45My45M2EuNTQuNTQsMCwwLDAsMCwuNzZsNi4xNiw2LjE2TDcuNDQsMjFhLjU0LjU0LDAsMCwwLDAsLjc2bC45My45M2EuNTQuNTQsMCwwLDAsLjc2LDBMMTUsMTYuODNsNS44OCw1Ljg4YS41NC41NCwwLDAsMCwuNzYsMGwuOTQtLjkzYS41NC41NCwwLDAsMCwwLS43NkwxNi43LDE1LjE0LDIyLjg0LDlBLjU0LjU0LDAsMCwwLDIyLjg0LDguMjRaIi8+PC9zdmc+');
  }

  .submit-icon {
    background-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iRWJlbmVfNCIgZGF0YS1uYW1lPSJFYmVuZSA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM3MTcxNzE7fTwvc3R5bGU+PC9kZWZzPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI0Ljg1LDIzbC00LjUyLTQuNTJhOC41Miw4LjUyLDAsMSwwLTEuNzYsMS44bDQuNSw0LjVhLjUxLjUxLDAsMCwwLC43MSwwbDEuMDctMS4wN0EuNS41LDAsMCwwLDI0Ljg1LDIzWk0xMy40NiwyMEE2LjQ4LDYuNDgsMCwxLDEsMjAsMTMuNTQsNi40OCw2LjQ4LDAsMCwxLDEzLjQ2LDIwWiIvPjwvc3ZnPg==');
  }

  .dropdown__positioner {
    position: relative;
    background: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .menu {
    list-style: none;
    display: none;
    background: white;
    padding: 0;
    margin: 0;
  }

  .menu li.menu-item a {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .menu li.menu-item a.has__category {
    height: 60px;
  }

  .menu li.menu-item a span {
    display: inline-block;
  }

  .menu li.menu-item a span.image {
    display: flex;
    justify-content: center;
    margin-left: var(--margin-sm);
    margin-right: var(--margin-sm);
    min-width: 40px;
  }

  .menu li.menu-item a span.image img {
    border: 4px;
  }

  .menu li.menu-item a span.result {
    flex: 1;
    align-content: flex-end;
    line-height: 1.8rem;
  }

  .menu li.menu-item a span.suggest {
    color: var(--cp-grey-light-1);
    font-size: 1.6rem;
    font-weight: 700;
  }

  .menu li.menu-item a span.label {
    color: var(--cp-grey-light-4);
    font-size: 1.4rem;
    width: 100%;
  }

  .menu li:not(.menu-item) {
    padding-right: var(--padding-sm);
    height: 40px;
    display: flex;
    justify-content: end;
    align-items: center;
    color: var(--cp-grey-light-4);
    font-size: 10pt;
    border-top: 1px solid #c2c2c2;
    visibility: hidden;
  }

  .show {
    display: block;
  }

  .highlight {
    background: var(--highlight-search-color);
  }

  .suggest-temperature {
    color: #515151;
    font-size: 30px;
    line-height: 40px;
    margin-right: 12px;
  }

  @media (min-width: ${768}px) {
    :host {
      width: 47rem;
      max-width: none;
    }

    .dropdown__positioner {
      border-top: 0;
      padding: 0;
      margin: 0;
    }

    .menu {
      border: 1px solid #c2c2c2;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .menu li.menu-item a span.image {
      margin-left: var(--margin-lg);
      margin-right: var(--margin-lg);
    }

    .menu li:not(.menu-item) {
      visibility: initial;
      padding-right: var(--padding-lg);
    }
  }

  @media (min-width: ${1024}px) {
    :host {
      width: 63rem;
      max-width: none;
    }
  }
`;var t=class extends g{constructor(){super(...arguments);this.action="";this.multiSuggest="";this.brandName="";this.mobileRegistrationUrl=void 0;this.currentOrigin="magazin";this.show=!1;this.selectedMenuIndex=-1;this.userInput="";this.abortController=new AbortController;this.displayInput="";this.hasFocus=!1;this.mouseOver=!1;this.suppressFullscreen=!1;this.formAction="";this.formMethod="get"}firstUpdated(){this.formAction=this.action,this.mobileRegistrationUrl&&this.sendBrainTrackingEvent("header_registration_show")}connectedCallback(){super.connectedCallback(),this.handleKeyboardDown=this.handleKeyboardDown.bind(this),addEventListener("keydown",this.handleKeyboardDown)}disconnectedCallback(){removeEventListener("keydown",this.handleKeyboardDown)}handleKeyboardDown(e){if(this.show&&this.suggestions&&(e.key==="ArrowUp"&&(this.selectedMenuIndex>0?this.selectedMenuIndex--:this.selectedMenuIndex=this.suggestions.length-1),e.key==="ArrowDown"&&(this.selectedMenuIndex<this.suggestions.length-1?this.selectedMenuIndex++:this.selectedMenuIndex=0),e.key==="ArrowDown"||e.key==="ArrowUp")){let i=this.suggestions[this.selectedMenuIndex];this.displayInput=i?.suggest??"",i?.url?(this.formAction=i.url,this.formMethod="post"):this.resetFormAttrib()}}handleClearClick(e){this.userInput="",this.displayInput="",this.selectedMenuIndex=-1,this.show=!1,this.input.focus(),this.resetFormAttrib(),e.stopPropagation()}handleBackClick(e){this.userInput="",this.displayInput="",this.selectedMenuIndex=-1,this.className="",this.suppressFullscreen=!0,this.resetFormAttrib(),e.stopPropagation()}async handleInput(){if(this.userInput=this.input.value,!!this.multiSuggest){if(this.userInput.length==0){this.show=!1,this.selectedMenuIndex=-1,this.displayInput="";return}this.resetFormAttrib(),await this.requestSuggestions(),this.result&&(this.suggestions=this.result.suggests,this.show=this.suggestions.length>0),this.selectedMenuIndex=-1,this.displayInput=""}}handleBlur(){this.hasFocus=!1,this.show=this.mouseOver,this.userInput=this.userInput.trim()}handleKeyDown(e){e.key==="Enter"&&(this.userInput=this.userInput.trim())}handleDropdownMouseEnter(){this.mouseOver=!0}handleDropdownMouseLeave(){this.mouseOver=!1}handleFocus(){this.hasFocus=!0,this.suppressFullscreen=!1,this.userInput.length>0&&this.suggestions&&this.suggestions.length>0&&(this.show=!0)}resetFormAttrib(){this.formAction=this.action,this.formMethod="get"}navigateToRegister(){this.mobileRegistrationUrl&&(window.location.href=this.mobileRegistrationUrl,this.sendBrainTrackingEvent("header_registration_success"))}openFullscreenSearch(){this.className="fullscreen",this.requestUpdate(),this.performUpdate(),this.input.focus()}render(){return this.hasFocus&&this.isMobileViewport()&&!this.suppressFullscreen&&(this.className="fullscreen"),r`
      ${this.formInputTemplate()}
      ${this.suggestionListTemplate()}
    `}formInputTemplate(){return r`
      <div class="${this.getFormWrapperClasses()}">
        <form action="${this.formAction}" method="${this.formMethod}">
          ${this.className==="fullscreen"?r`
            <button
              type="button"
              @click=${this.handleBackClick}
              tabindex="-1">
              <span class="back-icon"></span>
            </button>
          `:""}
          <div class="${this.getHoverWrapperClasses()}">
            <input type="hidden" name="origin" value="${this.currentOrigin}" />
            <input
              class="${this.className==="fullscreen"?"input__control fullscreen":"input__control"}"
              type="search"
              maxlength="200"
              aria-label="Sucheingabe"
              name="q"
              autocomplete="off"
              placeholder="${this.isMobileViewport()?"Suche":"Suchen mit "+this.brandName}"
              .value="${w(this.displayInput.length>0?this.displayInput:this.userInput)}"
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
              @keydown=${this.handleKeyDown}
            />
            ${this.userInput?.length>0?r`
              <button
                class="${this.className==="fullscreen"?"input__clear fullscreen":"input__clear"}"
                type="button"
                @click=${this.handleClearClick}
                tabindex="-1">
                <span class="clear-icon"></span>
              </button>
            `:""}
            <button
              class="${this.className==="fullscreen"&&this.multiSuggest?"input__submit fullscreen":"input__submit"}"
              type="submit"
              aria-label="Suchschaltfläche">
              <span class="submit-icon"></span>
            </button>
          </div>
        </form>
      </div>
      ${this.getOptionalSinlgeSearchIconTemplate()}
    `}getFormWrapperClasses(){return this.className==="fullscreen"?"form__wrapper fullscreen":this.mobileRegistrationUrl&&this.isMobileViewport()?"form__wrapper hidden":"form__wrapper"}getOptionalSinlgeSearchIconTemplate(){return this.mobileRegistrationUrl&&this.className!=="fullscreen"&&this.isMobileViewport()?r`
        <div class="register-search__wrapper">
          <button class="register__button" @click=${this.navigateToRegister}>Registrieren</button>
          <button class="single__icon" aria-label="Suchschaltfläche" @click=${this.openFullscreenSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M20.0264 17.2037L15.4282 12.5423C16.2095 11.2815 16.6629 9.79126 16.6629 8.19198C16.6629 3.66741 13.0446 0 8.5813 0C4.11803 0 0.5 3.66741 0.5 8.19198C0.5 12.7167 4.11786 16.3838 8.5813 16.3838C10.2982 16.3838 11.8885 15.8397 13.1971 14.9151L17.7405 19.5211C18.0562 19.8408 18.4701 20 18.8835 20C19.2973 20 19.7107 19.8408 20.0269 19.5211C20.6578 18.8808 20.6578 17.8438 20.0264 17.2037ZM8.5813 13.7297C5.56453 13.7297 3.11873 11.2506 3.11873 8.19232C3.11873 5.13407 5.56453 2.65476 8.5813 2.65476C11.5982 2.65476 14.0439 5.13407 14.0439 8.19232C14.0439 11.2506 11.5982 13.7297 8.5813 13.7297Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      `:null}suggestionListTemplate(){return r`
      <div
        role="list"
        class="dropdown__positioner"
        @mouseenter=${this.handleDropdownMouseEnter}
        @mouseleave=${this.handleDropdownMouseLeave}
      >
      ${this.suggestions?r`
        <ul class="menu ${this.show?"show":null}">
          ${this.suggestions.map((e,i)=>r`
            <li class="menu-item ${this.selectedMenuIndex===i?"highlight":null}" @mousemove="${this.mouseOverOnItem(i)}">
              <a href="${e.url}" class="${e.category?"has__category":""}">
                <span class="image ${e.category?"has__category":null}">
                  <img src="data:${e.type};base64,${e.image}" />
                </span>
                ${this.renderOptionalCategoryDetail(e.categoryDetail)}
                <span class="result">
                  <span class="suggest">${this.markInput(e.suggest)}</span>
                  ${e.label?r`<span class="label">${e.label}</span>`:null}
                </span>
              </a>
            </li>`)}
          <li><span>Suchvorschläge bereitgestellt durch ${this.brandName}</span></li>
        </ul>
      `:""}
      </div>
    `}renderOptionalCategoryDetail(e){if(e&&e.length>0)try{let a=e.replace("]","\xB0C").split(";")[1];return a&&a.length>0?r`
            <div class="suggest-temperature">
              <span>${a}</span>
            </div>
          `:null}catch(i){return p.logUnknownError(i,"ui-multisearch"),null}else return null}getHoverWrapperClasses(){let e="hover__wrapper";return this.className==="fullscreen"?e+=" fullscreen":this.show&&(e+=" border"),e}mouseOverOnItem(e){return()=>{this.selectedMenuIndex=e}}async requestSuggestions(){this.abortController.abort(),this.abortController=new AbortController;let e=this.abortController.signal;try{let i=await fetch(this.getRequestUri(),{signal:e});this.result=await i.json()}catch(i){p.logUnknownError(i,"ui-multisearch")}}getRequestUri(){let e=new URL(this.multiSuggest);return e.searchParams.append("q",this.userInput.trim()),e.searchParams.append("device",this.getCurrentViewportDevice()),e.searchParams.append("origin",this.currentOrigin+"_sg"),e.searchParams.append("count","10"),e.toString()}getCurrentViewportDevice(){return window.innerWidth<768?"mobile":window.innerWidth<1024?"tablet":"desktop"}isMobileViewport(){return window.innerWidth<768}escapeRegExp(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}markInput(e){let i=this.userInput.trim(),a=e.split(new RegExp(this.escapeRegExp(i),"g")),v=r`<span style="font-weight:normal;">${i}</span>`,c=[];return a.forEach((y,x)=>{c.push(r`${y}`),x<a.length-1&&c.push(v)}),c}sendBrainTrackingEvent(e){l.subscribeOnce("analytics:ServiceReady",()=>{l.publish("header:multisearch",{referrer:"&referrer=undefined",click1:"&click1=undefined",click2:"&click2=undefined",click3:"&click3=undefined",click4:"&click4=undefined",clickname:"&clickname="+e})}),l.publish("multisearch:pingAnalyticsReady")}};t.styles=f,s([b(".input__control")],t.prototype,"input",2),s([n()],t.prototype,"action",2),s([n()],t.prototype,"multiSuggest",2),s([n()],t.prototype,"brandName",2),s([n()],t.prototype,"mobileRegistrationUrl",2),s([n({attribute:"origin"})],t.prototype,"currentOrigin",2),s([n({type:Object})],t.prototype,"result",2),s([n({type:Array})],t.prototype,"suggestions",2),s([n()],t.prototype,"show",2),s([n()],t.prototype,"selectedMenuIndex",2),s([n()],t.prototype,"userInput",2),s([o()],t.prototype,"abortController",2),s([o()],t.prototype,"displayInput",2),s([o()],t.prototype,"hasFocus",2),s([o()],t.prototype,"mouseOver",2),s([o()],t.prototype,"suppressFullscreen",2),s([o()],t.prototype,"formAction",2),s([o()],t.prototype,"formMethod",2),t=s([m("ui-multisearch")],t);export{t as MultiSearch};
//# sourceMappingURL=multisearch.js.map
