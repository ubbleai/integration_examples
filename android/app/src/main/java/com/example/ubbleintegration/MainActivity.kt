package com.example.ubbleintegration

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Base64.encodeToString
import android.util.Log
import android.view.View
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject

const val URL_NAME = "com.example.ubbleintegration.URL"

class MainActivity : AppCompatActivity() {

    private val TAG = "MainActivity"


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun verifyIdentity(view: View) {
        // Instantiate the RequestQueue.
        val queue = Volley.newRequestQueue(this)
        val url = "https://web.ubble.ai/api/identifications/"

        var jsonObject = JSONObject()
        var data = JSONObject()
        var attributes = JSONObject()

        attributes.accumulate("redirect-url","ubble://ubblefeedback" )
        data.accumulate("type" , "identifications")
        data.accumulate("attributes", attributes)
        jsonObject.accumulate("data", data)

        val jsonRequest = object: JsonObjectRequest(Method.POST, url, jsonObject, Response.Listener<JSONObject> { response ->
                Log.d(TAG, response.toString())
                val identificationURL = response.getJSONObject("data").getJSONObject("attributes").getString("identification-url")
                val intent = Intent(this, Webview::class.java).apply {
                    putExtra(URL_NAME, identificationURL)
                }
            startActivity(intent)
            }, Response.ErrorListener {
                error -> Log.d(TAG, "ERR" + error)
        }) {
                override fun getHeaders(): MutableMap<String, String> {
                    val headers = HashMap<String, String>()
                    val user = getString(R.string.CLIENT_ID)
                    val secret = getString(R.string.CLIENT_SECRET)
                    val authString = "Basic " + encodeToString("$user:$secret".toByteArray(), 0)
                    headers["Authorization"] = authString
                    headers["Content-type"] = "application/vnd.api+json"
                    return headers
                }
        }

        // Add the request to the RequestQueue.
        queue.add(jsonRequest)

    }


}
