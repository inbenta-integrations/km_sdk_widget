function createInbentaKmSDKWidget(version, domainKey, key, options){
    // KM SDK
    var sdk = null;

    // base div
    var base = null;

    // banner
    var banner = null;

    // SDK pages
    var widget = null;
    var widgetClose = null;
    var widgetMinimize = null;
    var widgetBody = null;
    var widgetBack = null;

    // SDK pages
    var sdkHome = null;
    var sdkResults = null;
    var sdkResult = null;
    var sdkCategories = null;

    // SDK components
    var searchBox = null;
    var autocompleter = null;
    var popular = null;
    var results = null;
    var searchBox = null;
    var categories = null;

    // Back status
    var back = null;

    addKmSDKScript();

    function addKmSDKScript(){
        var scriptSdk = document.createElement('script');
        scriptSdk.type = 'text/javascript';
        scriptSdk.src = 'https://sdk.inbenta.io/km/'+version+'/inbenta-km-sdk.js';
        scriptSdk.onload = function() {
            initWidget();
        };
        document.getElementsByTagName('head')[0].appendChild(scriptSdk);
    }

    function initWidget(){
        createBaseDiv();
        addBanner();
        addWidget();
        addEventListener();
        setInitialStatus();
    }

    function setInitialStatus(){
        var isOpen = getWidgetStorageItem('isOpen');
        if(isOpen){
            openWidget();
        }
    }

    function initSDK(){
        sdk = InbentaKmSDK.createFromDomainKey(domainKey,key,options);
        initSDKComponents();
        setWidgetStatus();
        linkSDKComponents();
        eventsSDKComponents();
    }

    function setWidgetStatus(){
        var page = getWidgetStorageItem('page');
        if(page){
            switch (page) {
                case 'home':
                    goHome();
                    break;
                case 'results':
                    goResults();
                    break;
                case 'result':
                    goResult();
                    break;
                case 'categories':
                    goCategories();
                    break;
            }
        }
        var storedCategory = getWidgetStorageItem('category');
        if(storedCategory){
            categories.setCategory(storedCategory);
        }
        var storedContent = getWidgetStorageItem('content');
        if(storedContent){
            result.openContentById(storedContent);
        }
        var storedQuery = getWidgetStorageItem('query');
        if(storedQuery){
            results.setQuery(storedQuery);
        }
    }

    function initSDKComponents(){
        searchBox = sdk.component('searchBox', '#search-box');
        results = sdk.component('results', '#results', {contents:{
            openContentOnClick:false
        }});
        result = sdk.component('results', '#result');
        popular = sdk.component('popular', '#popular', {contents:{
            openContentOnClick:false
        }});
        autocompleter = sdk.component('autocompleter', '#autocompleter');
        categories = sdk.component('categories', '#categories', {contents:{
            openContentOnClick:false
        }});
    }

    function linkSDKComponents(){
        results.linkToSearchBox(searchBox);
        result.linkToAutocompleter(autocompleter);
        autocompleter.linkToSearchBox(searchBox);
    }

    function eventsSDKComponents(){
        categories.$on( 'click', (category) => {
            setWidgetStorageItem('category', category.id);
            goCategories();
        });

        categories.$on( 'contentClick', (content) => {
            setWidgetStorageItem('content', content.id);
            goResult('categories');
            result.openContentById(content.id, false);
        });

        searchBox.$on( 'query', (query) => {
            setWidgetStorageItem('query', query);
            goResults();
        });

        results.$on( 'click', (content) => {
            setWidgetStorageItem('content', content.id);
            goResult('results');
            result.openContentById(content.id, false);
        });

        popular.$on( 'click', (content) => {
            setWidgetStorageItem('content', content.id);
            goResult('home');
            result.openContentById(content.id, false);
        });

        autocompleter.$on( 'autocompleterClick', (content) => {
            setWidgetStorageItem('content', content.id);
            goResult('home');
        });
    }

    function openWidget(){
        banner.classList.add("inbenta-km--hidden");
        widget.classList.remove("inbenta-km--hidden");
        if(sdk==null){
            initSDK();
        }
    }

    function addEventListener(){
        banner.onclick = function(e){
            openWidget();
            setWidgetStorageItem('isOpen', true);
        }

        widgetMinimize.onclick = function(e){
            banner.classList.remove("inbenta-km--hidden");
            widget.classList.add("inbenta-km--hidden");
            setWidgetStorageItem('isOpen', false);
        }

        widgetClose.onclick = function(e){
            goHome();
            removeWidgetStorage();
            banner.classList.remove("inbenta-km--hidden");
            widget.classList.add("inbenta-km--hidden");
            setWidgetStorageItem('isOpen', false);
        }

        widgetBack.onclick = function(e){
            if(back=='categories'){
                goCategories();
            } else if(back=='home'){
                goHome();
            } else if(back=='results'){
                goResults();
            }
        }
    }

    function createBaseDiv(){
        base = document.createElement("div");
        document.body.appendChild(base);
        base.className = 'inbenta-km-widged-container';
    }

    function addBanner(){
        banner = document.createElement("div");
        base.appendChild(banner);
        banner.className = 'inbenta-km-banner';
        banner.innerHTML =
            "   <div class='inbenta-km-icon inbenta-km-icon--question-filled'></div>";
    }

    function addWidget(){
        widget = document.createElement("div");
        base.appendChild(widget);
        widget.className = 'inbenta-km-widget inbenta-km--hidden';

            var widgetHeader = document.createElement("div");
            widget.appendChild(widgetHeader);
            widgetHeader.className = 'inbenta-km-widget-header';

                widgetBack = document.createElement("div");
                widgetHeader.appendChild(widgetBack);
                widgetBack.className = 'header__actions__icon inbenta-km-icon inbenta-km-icon--arrow-filled-left inbenta-km--hide';

                var widgetTitle = document.createElement("div");
                widgetHeader.appendChild(widgetTitle);
                widgetTitle.className = 'header__title';
                widgetTitle.innerHTML = "ACME HELP";

                var widgetActions = document.createElement("div");
                widgetHeader.appendChild(widgetActions);
                widgetActions.className = 'header__actions';

                    widgetMinimize = document.createElement("div");
                    widgetActions.appendChild(widgetMinimize);
                    widgetMinimize.className = 'header__actions__icon inbenta-km-icon inbenta-km-icon--minimize minimize';
                    widgetMinimize.innerHTML = " ";

                    widgetClose = document.createElement("div");
                    widgetActions.appendChild(widgetClose);
                    widgetClose.className = 'header__actions__icon inbenta-km-icon inbenta-km-icon--close close';
                    widgetClose.innerHTML = " ";

            widgetBody = document.createElement("div");
            widget.appendChild(widgetBody);
            widgetBody.className = 'inbenta-km-widget-body';
            widgetBody.className = 'inbenta-km-widget-body';
            widgetBody.innerHTML = "<div id='search-box'></div><div id='autocompleter'>";

                sdkHome = document.createElement("div");
                widgetBody.appendChild(sdkHome);
                sdkHome.className = 'inbenta-km-home';
                sdkHome.innerHTML = "<div id='popular'></div>";

                sdkCategories = document.createElement("div");
                widgetBody.appendChild(sdkCategories);
                sdkCategories.className = 'inbenta-km-categories';
                sdkCategories.innerHTML = "</div><div id='categories'></div>";

                sdkResults = document.createElement("div");
                widgetBody.appendChild(sdkResults);
                sdkResults.className = 'inbenta-km-results inbenta-km--hidden';
                sdkResults.innerHTML = "<div id='results'></div>";

                sdkResult = document.createElement("div");
                widgetBody.appendChild(sdkResult);
                sdkResult.className = 'inbenta-km-result inbenta-km--hidden';
                sdkResult.innerHTML = "</div><div id='result'></div>";

            var widgetPowered = document.createElement("div");
            widget.appendChild(widgetPowered);
            widgetPowered.className = 'inbenta-km-widget-powered';
            widgetPowered.innerHTML = "<img src='https://cdn.inbenta.io/static/images/logo-inbenta.png'>";
    }

    function goHome(){
        setWidgetStorageItem('page', 'home');
        sdkHome.classList.remove("inbenta-km--hidden");
        sdkCategories.classList.remove("inbenta-km--hidden");
        sdkResult.classList.add("inbenta-km--hidden");
        sdkResults.classList.add("inbenta-km--hidden");
        widgetBack.classList.add("inbenta-km--hide");
        categories.setCategory(0);
        back = null;
    }

    function goResults(){
        setWidgetStorageItem('page', 'results');
        back = 'home';
        sdkHome.classList.add("inbenta-km--hidden");
        sdkCategories.classList.add("inbenta-km--hidden");
        sdkResult.classList.add("inbenta-km--hidden");
        sdkResults.classList.remove("inbenta-km--hidden");
        widgetBack.classList.remove("inbenta-km--hide");
    }

    function goResult(backR = 'home'){
        setWidgetStorageItem('page', 'result');
        back = backR;
        sdkHome.classList.add("inbenta-km--hidden");
        sdkCategories.classList.add("inbenta-km--hidden");
        sdkResults.classList.add("inbenta-km--hidden");
        sdkResult.classList.remove("inbenta-km--hidden");
        widgetBack.classList.remove("inbenta-km--hide");
    }

    function goCategories(){
        setWidgetStorageItem('page', 'categories');
        back = 'home';
        sdkCategories.classList.remove("inbenta-km--hidden");
        widgetBack.classList.remove("inbenta-km--hide");
        sdkHome.classList.add("inbenta-km--hidden");
        sdkResult.classList.add("inbenta-km--hidden");
        sdkResults.classList.add("inbenta-km--hidden");
    }

    function getWidgetStorageItem(storageKey){
        let storage = localStorage.getItem(`inbenta_km_widget_storage_${key}`);
        storage = storage ? storage = JSON.parse(storage) : {};
        const result = storage[storageKey] ? storage[storageKey] : false;

        return result;
    }

    function setWidgetStorageItem(storageKey, value){
        let storage = localStorage.getItem(`inbenta_km_widget_storage_${key}`);
        storage = storage ? storage = JSON.parse(storage) : {};
        storage[storageKey] = value;
        localStorage.setItem(`inbenta_km_widget_storage_${key}`, JSON.stringify(storage));
    }

    function removeWidgetStorage(){
        localStorage.removeItem(`inbenta_km_widget_storage_${key}`);
    }
}
