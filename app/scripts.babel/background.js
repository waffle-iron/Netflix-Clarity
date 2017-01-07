'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.info('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});