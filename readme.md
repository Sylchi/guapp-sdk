### Guapp sdk

## Usage

Get your api key from https://guapp.ai

install the package

`npm install @guapp.ai/guapp-sdk`

instantiate the package and start the app

Commonjs

```javascript
const { Guapp } = require("@guapp.ai/guapp-sdk");

const guapp = new Guapp("Your api key");
guapp.connect();
```

Typescript

```typescript
import { Guapp } from "@guapp.ai/guapp-sdk";

const guapp = new Guapp("Your api key");
guapp.connect();
```
