

const defaultConfig = {
    enabled: false,
    useBurpProxy: false,
    addContainerHeader: true,
    injectToolbox: false,
    logPostMessage: true,
    removeSecurityHeaders: false,
    burpProxyHost: '127.0.0.1',
    burpProxyPort: '8080',
    activeToolbox: null,
    savedToolbox: {},
    devToolDual: false,
    activeMessageFunc: "noop",
    savedMessageFunc: {
        "noop": `/* 
* Available parameters: 
*   data: the message data
*   origin: the origin frame
*   destination: the destination frame
*
* return: 
*   new modified message to display
*/
    
return data
`},
    containers: {
        list: [
            { color: "blue", note: '', headers: [{ name: 'X-PwnFoxy-Custom', value: 'test'}] },
            { color: "turquoise", note: '', headers: []  },
            { color: "green", note: '', headers: []  },
            { color: "yellow", note: '', headers: []  },
            { color: "orange", note: '', headers: []  },
            { color: "red", note: '', headers: []  },
            { color: "pink", note: '', headers: []  },
            { color: "purple", note: '', headers: []  },
        ]
    }
}

const config = {
    async get(key) {
        const r = await browser.storage.local.get(key)
        return r[key] ?? defaultConfig[key]
    },
    async set(key, value) {
        return await browser.storage.local.set({ [key]: value })
    },
    async getContainerByColor(color) {
        const containers = await this.get('containers')
        return containers.list.find(c => c.color === color);  
    },
    onChange(key, handler) {
        return browser.storage.onChanged.addListener((changes, areaName) => {
            if (areaName != "local") return

            for (const [name, { newValue }] of Object.entries(changes)) {
                if (name != key) continue
                handler(newValue)
            }
        })
    }
}