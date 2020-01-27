package com.example.ubbleintegration

import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.webkit.*
import androidx.annotation.RequiresApi


class Webview : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_webview)

        val url = intent.getStringExtra(URL_NAME)
        val myWebView: WebView = findViewById(R.id.webview)
        myWebView.settings.javaScriptEnabled = true
        myWebView.settings.domStorageEnabled = true
        myWebView.webViewClient = WebViewClient()
        myWebView.webChromeClient = object:WebChromeClient() {
            // Grant permissions for cam
            override fun onPermissionRequest(request:PermissionRequest) {
                this@Webview.runOnUiThread(object:Runnable {
                    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
                    override fun run() {
                        request.grant(request.resources)
                    }
                })
            }
        }
        myWebView.loadUrl(url)
    }
}
