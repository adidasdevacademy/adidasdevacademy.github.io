window.esw.defineFeature("Chasitor",function(h){var a=/get[A-Z][A-Za-z0-9_]*/,i=[".soma.salesforce.com",".salesforceliveagent.com",".internal.salesforce.com",".eng.sfdc.net",".gus.salesforce.com",".salesforcescrt.com"];function t(){this.esw=h,this.liveAgentChasitor=void 0,this.events=void 0,this.chasitorSettings=void 0,this.prechatFormDetails=void 0,this.prechatEntities=void 0,this.chatWindowStateName=void 0,this.chatKey=void 0,this.isTabMaster=void 0,this.receiveIsTabMasterFunction=void 0,this.registerMessageHandlers(),"mobile"!==h.getSafariType()&&this.registerBroadcastHandlers(),h.loadFeatureScript("FileTransfer")}t.prototype.sendBroadcastEventToSlaveTabs=function(t,e){var s=e||{};s.domain||(s.domain=this.domain),s.chatKey||(s.chatKey=this.chatKey),h.broadcastAPI.send(t,s)},t.prototype.getChatKeyFromSessionStorage=function(t){var e=JSON.parse(h.sessionAPI.getSessionData(t,["CHASITOR_SERIALIZED_KEY"]).CHASITOR_SERIALIZED_KEY);if(e&&e.chasitorData)return e.chasitorData.chatKey},t.prototype.isChatKeyValid=function(t){return t||h.log("Chat key was not defined on receiving broadcast event."),this.chatKey===t},t.prototype.registerMessageHandlers=function(){h.addMessageHandler("chasitor.load",this.loadChasitor.bind(this)),h.addMessageHandler("chasitor.sendMessage",function(t,e){this.sendMessage(e)}.bind(this)),h.addMessageHandler("chasitor.sendRichMessage",function(t,e){this.sendRichMessage(e)}.bind(this)),h.addMessageHandler("chasitor.cancelChat",function(){this.cancelChat()}.bind(this)),h.addMessageHandler("chasitor.endChat",function(){this.endChat()}.bind(this)),h.addMessageHandler("chasitor.abortConnection",function(){this.abortConnection()}.bind(this)),h.addMessageHandler("chasitor.sendSneakPeekOrTypingUpdate",function(t,e){this.sendSneakPeekOrTypingUpdate(e)}.bind(this)),h.addMessageHandler("chasitor.saveChat",function(){this.saveChat()}.bind(this)),h.addMessageHandler("chasitor.updateChatWindowState",function(t,e){this.updateChatWindowState(e)}.bind(this)),h.addMessageHandler("chasitor.removeEventListeners",function(){this.removeEventListeners()}.bind(this)),h.addMessageHandler("chasitor.stopChasitorIdleTimeout",function(){this.stopChasitorIdleTimeout()}.bind(this)),h.addMessageHandler("chasitor.sendCustomEvent",function(t,e){this.sendCustomEvent(t,e)}.bind(this)),h.addMessageHandler("chasitor.getCustomEvents",function(){this.getCustomEvents()}.bind(this)),h.addMessageHandler("chasitor.addCustomEventListener",function(t,e){this.addCustomEventListener(t,e)}.bind(this)),h.addMessageHandler("chasitor.decrementActiveChatSession",function(t,e){this.decrementActiveChatSession(t,e)}.bind(this)),h.addMessageHandler("chasitor.getQueuePosition",function(){parent.postMessage({method:"liveagent.receiveQueuePosition",data:{queuePosition:this.getQueuePosition()}},h.parentOrigin)}.bind(this))},t.prototype.registerBroadcastHandlers=function(){h.broadcastAPI.on("incrementActiveChatSession",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.incrementActiveChatSession()}.bind(this)),h.broadcastAPI.on("decrementActiveChatSession",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.decrementActiveChatSession()}.bind(this)),h.broadcastAPI.on("liveAgentChasitorEvent",function(t){this.isChatKeyValid(t.chatKey)&&!this.isTabMaster&&parent.postMessage({method:"liveagent.event",data:t},h.parentOrigin)}.bind(this)),h.broadcastAPI.on("gatherChasitorSessionData",function(t){this.liveAgentChasitor&&this.gatherChasitorSessionData(t)}.bind(this)),h.broadcastAPI.on("sendMessage",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.sendMessage(t.message)}.bind(this)),h.broadcastAPI.on("sendRichMessage",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.sendRichMessage(t.message)}.bind(this)),h.broadcastAPI.on("serializeChat",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.serializeChat()}.bind(this)),h.broadcastAPI.on("cancelChat",function(t){this.isChatKeyValid(t.chatKey)&&(parent.postMessage({method:"liveagent.chatCanceledOnDifferentTab"},h.parentOrigin),this.liveAgentChasitor&&this.cancelChat())}.bind(this)),h.broadcastAPI.on("endChat",function(t){this.isChatKeyValid(t.chatKey)&&(parent.postMessage({method:"liveagent.chatCanceledOnDifferentTab"},h.parentOrigin),this.liveAgentChasitor&&this.endChat())}.bind(this)),h.broadcastAPI.on("abortConnection",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.abortConnection()}.bind(this)),h.broadcastAPI.on("sendSneakPeekOrTypingUpdate",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.sendSneakPeekOrTypingUpdate(t.message)}.bind(this)),h.broadcastAPI.on("saveChat",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.saveChat()}.bind(this)),h.broadcastAPI.on("removeEventListeners",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.removeEventListeners()}.bind(this)),h.broadcastAPI.on("stopChasitorIdleTimeout",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.stopChasitorIdleTimeout()}.bind(this)),h.broadcastAPI.on("getQueuePosition",function(t){this.liveAgentChasitor&&this.isChatKeyValid(t.chatKey)&&this.getQueuePosition()}.bind(this)),h.broadcastAPI.on("getIsTabMaster",function(t){t.domain===this.domain&&t.deploymentId===this.chasitorSettings.deploymentId&&h.broadcastAPI.send("receiveIsTabMaster",{isMaster:this.isTabMaster,domain:this.domain,deploymentId:this.chasitorSettings.deploymentId})}.bind(this)),h.broadcastAPI.on("receiveIsTabMaster",function(t){t.domain===this.domain&&t.deploymentId===this.chasitorSettings.deploymentId&&this.receiveIsTabMasterFunction&&void 0===this.isTabMaster&&this.receiveIsTabMasterFunction(t.isMaster)}.bind(this))},t.prototype.setChasitorData=function(t,e){this.domain=t,this.chasitorSettings=e.settingsObj,this.hasOnlyExtraPrechatInfo=e.hasOnlyExtraPrechatInfo,this.prechatFormDetails=e.prechatFormDetails,this.prechatEntities=e.prechatEntities},t.prototype.createScriptElement=function(){var t=document.createElement("script");t.id="chasitorScript",t.type="text/javascript",t.onload=function(){this.chasitorInit()}.bind(this),t.src=this.chasitorSettings.chasitorSrc,document.getElementsByTagName("head")[0].appendChild(t)},t.prototype.serializeChat=function(){var t,e;this.liveAgentChasitor&&!this.liveAgentChasitor.isChatEnded()&&(this.liveAgentChasitor.isChatRequestSuccessful()||this.liveAgentChasitor.isChatEngaged())&&(t=this.liveAgentChasitor.serialize(),(e=JSON.parse(t)).chasitorData.isChatEstablished="Chat"===this.chatWindowStateName,h.sessionAPI.setSessionData(this.domain,{CHASITOR_SERIALIZED_KEY:JSON.stringify(e)}))},t.prototype.handleLiveAgentChasitorEvent=function(t,e){var s,i=e;0<=["chasitorAgentChatEnded","chasitorAgentDisconnected","chasitorChasitorChatCanceled","chasitorChatRequestFailed","chasitorConnectionError"].indexOf(t)&&(this.esw.sessionAPI.deleteSessionData(this.domain,["MASTER_DEPLOYMENT_ID"]),this.removeActiveChatSession(this.domain,this.chasitorSettings.deploymentId)),t===this.liveAgentChasitor.Events.CHAT_REQUEST_SUCCESSFUL&&(this.chatKey=this.liveAgentChasitor.getChatKey()),"object"==typeof e?(i={},Object.getOwnPropertyNames(e).forEach(function(t){"function"==typeof e[t]&&a.test(t)?i[t]=e[t]():i[t]=e[t]})):i=e,s={event:t,params:i,chasitorData:this.gatherChasitorSessionData()},"chasitorChatRequestSuccessful"!==t&&this.sendBroadcastEventToSlaveTabs("liveAgentChasitorEvent",s),parent.postMessage({method:"liveagent.event",data:s},h.parentOrigin)},t.prototype.registerEvents=function(){this.events&&Object.keys(this.events).forEach(function(t){var e=this.events[t];this.liveAgentChasitor.addEventListener(e,this.handleLiveAgentChasitorEvent.bind(this,e),"ESW_"+e)}.bind(this))},t.prototype.passPrechatDataToLiveAgent=function(){void 0!==this.prechatFormDetails&&this.prechatFormDetails.length&&(this.prechatFormDetails.forEach(function(t){var e,s=t.value,i=t.transcriptFields;"string"==typeof s&&(s=t.value.trim()),e=this.liveAgentChasitor.addCustomDetail(t.label,s,t.displayToAgent),i&&i.forEach(e.addTranscriptField),"FirstName"===t.name&&(this.liveAgentChasitor.setName(s),this.liveAgentChasitor.setLocalName(s))}.bind(this)),this.liveAgentChasitor.addCustomDetail("eswLiveAgentDevName",this.chasitorSettings.eswLiveAgentDevName,!1),this.liveAgentChasitor.addCustomDetail("hasOnlyExtraPrechatInfo",this.hasOnlyExtraPrechatInfo,!1),this.prechatEntities.forEach(function(e){this.liveAgentChasitor.addEntity(e.entityName,e.showOnCreate,e.linkToEntityName,e.linkToEntityField,e.saveToTranscript),e.entityFieldMaps.forEach(function(t){this.liveAgentChasitor.addEntityFieldsMap(e.entityName,t.fieldName,t.label,t.doFind,t.isExactMatch,t.doCreate)}.bind(this))}.bind(this)))},t.prototype.passCustomDetailsToLiveAgent=function(){this.chasitorSettings.hasOwnProperty("chatbotVersion")&&this.chasitorSettings.chatbotVersion&&this.liveAgentChasitor.addCustomDetail("chatbotVersion",this.chasitorSettings.chatbotVersion,!1)},t.prototype.isNewChatSession=function(){return!h.sessionAPI.getSessionData(this.domain,["CHASITOR_SERIALIZED_KEY"]).CHASITOR_SERIALIZED_KEY},t.prototype.gatherChasitorSessionData=function(t){var e={chasitorSettings:this.chasitorSettings,acceptTime:this.liveAgentChasitor.getAcceptTime(),requestTime:this.liveAgentChasitor.getRequestTime(),oref:this.liveAgentChasitor.getOref(),chatKey:this.liveAgentChasitor.getChatKey(),connectionSessionId:this.liveAgentChasitor.getConnectionSessionId(),details:this.liveAgentChasitor.getDetails(),name:this.liveAgentChasitor.getName(),chatMessages:this.getChatMessages(),isSneakPeekEnabled:this.liveAgentChasitor.isSneakPeekEnabled(),isAgentTyping:this.liveAgentChasitor.isAgentTyping(),isFileRequested:this.liveAgentChasitor.isFileRequested(),isChatEstablished:this.liveAgentChasitor.isChatEstablished(),isChatEngaged:this.liveAgentChasitor.isChatEngaged(),isChatEnded:this.liveAgentChasitor.isChatEnded(),isChatTransferredToQueue:this.liveAgentChasitor.isChatTransferredToQueue(),isChatRequestSuccessful:this.liveAgentChasitor.isChatRequestSuccessful(),queuePosition:this.liveAgentChasitor.getQueuePosition(),orgId:this.liveAgentChasitor.getOrgId(),language:this.liveAgentChasitor.getLanguage(),lastUrl:this.liveAgentChasitor.getLastUrl(),transcriptSaveEnabled:this.liveAgentChasitor.getTranscriptSaveEnabled()};return t&&(e.isSnapinsSlaveTab=!0,this.sendBroadcastEventToSlaveTabs("chasitorSessionDataRefreshed",e)),e},t.prototype.getChatMessages=function(){var t=this.liveAgentChasitor.getChatMessages(),i=[];return t.forEach(function(e){var s={};Object.getOwnPropertyNames(e).forEach(function(t){"function"==typeof e[t]&&a.test(t)&&(s[t]=e[t]())}),i.push(s)}),i},t.prototype.initializeChasitor=function(){var t=this.chasitorSettings.endpointURL,e=this.chasitorSettings.contentServerURL,s=this.chasitorSettings.visitorInfo;this.liveAgentChasitor.resetChasitorState(),this.liveAgentChasitor.setOrgId(this.chasitorSettings.orgId),this.liveAgentChasitor.setDeploymentId(this.chasitorSettings.deploymentId),this.liveAgentChasitor.setButtonId(this.chasitorSettings.buttonId),this.passPrechatDataToLiveAgent(),this.passCustomDetailsToLiveAgent(),this.liveAgentChasitor.setReceiveQueueUpdates(this.chasitorSettings.isQueuePositionEnabled||!1),this.liveAgentChasitor.setVisitorInfo(s.visitCount,s.originalReferrer,s.pages),this.liveAgentChasitor.init(t,e,this.chasitorSettings.fallbackRouting,!1),this.liveAgentChasitor.startChat("snapins"),parent.postMessage({method:"liveagent.initialized",data:{chasitorEvents:this.events,chasitorSessionData:this.gatherChasitorSessionData()}},h.parentOrigin)},t.prototype.restoreSession=function(){var e,s=!1;this.liveAgentChasitor?(this.liveAgentChasitor.deserialize(h.sessionAPI.getSessionData(this.domain,["CHASITOR_SERIALIZED_KEY"]).CHASITOR_SERIALIZED_KEY),this.liveAgentChasitor.setReceiveQueueUpdates(this.chasitorSettings.isQueuePositionEnabled),this.liveAgentChasitor.init(this.chasitorSettings.endpointURL,this.chasitorSettings.contentServerURL,this.chasitorSettings.fallbackRouting,!1),this.liveAgentChasitor.reinitializeSession(),this.liveAgentChasitor.restoreChasitorIdleTimeout(),this.chatKey=this.liveAgentChasitor.getChatKey(),parent.postMessage({method:"liveagent.restored",data:{chasitorEvents:this.events,chasitorSessionData:this.gatherChasitorSessionData()}},h.parentOrigin)):(e=JSON.parse(h.sessionAPI.getSessionData(this.domain,["CHASITOR_EVENTS"]).CHASITOR_EVENTS),this.chatKey=this.getChatKeyFromSessionStorage(this.domain),h.broadcastAPI.on("chasitorSessionDataRefreshed",function(t){s||(parent.postMessage({method:"liveagent.restored",data:{chasitorEvents:e,chasitorSessionData:t}},h.parentOrigin),s=!0)}),h.broadcastAPI.send("gatherChasitorSessionData","slaveTabRestore"))},t.prototype.chasitorInit=function(){this.liveAgentChasitor=window.liveagent.chasitor,Object.defineProperty(this,"events",{get:function(){return this.liveAgentChasitor.Events}.bind(this)}),h.sessionAPI.setSessionData(this.domain,{CHASITOR_EVENTS:JSON.stringify(this.liveAgentChasitor.Events)}),this.registerEvents(),this.liveAgentChasitor.onMutate=function(){this.serializeChat()}.bind(this),this.startChatSession()},t.prototype.startChatSession=function(){this.isNewChatSession()?this.initializeChasitor():this.restoreSession()},t.prototype.sendMessage=function(t){var e={};this.liveAgentChasitor?this.liveAgentChasitor.sendMessage(t):document.hidden||(e.message=t,this.sendBroadcastEventToSlaveTabs("sendMessage",e))},t.prototype.sendRichMessage=function(t){var e={};this.liveAgentChasitor?this.liveAgentChasitor.sendSnapInRichMessage(t):document.hidden||(e.message=t,this.sendBroadcastEventToSlaveTabs("sendRichMessage",e))},t.prototype.cancelChat=function(){this.liveAgentChasitor&&(this.liveAgentChasitor.cancelChat(),this.esw.sessionAPI.deleteSessionData(this.domain,["CHASITOR_SERIALIZED_KEY","MASTER_DEPLOYMENT_ID"]),this.removeActiveChatSession(this.domain,this.chasitorSettings.deploymentId)),this.sendBroadcastEventToSlaveTabs("cancelChat")},t.prototype.endChat=function(){this.liveAgentChasitor&&(this.liveAgentChasitor.endChat(),this.esw.sessionAPI.deleteSessionData(this.domain,["CHASITOR_SERIALIZED_KEY","MASTER_DEPLOYMENT_ID"]),this.removeActiveChatSession(this.domain,this.chasitorSettings.deploymentId)),this.sendBroadcastEventToSlaveTabs("endChat")},t.prototype.getQueuePosition=function(){if(this.liveAgentChasitor&&this.chasitorSettings.isQueuePositionEnabled)return this.liveAgentChasitor.getQueuePosition();this.sendBroadcastEventToSlaveTabs("getQueuePosition")},t.prototype.removeActiveChatSession=function(t,e){var s=JSON.parse(h.sessionAPI.getSessionData(t,["ACTIVE_CHAT_SESSIONS"],!0).ACTIVE_CHAT_SESSIONS||"{}");delete s[e],h.sessionAPI.setSessionData(t,{ACTIVE_CHAT_SESSIONS:JSON.stringify(s)},!0),this.updateMaster(!1,0)},t.prototype.incrementActiveChatSession=function(){var t,e;this.liveAgentChasitor?((t=JSON.parse(h.sessionAPI.getSessionData(this.domain,["ACTIVE_CHAT_SESSIONS"],!0).ACTIVE_CHAT_SESSIONS||"{}"))[e=this.chasitorSettings.deploymentId]||(t[e]=0),t[e]+=1,h.sessionAPI.setSessionData(this.domain,{ACTIVE_CHAT_SESSIONS:JSON.stringify(t)},!0),this.updateMaster(!0,t[e])):this.sendBroadcastEventToSlaveTabs("incrementActiveChatSession")},t.prototype.decrementActiveChatSession=function(){var t,e;this.liveAgentChasitor?((t=JSON.parse(h.sessionAPI.getSessionData(this.domain,["ACTIVE_CHAT_SESSIONS"],!0).ACTIVE_CHAT_SESSIONS||"{}"))[e=this.chasitorSettings.deploymentId]?t[e]-=1:h.log("Decrement active chat sessions : Local Storage item ACTIVE_CHAT_SESSIONS not found for deployment id :"+e),h.sessionAPI.setSessionData(this.domain,{ACTIVE_CHAT_SESSIONS:JSON.stringify(t)},!0),this.updateMaster(!0,t[e])):this.sendBroadcastEventToSlaveTabs("decrementActiveChatSession")},t.prototype.updateMaster=function(t,e){var s={};s.isMaster=this.isTabMaster,s.activeChatSessions=e,h.postMessage("session.updateMaster",s)},t.prototype.loadChasitorSlaveTab=function(){this.restoreSession(),this.incrementActiveChatSession()},t.prototype.loadChasitorMasterTab=function(t,e){var s=e.settingsObj.deploymentId,i=JSON.parse(h.sessionAPI.getSessionData(t,["ACTIVE_CHAT_SESSIONS"],!0).ACTIVE_CHAT_SESSIONS||"{}"),a=document.getElementById("chasitorScript");a&&(a.parentNode.removeChild(a),[].slice.apply(document.querySelectorAll("iframe")).forEach(function(t){var e=t.getAttribute("src");e&&-1!==e.indexOf("cdm")&&t.parentNode.removeChild(t)}),this.removeEventListeners()),this.verifyScriptHost(this.chasitorSettings.chasitorSrc),this.createScriptElement(),h.sessionAPI.setSessionData(t,{MASTER_DEPLOYMENT_ID:s}),"mobile"!==h.getSafariType()&&(i[s]?i[s]+=1:i[s]=1,h.sessionAPI.setSessionData(t,{ACTIVE_CHAT_SESSIONS:JSON.stringify(i)},!0)),this.updateMaster(!0,1)},t.prototype.loadChasitor=function(e,s){var t=s.settingsObj.deploymentId,i=JSON.parse(h.sessionAPI.getSessionData(e,["ACTIVE_CHAT_SESSIONS"],!0).ACTIVE_CHAT_SESSIONS||"{}")[t]||0;this.setChasitorData(e,s),this.receiveIsTabMasterFunction=function(t){t?(this.isTabMaster=!1,this.loadChasitorSlaveTab(),h.broadcastAPI.off("receiveIsTabMaster")):1!==i||t?i-=1:(this.isTabMaster=!0,this.loadChasitorMasterTab(e,s),h.broadcastAPI.off("receiveIsTabMaster"))}.bind(this),0===i||h.isInternetExplorer()||h.isEdge()?(this.isTabMaster=!0,this.loadChasitorMasterTab(e,s)):h.broadcastAPI.send("getIsTabMaster",{domain:this.domain,deploymentId:t})},t.prototype.verifyScriptHost=function(t,e){var s;if(s=window.URL&&"function"==typeof window.URL?new URL(t).hostname:(s=(s=-1<t.indexOf("//")?t.split("/")[2]:t.split("/")[0]).split(":")[0]).split("?")[0],!this.isValidHostname(s))throw new Error(e||"Chasitor script served from invalid host! Chasitor script must come from one of the following domains: "+i.join(", "))},t.prototype.isValidHostname=function(e){return i.some(function(t){return 0<e.indexOf(t,e.length-t.length)})},t.prototype.sendSneakPeekOrTypingUpdate=function(t){var e={};this.liveAgentChasitor?this.liveAgentChasitor.isSneakPeekEnabled()?this.liveAgentChasitor.sendSneakPeek(t):this.liveAgentChasitor.sendTypingUpdate(t.length):(e.message=t,this.sendBroadcastEventToSlaveTabs("sendSneakPeekOrTypingUpdate",e))},t.prototype.saveChat=function(){var t="",a=[],n=[],o=[];this.liveAgentChasitor?/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream?(this.liveAgentChasitor.getChatMessages().forEach(function(t){var e,s,i=t.getContent();"string"!=typeof i&&(s="",i=(e=i)&&"string"==typeof e?e:("ChatWindowButton"===e.type?s+="Button Selections:":"ChatWindowMenu"===e.type&&(s+="Menu Options:"),e.items&&e.items.forEach(function(t){s+="\n\t"+t.text}),s)),i&&(a.push(t.getName()),n.push(t.getTimestamp()),o.push(i))}),t=JSON.stringify({names:a,timestamps:n,messages:o}),h.postMessage("liveagent.saveChatIOSCallback",{chasitorData:this.gatherChasitorSessionData(),textLog:t})):this.liveAgentChasitor.saveChat():document.hidden||this.sendBroadcastEventToSlaveTabs("saveChat")},t.prototype.abortConnection=function(){this.liveAgentChasitor?(this.liveAgentChasitor.abortConnection(),this.serializeChat()):this.sendBroadcastEventToSlaveTabs("abortConnection")},t.prototype.serialize=function(){this.liveAgentChasitor.serialize()},t.prototype.sendCustomEvent=function(t,e){this.liveAgentChasitor.sendCustomEvent(e.type,e.data)},t.prototype.getCustomEvents=function(){var t=this.liveAgentChasitor.getCustomEvents().map(function(t){return{source:t.getSource(),type:t.getType(),data:t.getData(),date:t.getDate()}}),e=JSON.stringify(t);parent.postMessage({method:"liveagent.getCustomEventsResult",data:{customEvents:e}},h.parentOrigin)},t.prototype.addCustomEventListener=function(t,e){this.liveAgentChasitor.addCustomEventListener(e,function(t){parent.postMessage({method:"liveagent.customEventReceived",data:{type:t.getType(),data:t.getData()}},h.parentOrigin)})},t.prototype.removeEventListeners=function(){this.liveAgentChasitor?window.liveagent.removeEventListeners():this.sendBroadcastEventToSlaveTabs("removeEventListeners")},t.prototype.updateChatWindowState=function(t){this.chatWindowStateName=t,this.liveAgentChasitor?this.serializeChat():this.sendBroadcastEventToSlaveTabs("serializeChat")},t.prototype.stopChasitorIdleTimeout=function(){this.liveAgentChasitor?this.liveAgentChasitor.stopChasitorIdleTimeout():this.sendBroadcastEventToSlaveTabs("stopChasitorIdleTimeout")},h.chasitorAPI=new t});