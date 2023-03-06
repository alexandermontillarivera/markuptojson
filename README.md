# MarkupToJSON

Transform your HTML to JSON format and share for REST API or other method easy. It works in the browser and on the server 🧭

## Instalation
Installation in your project 📁

```console
npm i markuptojson
```
## Usage  🎯
Import the module with coverty or custom name from library  📦
```javascript
// ESMODULES
import markupToJSON from 'markuptojson'

// COMMON JS
const markupToJSON require('markuptojson')

// -- HTML TO JSON -- //
const HTML = "<h1 class='title' id='mainTitle'>Hello World <span>Master</span></h1>"
const JSON = markupToJSON.htmlToJSON(HTML)
console.log(JSON)
/* Output
  [
    {
      "tagAttrs": {
        "id": "mainTitle",
        "class": "title"
      },
      "content": "Hello World",
      "children": [
        {
          tagAttrs: {},
          content: "Master",
          children: [],
          tagName: "span"
        }
      ],
      tagName: "h1"
    }
  ]
*/

// -- JSON TO HTML -- //
const HTMLOutput = markupToJSON.jsonToHTML(JSON)
console.log(HTMLOutput)
/* Output
	<h1 class="title" id="mainTitle">Hello World <span>Master</span></h1>
*/
```
You can also import the functions separately.
```javascript
// ESMODULES
import { htmlToJSON, jsonToHTML } from 'markuptojson'

// COMMONJS
const { htmlToJSON, jsonToHTML } = require('markuptojson')
```
Thanks to **typescript** you will be able to have autocompletion in visual studio code and other popular IDEs, so you can easily extract the api responses and some performance information. Just like **typescript** helps with module methods for easy use.