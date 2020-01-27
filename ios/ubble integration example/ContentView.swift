//
//  ContentView.swift
//  ubble integration example
//
//  Created by Sam on 09/01/2020.
//  Copyright © 2020 Ubbleai. All rights reserved.
//

import SwiftUI
import SafariServices

struct ContentView: View {
    @State var showSafari = false
    @State var urlString = ""
    
    var body: some View {
        Button(action: {
            createIdentification(finished: {url in
                DispatchQueue.main.async {
                
                    self.urlString = url
                    self.showSafari = true
                       
                }
            })

        }) {
            Text("Verify Your Identity")
        }
        .sheet(isPresented: $showSafari) {
            SafariView(url: URL(string: self.urlString)!)
        }
    }
}

struct SafariView: UIViewControllerRepresentable {
    let url: URL
    
    func makeUIViewController(context: UIViewControllerRepresentableContext<SafariView>) -> SFSafariViewController {
        return SFSafariViewController(url: url)
    }

    func updateUIViewController(_ uiViewController: SFSafariViewController, context: UIViewControllerRepresentableContext<SafariView>) {
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

func createIdentification(finished: @escaping ((String) -> Void)) {
    let client = UbbleCredentials.clientId // YOUR CLIENT
    let secret = UbbleCredentials.clientSecret // YOUR SECRET

    let loginString = String(format: "%@:%@", client, secret)
    let base64LoginString = loginString.data(using: String.Encoding.utf8)!.base64EncodedString()
    
    let identificationURL = String("https://web.ubble.ai/api/identifications/")
    let request = NSMutableURLRequest(url:NSURL(string: identificationURL)! as URL)

    request.httpMethod = "POST"
    request.setValue("Basic \(base64LoginString)", forHTTPHeaderField: "Authorization")
    request.setValue("application/vnd.api+json", forHTTPHeaderField: "Content-Type")

    let json: [String: Any] = ["data": ["type": "identifications", "attributes": ["redirect-url": "ubbleios://"]]]
    let jsonData = try? JSONSerialization.data(withJSONObject: json)

    request.httpBody = jsonData

    let task = URLSession.shared.dataTask(with: request as URLRequest) { data, response, error in
        guard let data = data, error == nil else {                                                 // check for fundamental networking error
            print("error=\(String(describing: error))")
            return
        }

        if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 201 {           // check for http errors
            print("statusCode should be 201, but is \(httpStatus.statusCode)")
            print("response = \(String(describing: response))")
        }

        do {

            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String:Any],
            let data = json["data"] as? [String : Any],
                let attributes = data["attributes"] as? [String : Any] {
                 finished(attributes["identification-url"] as! String)
            }
        } catch {
            print(error)
        }
    }
    task.resume()
}
