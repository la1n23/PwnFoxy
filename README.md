![icon](/firefox/icons/icon.svg)
# PwnFoxy

Better version of [PwnFox](https://github.com/yeswehack/PwnFox)

## Why?
PwnFox is a great tool, but it lacks UX best practices and some minor features.

## Main changes

If you are not familiar with PwnFox, check the link above first.

### Consistent colors

PwnFoxy uses Firefox name of colors everywhere including headers so you don't need keep asking yourself "Is it turquoise or cyan?" while switching between Burp and Firefox: \
![burp](/screenshots/burp.png) \
Colors on the extension popup now also match visually the colors that Firefox uses to highlight container tabs and allows you to see what color it is along with the note:\
![containers](/screenshots/containers.png)
![tabs](/screenshots/tabs.png)

### Settings for containers

It finally ends "Who the hell is blue? I need to check JWT payload again" problem. Each container now can be configured with `X-PwnFoxy-Note` extra header that automatically adds a comment to the requests in Burp HTTP history. It's good place to add account username/email so you never forget connection between used color and actual account: \
![notes](/screenshots/notes.png) \
And here is bonus **headers modification**: you can add any extra headers to specific container and also rewrite the sent headers. Here is example of container settings:
```json
{ 
    "color": "turquoise", 
    "note": "student", 
    "headers": [{ "name": "X-PwnFoxy-Custom", "value": "test"}], 
    "matchAndReplace": [{ "match": "^Cookie: .+?(access_token=[^;]+);.+$", "replace": "Cookie: $1;" }], 
}
```
It adds a new header `X-PwnFoxy-Custom: test` and clean `Cookie` to contian only `access_token`.

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
rm -fr web-ext-artifacts/*
web-ext build
# the zip file is available in /firefox/web-ext-artifacts/pwnfox-${version}.zip
# Optional. If you want to sign you own build
web-ext sign --api-key="$KEY" --api-secret="$SECRET" --channel="unlisted"
# rename
mv firefox/web-ext-artifacts/*.xpi firefox/web-ext-artifacts/$(ls firefox/web-ext-artifacts -1 | grep xpi | perl -pe 's/^\w+\-/pwnfoxy-/')
# the xpi file is available in /firefox/web-ext-artifacts/pwnfox-${version}.xpi

```
### Burp

Open and compile with Intellij IDEA (Ctrl+F9)

