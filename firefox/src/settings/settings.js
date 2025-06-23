async function main() {
    const $ = i => document.getElementById(i)

    const configEl = [
        [$("burphost"), "burpProxyHost"],
        [$("burpport"), "burpProxyPort"],
        [$('containers'), 'containers'],
    ]

    /* Config to form */
    configEl.forEach(([el, configName]) => {
        config.get(configName).then(v => {
            if (configName === 'containers') {
                el.value = JSON.stringify(v, null, 2)
            } else {
                el.value = v
            }
        })
    })

    /* Form to config */
    document.querySelector("form").addEventListener("submit", ev => {
        configEl.forEach(([el, configName]) => {
            if (configName === 'containers') {
                config.set(configName, JSON.parse(el.value))
            } else {
                config.set(configName, el.value)
            }
        })
    });
    newFileSelection(config, "savedToolbox", "#savedToolbox", 'toolbox')

    document.querySelector('#reset-containers').addEventListener('click', () => {
        config.resetContainers().then(() => {
            config.get('containers').then(v => {
                $('containers').value = JSON.stringify(v, null, 2);
            })
        });
    })
}

document.addEventListener("DOMContentLoaded", main)
