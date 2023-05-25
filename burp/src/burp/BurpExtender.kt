package  burp

import java.io.PrintWriter
import java.util.*

class BurpExtender : IBurpExtender, IProxyListener, IExtensionStateListener {

    private lateinit var callbacks: IBurpExtenderCallbacks
    private lateinit var helpers: IExtensionHelpers
    private lateinit var stdout: PrintWriter
    private lateinit var stderr: PrintWriter

    private val colorMap = mapOf(
        "blue" to "blue",
        "turquoise" to "cyan",
        "green" to "green",
        "yellow" to "yellow",
        "orange" to "orange",
        "red" to "red",
        "pink" to "pink",
        "purple" to "magenta"
    )

    override fun registerExtenderCallbacks(callbacks: IBurpExtenderCallbacks) {
        this.callbacks = callbacks
        this.helpers = callbacks.helpers
        this.stdout = PrintWriter(callbacks.stdout, true)
        this.stderr = PrintWriter(callbacks.stderr, true)

        callbacks.setExtensionName("PwnFoxy")
        callbacks.registerExtensionStateListener(this)
        callbacks.registerProxyListener(this)
        stdout.println("PwnFoxy Loaded")
    }


    override fun extensionUnloaded() {
    }

    override fun processProxyMessage(messageIsRequest: Boolean, message: IInterceptedProxyMessage?) {
        if (!messageIsRequest) return

        val messageInfo = message?.messageInfo
        if (messageInfo != null) {

            val requestInfo = helpers.analyzeRequest(messageInfo)
            val body = messageInfo.request.drop(requestInfo.bodyOffset).toByteArray()
            val (pwnFoxHeaders, cleanHeaders) = requestInfo.headers.partition {
                it.lowercase(Locale.getDefault()).startsWith("x-pwnfoxy-")
            }

            pwnFoxHeaders.forEach() {
                if (it.lowercase(Locale.getDefault()).startsWith(("x-pwnfoxy-color:"))) {
                    val (_, color) = it.split(":", limit = 2)
                    val colorKey = color.lowercase(Locale.getDefault()).trim()
                    messageInfo.highlight = colorMap[colorKey] ?: colorKey
                }
                if (it.lowercase(Locale.getDefault()).startsWith(("x-pwnfoxy-note:"))) {
                    val (_, note) = it.split(":", limit = 2)
                    if (messageInfo.comment.isEmpty()) {
                        messageInfo.comment = note
                    } else {
                        messageInfo.comment = note + " / " + messageInfo.comment
                    }
                }

            }
            messageInfo.request = helpers.buildHttpMessage(cleanHeaders, body)
        }
    }
}