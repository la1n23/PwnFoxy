# <img src="/firefox/icons/icon.svg" width=30> PwnFoxy

Better version of [PwnFox](https://github.com/yeswehack/PwnFox)

## Main changes

If you are not familiar with PwnFox, check the link above first.

### Consistent color

PwnFoxy uses Firefox name of colors everywhere including headers so you don't need keep asking yourself "Is it turquoise or cyan?" while switching between Burp and Firefox. 
Colors on the extension popup now also match visually the colors that Firefox uses to highlight container tabs.

### Settings for containers

It finally ends "Who the hell is blue? I need to check JWT token payload again" problem. Each container now can be configured with `X-PwnFoxy-Note` extra header that automatically adds a comment to the requests in Burp HTTP history. It's good place to add account username/email so you never forget connection between used color and actual account.
And a bonus feature: you can add any extra headers to specific container. Not to rewrite though.

## Installation

You can find the latest build here:
* [https://github.com/la1n23/PwnFoxy/releases](https://github.com/la1n23/PwnFoxy/releases)

### Firefox
 - visit `about:addons` and choose install from file, then select `PwnFoxy-$version.xpi`
 - or install from 
[https://addons.mozilla.org/en-US/firefox/addon/pwnfoxy/](https://addons.mozilla.org/en-US/firefox/addon/pwnfoxy/)

### Burp
- Go to extender and add `PwnFoxy-$version.jar` as a java extension.

## Build

### Firefox

```shell
cd firefox
web-ext build
# the zip file is available in /firefox/web-ext-artifacts/pwnfox-${version}.zip
# Optional. If you want to sign you own build
web-ext sign --api-key="$KEY" --api-secret="$SECRET"
# rename
mv firefox/web-ext-artifacts/*.xpi firefox/web-ext-artifacts/$(ls firefox/web-ext-artifacts -1 | grep xpi | perl -pe 's/^\w+\-/pwnfoxy-/')
# the xpi file is available in /firefox/web-ext-artifacts/pwnfox-${version}.xpi

```
### Burp

Open and compile with Intellij IDEA (Ctrl+F9)

