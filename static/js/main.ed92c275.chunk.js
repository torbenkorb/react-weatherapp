(this["webpackJsonpreact-weatherapp"]=this["webpackJsonpreact-weatherapp"]||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n(10),r=n.n(i),o=(n(15),n(7)),c=n(9),s=n(2),d=n(4),l=n(3),u=n(6),h=n(5),j=n(0),p=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=this.props.cities.map((function(t){return Object(j.jsx)("li",{onClick:e.props.selectCity,children:t},t.toLowerCase())}));return Object(j.jsx)("div",{className:"Citylist",children:Object(j.jsx)("ul",{children:t})})}}]),n}(a.Component),g=p,m=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={inlineStyle:{}},a.drawer={startX:0,currX:0,isTouched:!1},a.onTouchHandler=a.onTouchHandler.bind(Object(h.a)(a)),a.onTouchMoveHandler=a.onTouchMoveHandler.bind(Object(h.a)(a)),a.onTouchEndHandler=a.onTouchEndHandler.bind(Object(h.a)(a)),a.swipeDrawer=a.swipeDrawer.bind(Object(h.a)(a)),a}return Object(u.a)(n,[{key:"componentDidUpdate",value:function(){this.props.isActive?document.body.classList.add("drawer--open"):document.body.classList.remove("drawer--open")}},{key:"onTouchHandler",value:function(e){this.drawer.startX=e.touches[0].pageX,this.drawer.currX=this.drawer.startX,this.drawer.isTouched=!0,requestAnimationFrame(this.swipeDrawer)}},{key:"onTouchMoveHandler",value:function(e){this.drawer.isTouched&&(this.drawer.currX=e.touches[0].pageX)}},{key:"onTouchEndHandler",value:function(e){if(this.drawer.isTouched){this.drawer.isTouched=!1;var t={inlineStyle:{transform:""}};Math.min(0,this.drawer.currX-this.drawer.startX)<-40&&this.props.toggleDrawer(),this.setState((function(e){return t}))}}},{key:"swipeDrawer",value:function(){if(this.drawer.isTouched){requestAnimationFrame(this.swipeDrawer);var e="translateX("+Math.min(0,this.drawer.currX-this.drawer.startX)+"px)";this.setState((function(t){return{inlineStyle:{transform:e}}}))}}},{key:"render",value:function(){return Object(j.jsxs)("div",{className:"Drawer"+(this.props.isActive?" active":""),onTouchStart:this.onTouchHandler,onTouchMove:this.onTouchMoveHandler,onTouchEnd:this.onTouchEndHandler,style:this.state.inlineStyle,children:[Object(j.jsxs)("div",{className:"drawer__header",children:[Object(j.jsx)("h2",{children:"Select a city"}),Object(j.jsx)("i",{onClick:this.props.toggleDrawer,className:"material-icons drawer__close",children:"close"})]}),Object(j.jsx)(g,{cities:this.props.cities,selectCity:this.props.selectCity,getLocation:this.props.getLocation})]})}}]),n}(a.Component),w=function(e){return Object(j.jsx)("div",{className:"loader "+(e.isLoading?"active":""),children:Object(j.jsx)("div",{className:"loader__rotation"})})},f=(n(17),{weekday:"long",month:"short",day:"numeric"}),v={weekday:"long",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"},O=function(e){var t,n,a=new Date(e.timestamp),i=new Date(Date.now()),r=(n=i,(t=a).getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth()&&t.getDate()===n.getDate()?"Today":a.toLocaleDateString("en-GB",f));return e.removeTime||(r=a.toLocaleString("en-GB",v)),Object(j.jsx)("div",{className:"date",children:r})},b=(n(18),{"01d":"icon-1","01n":"icon-2","02d":"icon-5","02n":"icon-6","03d":"icon-12","03n":"icon-12","04d":"icon-12","04n":"icon-12","09d":"icon-8","09n":"icon-8","10d":"icon-8","10n":"icon-8","11d":"icon-3","11n":"icon-3","13d":"icon-10","13n":"icon-10","50d":"icon-7","50n":"icon-7"}),y=function(e){return Object(j.jsx)("span",{className:b[e.icon]})},x=(n(19),function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props.listItems.map((function(e,t){var n=new Date(1e3*e.dt);return Object(j.jsxs)("li",{children:[Object(j.jsxs)("div",{className:"forecast__meta",children:[Object(j.jsx)(O,{timestamp:n,removeTime:!0}),Object(j.jsx)("div",{className:"forecast__summary",children:e.weather[0].description})]}),Object(j.jsxs)("div",{className:"forecast__currTemp",children:[Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:[Math.round(e.temp.max),"\xb0"]}),Object(j.jsxs)("div",{className:"hint",children:[Math.round(e.temp.min),"\xb0"]})]}),Object(j.jsx)(y,{icon:e.weather[0].icon})]})]},t)}));return Object(j.jsxs)("ul",{className:"List",children:[e,this.props.children]})}}]),n}(a.Component)),L=x,_=function(e){return Object(j.jsx)("div",{className:"getLocation",onClick:e.getCurrentLocation,children:Object(j.jsx)("i",{className:"material-icons",children:"my_location"})})},C={"Frankfurt am Main":{coords:{latitude:50.1109221,longitude:8.682126700000026}},Berlin:{coords:{latitude:52.52000659999999,longitude:13.404953999999975}},London:{coords:{latitude:51.5073509,longitude:-.12775829999998223}},"New York":{coords:{latitude:40.7127837,longitude:-74.00594130000002}},"Los Angeles":{coords:{latitude:34.0522342,longitude:-118.2436849}}},D=function(e){Object(d.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).componentDidMount=function(){a.setState({isLoading:!0}),a.getWeatherData(a.state.cities[a.state.selectedCity])},a.getWeatherData=function(e){var t=e.coords,n=t.latitude,i=t.longitude,r="https://j3kw67la1a.execute-api.eu-central-1.amazonaws.com/onecall?"+"lat=".concat(n,"&lon=").concat(i)+"&units=metric&exclude=minutely,hourly&"+Date.now();fetch(r).then((function(e){return e.ok?Promise.resolve(e):e.json().then(Promise.reject.bind(Promise))})).then((function(e){return e.json()})).then((function(e){a.setState((function(t){return{weatherAPIData:e,isLoading:!1}}),a.saveLocalStorage)})).catch((function(e){console.error(e)}))},a.updateWeather=function(){a.setState((function(e){return{isLoading:!0,drawerOpen:!1}})),a.getWeatherData(a.state.cities[a.state.selectedCity])},a.toggleDrawer=function(){a.setState((function(e){return{drawerOpen:!e.drawerOpen}}))},a.selectCity=function(e){var t=e.target.innerText;a.state.selectedCity!==t&&(a.setState((function(e){return{selectedCity:t,isLoading:!0,drawerOpen:!1}})),a.getWeatherData(a.state.cities[t]))},a.getCurrentLocation=function(){a.setState((function(e){return{isLoading:!0,drawerOpen:!1}})),navigator.geolocation&&a.getDeviceGeoLocation().then((function(e){a.getWeatherData(e);var t=e.coords.latitude+","+e.coords.longitude;a.getCityByCoords(t)}))},a.getDeviceGeoLocation=function(){return new Promise((function(e,t){navigator.geolocation.getCurrentPosition((function(t){e(t)}),(function(e){console.error("There was an error using your device's Geolocation: ",e.message),a.setState({isLoading:!1})}))}))},a.getCityByCoords=function(e){var t=e.split(",",2),n={lat:parseFloat(t[0]),lng:parseFloat(t[1])},i=new window.google.maps.Geocoder;a.geocodeLatLng(i,n)},a.geocodeLatLng=function(e,t){e.geocode({location:t,region:"es"},(function(e,n){if(n===window.google.maps.GeocoderStatus.OK)if(e){for(var i=e[0].address_components,r="",s=0;s<i.length;++s)if(i[s].types.includes("locality")&&i[s].long_name.length>1||i[s].types.includes("administrative_area_level_1")){r=i[s].long_name;break}a.setState((function(e){return{selectedCity:r,cities:Object(c.a)(Object(c.a)({},e.cities),{},Object(o.a)({},r,{coords:{latitude:t.lat,longitude:t.lng}}))}}))}else window.alert("No results found");else window.alert("Geocoder failed due to: "+n)}))},a.saveLocalStorage=function(){(function(e){try{var t=window[e],n="__storage_test__";return t.setItem(n,n),t.removeItem(n),!0}catch(a){return a instanceof DOMException&&(22===a.code||1014===a.code||"QuotaExceededError"===a.name||"NS_ERROR_DOM_QUOTA_REACHED"===a.name)&&0!==t.length}})("localStorage")&&localStorage.setItem("ReactWeatherApp",JSON.stringify(a.state))},a.render=function(){var e=a.state.weatherAPIData,t=a.state.selectedCity,n=Math.round(e.current.temp),i=e.current.weather[0].description,r=1e3*e.current.dt;return Object(j.jsxs)("div",{className:"site",children:[Object(j.jsx)(w,{isLoading:a.state.isLoading}),Object(j.jsx)(m,{cities:Object.keys(a.state.cities),selectCity:a.selectCity,isActive:a.state.drawerOpen,toggleDrawer:a.toggleDrawer}),Object(j.jsxs)("div",{className:"app__topbar",children:[Object(j.jsx)("div",{className:"drawer__activate",onClick:a.toggleDrawer,children:Object(j.jsx)("i",{className:"material-icons",children:"menu"})}),Object(j.jsx)(_,{getCurrentLocation:a.getCurrentLocation})]}),Object(j.jsxs)("div",{className:"App-header",children:[Object(j.jsx)("h1",{children:t}),Object(j.jsxs)("div",{className:"appheader__content",children:[Object(j.jsx)("div",{children:Object(j.jsx)(y,{icon:e.current.weather[0].icon})}),Object(j.jsxs)("div",{className:"appheader__right",children:[Object(j.jsxs)("div",{className:"currTemp",children:[n,"\xb0"]}),Object(j.jsx)("div",{className:"currSum",children:i})]})]})]}),Object(j.jsx)("div",{className:"panel",children:Object(j.jsx)(L,{listItems:e.daily})}),Object(j.jsxs)("div",{className:"update-app hint",children:[Object(j.jsx)("i",{className:"material-icons no-select",onClick:a.updateWeather,children:"update"})," Last updated:\xa0",Object(j.jsx)(O,{timestamp:r})]})]})},localStorage.getItem("ReactWeatherApp")?a.state=JSON.parse(localStorage.getItem("ReactWeatherApp")):a.state={selectedCity:Object.keys(C)[0],cities:C,isLoading:!0,drawerOpen:!1,weatherAPIData:{current:{temp:0},daily:[]}},a}return n}(a.Component),N=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function k(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(Object(j.jsx)(D,{}),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-weatherapp",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/react-weatherapp","/service-worker.js");N?function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):k(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e):k(e)}))}}()}},[[20,1,2]]]);
//# sourceMappingURL=main.ed92c275.chunk.js.map