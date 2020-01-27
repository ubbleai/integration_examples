//
//  ViewController.swift
//  ubble integration ios 12
//
//  Created by Sam on 10/01/2020.
//  Copyright © 2020 Ubbleai. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var verifyIdentity: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        verifyIdentity.addTarget(self, action: #selector(buttonAction), for: .touchUpInside)


    }

    @objc func buttonAction() {
        createIdentification(finished: {url in
            DispatchQueue.main.async {
                UIApplication.shared.open(URL(string: url)!, options: [:])
            }
        })
    }
    
    func createIdentification(finished: @escaping ((String) -> Void)) {
        let client = "CLIENT" // YOUR CLIENT
        let secret = "SECRET" // YOUR SECRET
        let loginString = String(format: "%@:%@", client, secret)
        let base64LoginString = loginString.data(using: String.Encoding.utf8)!.base64EncodedString()
        
        let identificationURL = String("https://web.ubble.ai/api/identifications/")
        let request = NSMutableURLRequest(url:NSURL(string: identificationURL)! as URL)

        request.httpMethod = "POST"
        request.setValue("Basic \(base64LoginString)", forHTTPHeaderField: "Authorization")

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
    

}

