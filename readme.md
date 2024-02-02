### Guapp sdk

## Usage

Get your api key from https://guapp.io

install the package

`npm install @guapp.ai/guapp-sdk`

instantiate the package and start the app

Commonjs

```
const { Guapp } = require('@guapp.ai/guapp-sdk');

const guapp = new Guapp("Your api key");
guapp.connect();
```

Typescript

```
import { Guapp } from '@guapp.ai/guapp-sdk';

const guapp = new Guapp("Your api key");
guapp.connect();
```
